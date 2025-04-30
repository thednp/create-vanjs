// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.
/**
 * @see https://vitejs.dev/guide/static-html
 * @see https://github.com/vitejs/vite-plugin-vue/blob/main/playground/ssr-vue/prerender.js
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { fileToRoute, getRoutes } from "vite-plugin-vanjs/server";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute("dist/static/.vite/ssr-manifest.json"), "utf-8"),
);
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

// determine routes to pre-render from src/pages | src/routes
const routesFolder = fs.existsSync(toAbsolute("src/routes"))
  ? "src/routes"
  : fs.existsSync(toAbsolute("src/pages"))
  ? "src/pages"
  : null;

// Use default vite config
const viteConfig = {
  root: toAbsolute(""),
};
const pluginConfig = {
  routesDir: routesFolder,
  extensions: [".tsx", ".jsx", ".ts", ".js"],
};

const routesToPrerender = routesFolder
  ? (await getRoutes(viteConfig, pluginConfig))
    .map((route) => route.path)
    .map((file) => fileToRoute(file, toAbsolute(routesFolder)))
    .filter((route, index, self) =>
      // Remove duplicate routes
      self.indexOf(route) === index &&
      // Filter out layout files
      !route.includes("(")
    )
  : ["/"];

(async () => {
  // Ensure the static directory exists
  const staticDir = toAbsolute("dist/static");
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }

  // pre-render each route...
  for (const route of routesToPrerender) {
    const rendered = await render(route, manifest);

    const html = template
      .replace(`<!-- preload-links -->`, rendered.preloadLinks)
      .replace(`<!-- app-head -->`, rendered.head)
      .replace(`<!-- app-header -->`, rendered.header)
      .replace(`<!-- app-footer -->`, rendered.footer)
      .replace(`<!-- app-main -->`, rendered.main)
      .replace(/\n\s*(?=\<?)|\n|\t/g, "");

    // Handle route path to file path conversion
    let fileDir;
    let fileName;
    if (route === "/") {
      fileDir = staticDir;
      fileName = "index.html";
    } else if (route.endsWith("*")) {
      // For catch-all routes in root & subdirectories
      fileDir = path.join(staticDir, route.slice(1, -1)); // Remove leading slash and asterisk
      fileName = "404.html";
    } else {
      fileDir = path.join(staticDir, route.slice(1)); // Remove leading slash
      fileName = "index.html";
    }

    // Ensure the directory exists
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    const filePath = path.join(fileDir, fileName);
    fs.writeFileSync(filePath, html);
    console.log("pre-rendered:", path.relative(staticDir, filePath));
  }

  // done, delete .vite directory including ssr manifest
  fs.rmSync(toAbsolute("dist/static/.vite"), { recursive: true });
})();
