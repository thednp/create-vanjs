import { defineConfig } from "npm:vite";
import vanjs from "npm:vite-plugin-vanjs";
import deno from "npm:@deno/vite-plugin";
import vanSVG from "npm:vite-vanjs-svg";
import tailwind from "npm:@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vanjs(),
    deno(),
    vanSVG(),
    tailwind(),
  ],
  build: {
    // Enable more verbose logging
    minify: false,
    sourcemap: true,
    rollupOptions: {
      onLog(level, log) {
        console.log(`[Rollup ${level}]:`, log.message);
      },
    },
  },
});
