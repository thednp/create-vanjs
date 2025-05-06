import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import deno from "@deno/vite-plugin";
import vanSVG from "vite-vanjs-svg";
import tailwind from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vanjs(),
    deno(),
    vanSVG(),
    tailwind(),
  ],
});
