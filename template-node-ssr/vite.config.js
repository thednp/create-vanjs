import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import vanSVG from "vite-vanjs-svg";
import tailwind from "@tailwindcss/vite";
// import { fileURLToPath } from "node:url";
// import { dirname, resolve } from "node:path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export default defineConfig({
  // optimizeDeps: {
  //   noDiscovery: true,
  //   include: []
  // },
  plugins: [
    vanjs(),
    vanSVG(),
    tailwind(),
  ],
});
