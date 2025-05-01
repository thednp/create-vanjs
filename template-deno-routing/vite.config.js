import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), vanjs()],
});
