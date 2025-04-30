import { defineConfig } from "vite";
import vanjs from "vite-plugin-vanjs";
import vanSVG from "vite-vanjs-svg";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
    include: [],
    // exclude: ["virtual:@vanjs/routes"]
  },
  plugins: [
    vanjs(),
    vanSVG(),
    tailwind(),
  ],
});
