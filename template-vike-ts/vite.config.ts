import vike from "vike/plugin";
import vanjs from "vite-plugin-vanjs";
import svg from "vite-vanjs-svg";
import tailwind from "@tailwindcss/vite";

import { UserConfig } from "vite";

export default {
  plugins: [vanjs(), vike(), svg(), tailwind()],
} satisfies UserConfig;
