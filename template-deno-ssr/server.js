/// <reference types="deno.ns" />

// server.js
import { existsSync } from "node:fs";
import path from "node:path";
import url from "node:url";
import express from "npm:express";

// Constants
const isProduction = Deno.env.get("NODE_ENV") === "production";
const isStatic = Deno.env.get("STATIC") === "true";
const port = Deno.env.get("PORT") || 5173;
const base = Deno.env.get("BASE") || "/";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

// Cached production assets
const templateHtml = isProduction
  ? await Deno.readTextFile(
    `./dist/${isStatic ? "static" : "client"}/index.html`,
  )
  : "";

function findEntry() {
  const paths = [".tsx", ".jsx", ".ts", ".js"].map((ext) =>
    `/src/entry-server${ext}`
  );
  const path = paths.find((path) => existsSync(resolve(path.slice(1))));

  return path || "/src/entry-server.js";
}

// Cached production manifest
const manifest = isProduction
  ? JSON.parse(
    await Deno.readTextFile(
      resolve("dist/client/.vite/ssr-manifest.json"),
    ),
  )
  : {};

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("npm:vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("npm:compression")).default;
  const sirv = (await import("npm:sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.url.replace(base, "");
    const urlParts = url.split("/").filter(Boolean);

    /** @type {string} */
    let template = "";
    /** @type {import('./src/entry-server.js').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await Deno.readTextFile("./index.html");
      render = (await vite.ssrLoadModule(findEntry())).render;
      template = await vite.transformIndexHtml(url || "/", template);
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    let html = "";
    if (isStatic) {
      try {
        // First try the exact path
        html = await Deno.readTextFile(
          `./dist/static${url?.length > 0 ? "/" + url : ""}/index.html`,
        );
      } catch (_error) {
        // If exact path fails, try to find a 404.html going up the directory tree
        const currentPath = urlParts;
        if (currentPath.length > 0) {
          while (currentPath.length > 0) {
            try {
              html = await Deno.readTextFile(
                `./dist/static/${currentPath.join("/")}/404.html`,
              );
              break;
            } catch {
              currentPath.pop();
            }
          }
        }
        if (!html) {
          try {
            html = await Deno.readTextFile(
              "./dist/static/404.html",
            );
          } catch {
            html = "Page not found and no route configured for 404 page.";
          }
        }

        // Set 404 status code
        res.status(404);
      }
    } else {
      const rendered = await render(url, manifest);
      html = template
        .replace(`<!-- preload-links -->`, rendered.preloadLinks ?? "")
        .replace(`<!-- app-head -->`, rendered.head)
        .replace(`<!-- app-header -->`, rendered.header)
        .replace(`<!-- app-footer -->`, rendered.footer)
        .replace(`<!-- app-main -->`, rendered.main)
        .replace(/\n\s*(?=\<?)|\n|\t/g, "");
    }

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(
    `Server ${
      isStatic ? "SSG" : "SSR"
    } mode started at http://localhost:${port}`,
  );
});
