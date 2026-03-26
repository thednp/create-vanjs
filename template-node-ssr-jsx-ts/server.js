// server.js
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import url from "node:url";
import process from "node:process";
import express from "express";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const isStatic = process.env.STATIC === "true";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile(
    `./dist/${isStatic ? "static" : "client"}/index.html`,
    "utf-8",
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
    await fs.readFile(
      resolve("dist/client/.vite/ssr-manifest.json"),
      "utf-8",
    ),
  )
  : {};

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");
    const urlParts = url.split("/").filter(Boolean);

    /** @type {string} */
    let template = "";
    /** @type {import('./src/entry-server.ts').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
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
        html = await fs.readFile(
          `./dist/static${url?.length > 0 ? "/" + url : ""}/index.html`,
          "utf-8",
        );
      } catch (error) {
        // If exact path fails, try to find a 404.html going up the directory tree
        let currentPath = urlParts;
        if (currentPath.length > 0) {
          while (currentPath.length > 0) {
            try {
              html = await fs.readFile(
                `./dist/static/${currentPath.join("/")}/404.html`,
                "utf-8",
              );
              break;
            } catch {
              currentPath.pop();
            }
          }
        }
        if (!html) {
          try {
            html = await fs.readFile(
              "./dist/static/404.html",
              "utf-8",
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
        .replace(`<!-- preload-links -->`, rendered.preloadLinks)
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
    `  ➜  Server ${
      isStatic ? "SSG" : "SSR"
    } mode started at http://localhost:${port}`,
  );
});
