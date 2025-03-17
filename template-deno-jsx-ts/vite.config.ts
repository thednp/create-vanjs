import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import deno from "@deno/vite-plugin";

export default defineConfig({
  plugins: [vanjs(), deno()],
});
