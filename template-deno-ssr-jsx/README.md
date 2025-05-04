## deno-ssr-jsx

A Deno Server-Side Rendering (SSR/MPA) starter template for VanJS with JSX-enabled. Great for SEO-friendly apps with React-like syntax but also great for full-stack apps.


### Tasks

* `deno task dev` - Start the development server
* `npm run clean` - deno cache --reload npm:vite-plugin-vanjs npm:vanjs-core npm:mini-van-plate
* `deno task build` - Build both client and server for production
* `deno task build:client` - Build the **client** for production
* `deno task build:server` - Build the **server** for production
* `deno task generate` - Generate a static app (SSG)
* `deno task preview` - Preview an SSG (static) production build
* `deno task start` - Start the app in production mode


### What's included

* `@deno/vite-plugin` - A plugin to enable Deno resolution inside Vite configurations.
* `@tailwindcss/vite` - A plugin that integrates TailwindCSS with Vite.
* `compression` - Node.js compression middleware.
* `daisyui` - The most popular, free and open-source Tailwind CSS component library.
* `express` - A back-end web application framework for building RESTful APIs.
* `mini-van-plate` - A Minimalist Template Engine for Client/Server-side Rendering for VanJS.
* `sirv` - The optimized and lightweight middleware for serving requests to static assets.
* `tailwindcss` - A utility-first CSS framework for rapid UI development.
* `vanjs-lucide` - Lucide icons for VanJS.
* `vanjs-core` - The core VanJS library for building reactive UIs.
* `vanjs-ext` - A collection of utilities to boost productivity and DX for VanJS.
* `vite-plugin-vanjs` - A mini meta-framework for VanJS that provides basic/file-system routing, metadata management, JSX support, isomorphic rendering and more.
* `vite-vanjs-svg` - A Vite plugin that lets you import SVG files into your app as VanJS components.
