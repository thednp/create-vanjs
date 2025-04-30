import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";

export default defineConfig({
  plugins: [vanjs()],
});
