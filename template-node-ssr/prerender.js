// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.
/**
 * @see https://vitejs.dev/guide/static-html
 * @see https://github.com/vitejs/vite-plugin-vue/blob/main/playground/ssr-vue/prerender.js
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute("dist/static/.vite/ssr-manifest.json"), "utf-8"),
);
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

// determine routes to pre-render from src/pages
const routesToPrerender = fs.existsSync(toAbsolute("src/pages"))
  ? fs
    .readdirSync(toAbsolute("src/pages"))
    .map((file) => {
      const name = file.replace(/\.(ts|js|tsx|jsx)$/, "").toLowerCase();
      return name === "home" ? `/` : `/${name}`;
    })
  : ["/"];

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const rendered = await render(url, manifest, template);

    const html = template
      .replace(`<!--preload-links-->`, rendered.preloadLinks)
      .replace(`<!--app-head-->`, rendered.head)
      .replace(`<!--app-footer-->`, rendered.footer)
      .replace(`<!--app-html-->`, rendered.html)
      .replace(/\n\s*(?=\<?)|\n|\t/g, "");

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath);
  }

  // done, delete .vite directory including ssr manifest
  fs.rmSync(toAbsolute("dist/static/.vite"), { recursive: true });
})();
