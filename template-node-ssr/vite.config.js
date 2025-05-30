import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import vanSVG from "vite-vanjs-svg";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vanjs(),
    vanSVG(),
    tailwind(),
  ],
});
