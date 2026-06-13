import { defineConfig, type Plugin } from "vite";
import vanjs from "vite-plugin-vanjs";
import vanSVG from "vite-vanjs-svg";
import tailwind from "@tailwindcss/vite";

export function isomorphicApi(): Plugin {
  return {
    name: "isomorphic-api",
    enforce: "pre",
    resolveId(id: string) {
      if (id === "@/api") {
        return id;
      }
      return null;
    },
    load(id: string, ops) {
      if (id === "@/api") {
        if (ops?.ssr) {
          return `export * from "/src/api/server.js";`;
        } else {
          return `export * from "/src/api/index.js";`;
        }
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    isomorphicApi(),
    vanjs(),
    vanSVG(),
    tailwind(),
  ],
});
