#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Template descriptions
const DESCRIPTIONS = {
  // Node templates
  "node-base": "A minimalist starter template for VanJS.",
  "node-base-ts": "A minimalist starter template for VanJS.",
  "node-routing":
    "A starter template for VanJS with basic client-side routing.",
  "node-routing-ts":
    "A starter template for VanJS with basic client-side routing.",
  "node-fs-routing":
    "A starter template for VanJS with client-side file-system routing.",
  "node-fs-routing-ts":
    "A starter template for VanJS with client-side file-system routing.",
  "node-jsx": "A starter template for VanJS with JSX support.",
  "node-jsx-ts": "A starter template for VanJS with JSX support.",
  "node-ssr": "A fully-featured starter template for VanJS.",
  "node-ssr-ts": "A fully-featured starter template for VanJS.",
  "node-ssr-jsx":
    "A fully-featured starter template for VanJS with JSX support.",
  "node-ssr-jsx-ts":
    "A fully-featured starter template for VanJS with JSX support.",

  // Deno templates
  "deno-base": "A minimalist starter template for VanJS.",
  "deno-base-ts": "A minimalist starter template for VanJS.",
  "deno-routing":
    "A starter template for VanJS with basic client-side routing.",
  "deno-routing-ts":
    "A starter template for VanJS with basic client-side routing.",
  "deno-fs-routing":
    "A starter template for VanJS with client-side file-system routing.",
  "deno-fs-routing-ts":
    "A starter template for VanJS with client-side file-system routing.",
  "deno-jsx": "A starter template for VanJS with JSX support.",
  "deno-jsx-ts": "A starter template for VanJS with JSX support.",
  "deno-ssr": "A fully-featured starter template for VanJS.",
  "deno-ssr-ts": "A fully-featured starter template for VanJS.",
  "deno-ssr-jsx":
    "A fully-featured starter template for VanJS with JSX support.",
  "deno-ssr-jsx-ts":
    "A fully-featured starter template for VanJS with JSX support.",

  // Vike templates
  "vike": "A fully-featured starter template for VanJS powered by Vike.",
  "vike-ts": "A fully-featured starter template for VanJS powered by Vike.",
  "vike-jsx": "A fully-featured starter template for VanJS powered by Vike.",
  "vike-jsx-ts": "A fully-featured starter template for VanJS powered by Vike.",
};

async function getPackage(templateDir) {
  try {
    const isDeno = templateDir.includes("deno-");
    const pkgPath = isDeno
      ? join(__dirname, templateDir, "deno.json")
      : join(__dirname, templateDir, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    return {
      ...(isDeno ? { tasks: pkg?.tasks } : { scripts: pkg?.scripts }),
      dependencies: isDeno
        ? pkg.imports || {}
        : { ...pkg.dependencies || {}, ...pkg.devDependencies || {} },
    };
  } catch (er) {
    throw new Error(`Cannot fetch dependencies for ${templateDir}`);
  }
}

function getDependencies(pkg) {
  const result = {};
  const depsArray = Object.keys(pkg.dependencies);
  const deps = {
    "@deno/vite-plugin":
      "A plugin to enable Deno resolution inside Vite configurations.",
    "@tailwindcss/vite": "A plugin that integrates TailwindCSS with Vite.",
    "compression": "Node.js compression middleware.",
    "daisyui":
      "The most popular, free and open-source Tailwind CSS component library.",
    "express":
      "A back-end web application framework for building RESTful APIs.",
    "mini-van-plate":
      "A Minimalist Template Engine for Client/Server-side Rendering for VanJS.",
    "sirv":
      "The optimized and lightweight middleware for serving requests to static assets.",
    "tailwindcss": "A utility-first CSS framework for rapid UI development.",
    "typescript":
      "A typed programming language that adds optional type annotations to JavaScript.",
    "vanjs-core": "The VanJS core library for building reactive UIs.",
    "vanjs-ext":
      "A collection of utilities to boost productivity and DX for VanJS.",
    "vanjs-feather": "Feather Icons for VanJS.",
    "vanjs-lucide": "Lucide Icons for VanJS.",
    "vite-vanjs-svg":
      "A Vite plugin that lets you import SVG files into your app as VanJS components.",
    "vite-plugin-vanjs":
      "A mini meta-framework for VanJS that provides basic/file-system routing, metadata management, JSX support, isomorphic rendering and more.",
    "vike":
      "The next generation of framework architecture for flexible full-stack development.",
    "vite": "Next generation frontend tooling.",
  };
  depsArray.forEach((dep) => {
    if (deps[dep]) {
      result[dep] = deps[dep];
    }
  });

  return result;
}

function getResources(pkg) {
  const result = {};
  const depsArray = Object.keys(pkg.dependencies);
  const deps = {
    "daisyui": "[daisyUI](https://daisyui.com): The Official Website.",
    "express": "[express](https://expressjs.com/): The Official Website.",
    "mini-van-plate":
      "[mini-van](https://vanjs.org/minivan): The Official `mini-van` Documentation.",
    "tailwindcss":
      "[tailwindcss](https://tailwindcss.com/): The Official Website.",
    "typescript":
      "[typescript](https://typescriptlang.org/): The Official Website.",
    "vanjs-core":
      "[vanjs-core](https://vanjs.org/tutorial): The Official VanJS Tutorial.",
    "vanjs-ext":
      "[vanjs-ext](https://vanjs.org/x): The Official `vanjs-ext` Documentation.",
    "vanjs-feather":
      "[vanjs-feather](https://thednp.github.io/vanjs-feather/): The Demo Page.",
    "vanjs-lucide":
      "[vanjs-lucide](https://thednp.github.io/vanjs-lucide/): The Demo Page.",
    "vite-vanjs-svg":
      "[vite-vanjs-svg](https://github.com/thednp/vite-vanjs-svg): The `vite-vanjs-svg` repository page.",
    "vite-plugin-vanjs":
      "[vite-plugin-vanjs](https://github.com/thednp/vite-plugin-vanjs/wiki): The `vite-plugin-vanjs` wiki page.",
    "vike": "[vike](https://vike.dev): The Official Vike Website.",
    "vite": "[vite](https://vite.dev): The Official Vite Website.",
  };

  depsArray.forEach((dep) => {
    if (deps[dep]) {
      result[dep] = deps[dep];
    }
  });

  return result;
}

function generateFeatures(templateName) {
  const isDeno = templateName.includes("deno");
  const isVike = templateName.includes("vike");
  const isFSRouting = templateName.includes("-fs-routing");
  const isRouting = templateName.includes("routing-") && !isFSRouting;
  const isSSR = templateName.includes("-ssr");
  const isTypescript = templateName.endsWith("-ts");
  const isJSX = templateName.includes("-jsx");
  const features = [];

  if (isDeno) {
    features.push(`* Deno Configuration (works with Deno exclusively)`);
  }
  if (!isDeno) features.push(`* NodeJS Configuration (works with any runtime)`);
  if (isVike) features.push(`* Vike Full Configuration (without dedicated Vike integration plugin)`);
  if (!isVike && !isSSR) features.push(`* Single Page Application (SPA)`);
  if (isVike || isSSR) features.push(`* Server Side Rendering (SSR/MPA)`);
  if (isSSR) features.push(`* Pre-renderer Included (SSG)`);
  if (isRouting) features.push(`* Basic Client-Side Routing`);
  if (isFSRouting || isVike) features.push(`* Client-Side File-System Routing`);
  if (isJSX) features.push(`* JSX Transformation`);
  if (isTypescript) features.push(`* TypeScript Support`);

  return `### Features\n\n${features.join("\n")}`;
}

function generateScriptsDocs(templateName, pkg = null) {
  const isNode = !templateName.startsWith("deno-");
  const isVike = templateName.startsWith("vike-");
  const isSSR = templateName.includes("-ssr");
  const section = isNode ? "Scripts" : "Tasks";

  const scriptsSource = isNode ? pkg?.scripts : pkg?.tasks;
  const command = isNode ? "npm run" : "deno task";

  const scripts = Object.entries(scriptsSource).map(([name, script]) => {
    switch (name) {
      case "dev":
        return `* \`${command} dev\` - Start the development server`;
      case "start":
        return `* \`${command} start\` - Start the app in production mode`;
      case "generate":
        return `* \`${command} generate\` - Generate a static app (SSG)`;
      case "build":
        return isSSR
          ? `* \`${command} build\` - Build both client and server for production`
          : `* \`${command} build\` - Build for production`;
      case "build:client":
        return `* \`${command} build:client\` - Build the **client** for production`;
      case "build:server":
        return `* \`${command} build:server\` - Build the **server** for production`;
      case "preview":
        return isSSR
          ? `* \`${command} preview\` - Preview the SSG (static) production build`
          : `* \`${command} preview\` - Preview the production build`;
      case "serve":
        return `* \`${command} serve\` - Vite serves the app on the network.`;
      default:
        return `* \`${command} ${name}\` - ${script}`;
    }
  });

  if (isVike) {
    scripts.push(
      `\n**Note**: Vike CLI always sets Vite to serve the app over the network.`,
    );
  }

  return `### ${section}\n\n${scripts.join("\n")}`;
}

function generateDependenciesDocs(pkg = null) {
  const deps = getDependencies(pkg);
  const depsArray = Object.entries(deps)
    .filter(([name]) => name !== "vite") // Exclude vite as per requirement
    .map(([name, description]) => {
      return `* \`${name}\` - ${description}`;
    });

  return `### What's included\n\n${depsArray.join("\n")}`;
}

function generateResources(templateName, pkg = null) {
  const isDeno = templateName.startsWith("deno-");
  const deps = getResources(pkg);
  const depsArray = [
    ...(isDeno ? [`* [deno](https://deno.com): The Official Website.`] : []),
    ...Object.values(deps).map((resource) => `* ${resource}`),
  ];

  return `### Resources\n\n${depsArray.join("\n")}`;
}

async function generateReadme(templateDir) {
  const templateName = templateDir.replace("template-", "");
  const description = DESCRIPTIONS[templateName];
  const features = generateFeatures(templateDir);
  const pkg = await getPackage(templateDir);

  const content = `## ${templateName}

${description}


${features}


${generateScriptsDocs(templateName, pkg)}


${generateDependenciesDocs(pkg)}


${generateResources(templateName, pkg)}
`;

  await writeFile(
    join(__dirname, templateDir, "README.md"),
    content,
    "utf8",
  );

  console.log(`✅ Generated README.md for ${templateName}`);
}

async function main() {
  try {
    const dirs = await readdir(__dirname);
    const templateDirs = dirs.filter((dir) => dir.startsWith("template-"));

    for (const templateDir of templateDirs) {
      await generateReadme(templateDir);
    }

    console.log("\nAll README.md files generated successfully!");
  } catch (error) {
    console.error("Error generating README.md files:", error);
  }
}

main();
