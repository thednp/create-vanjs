import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import svg from "vite-vanjs-svg";

export default defineConfig({
  plugins: [vanjs(), svg()],
});
