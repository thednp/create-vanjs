#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Template descriptions
const DESCRIPTIONS = {
  // Node templates
  'node-base': 'A minimalist Single Page Application (SPA) starter template for VanJS. Perfect for learning VanJS or starting small projects.',
  'node-base-ts': 'A minimalist Single Page Application (SPA) starter template for VanJS with TypeScript support. Ideal for learning type-safe VanJS development.',
  'node-routing': 'A Single Page Application (SPA) starter template for VanJS with client-side routing. A perfect starter for multi-page SPAs.',
  'node-routing-ts': 'A Single Page Application (SPA) starter template for VanJS with client-side routing and TypeScript support. Perfect for developing type-safe multi-page SPAs.',
  'node-fs-routing': 'A Single Page Application (SPA) starter template for VanJS with file-system routing. Ideal for convention-based routing.',
  'node-fs-routing-ts': 'A Single Page Application (SPA) for VanJS with TypeScript support and file-system routing. Perfect for type-safe convention-based routing.',
  'node-jsx': 'A JSX-enabled Single Page Application (SPA) starter template for VanJS. Great for developers familiar with React-like syntax.',
  'node-jsx-ts': 'A and JSX-enabled Single Page Application (SPA) starter template with TypeScript support for VanJS. Ideal for type-safe React-like development.',
  'node-ssr': 'A Server-Side Rendering (SSR/MPA) starter template for VanJS. Perfect for SEO-friendly applications.',
  'node-ssr-ts': 'A Server-Side Rendering (SSR/MPA) starter template for VanJS with TypeScript support. Ideal for type-safe SEO-friendly applications.',
  'node-ssr-jsx': 'A Server-Side Rendering (SSR/MPA) starter template for VanJS with JSX-enabled. Great for SEO-friendly apps with React-like syntax.',
  'node-ssr-jsx-ts': 'A Server-Side Rendering (SSR/MPA) starter template for VanJS with JSX-enabled and TypeScript support. Perfect for type-safe SEO-friendly apps with React-like syntax.',

  // Deno templates
  'deno-base': 'A Deno minimalist Single Page Application (SPA) starter template for VanJS. Perfect for learning VanJS in Deno environment.',
  'deno-base-ts': 'A Deno Single Page Application (SPA) starter template with TypeScript support for VanJS. Ideal for type-safe Deno development.',
  'deno-routing': 'A Deno Single Page Application (SPA) starter template for VanJS and client-side routing. Great for multi-page Deno applications.',
  'deno-routing-ts': 'A Deno Single Page Application (SPA) starter template for VanJS with TypeScript support and client-side routing. Perfect for type-safe multi-page apps.',
  'deno-fs-routing': 'A Deno Single Page Application (SPA) starter template for VanJS with file-system routing. Ideal for convention-based routing.',
  'deno-fs-routing-ts': 'A Deno Single Page Application (SPA) starter template for VanJS with TypeScript support and file-system routing. Perfect for type-safe convention-based routing.',
  'deno-jsx': 'A Deno and JSX-enabled Single Page Application (SPA) starter template for VanJS. Great for Deno developers familiar with React-like syntax.',
  'deno-jsx-ts': 'A Deno and JSX-enabled Single Page Application (SPA) starter template for VanJS with TypeScript support. Ideal for type-safe React-like development.',
  'deno-ssr': 'A Deno Server-Side Rendering (SSR/MPA) starter template for VanJS. Perfect for SEO-friendly applications but also great for full-stack apps.',
  'deno-ssr-ts': 'A Deno Server-Side Rendering (SSR/MPA) starter template for VanJS with TypeScript support. Ideal for type-safe SEO-friendly applications but also great for full-stack apps.',
  'deno-ssr-jsx': 'A Deno Server-Side Rendering (SSR/MPA) starter template for VanJS with JSX-enabled. Great for SEO-friendly apps with React-like syntax but also great for full-stack apps.',
  'deno-ssr-jsx-ts': 'A Deno Server-Side Rendering (SSR/MPA) starter template for VanJS with TypeScript and JSX support. Perfect for type-safe SEO-friendly apps with React-like syntax but also great for full-stack apps.',

  // Vike templates
  'vike': 'A full-stack starter template for VanJS powered by Vike. Probably your best choice for scalable applications.',
  'vike-ts': 'A full-stack starter template with Typescript support for VanJS powered by Vike. Probably your best choice for scalable and type-safe applications.',
  'vike-jsx': 'A full-stack, JSX enabled starter template for VanJS powered by Vike. Perfect for React/SolidJS connoisseurs and junior developers and one of the best choice for building scalable applications.',
  'vike-jsx-ts': 'A full-stack, JSX enabled starter template with Typescript support for VanJS powered by Vike. Ideal for React/SolidJS connoisseurs and junior developers and one of the best choice for building scalable and type-safe applications.',
};

async function getPackage(templateDir) {
  try {
    const isDeno = templateDir.includes("deno-");
    const pkgPath = isDeno
      ? join(__dirname, templateDir, 'deno.json')
      : join(__dirname, templateDir, 'package.json');
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
    return {
      ...(isDeno ? { tasks: pkg?.tasks } : { scripts: pkg?.scripts }),
      dependencies: isDeno
        ? pkg.imports || {}
        : pkg.dependencies || {},
    };
  } catch (er) {
    throw new Error("Cannot fetch dependencies for ", templateDir);
  }
}

function getDependencies(pkg) {
  const result = {};
  const depsArray = Object.keys(pkg.dependencies);
  const deps = {
    '@deno/vite-plugin': 'A plugin to enable Deno resolution inside Vite configurations.',
    '@tailwindcss/vite': 'A plugin that integrates TailwindCSS with Vite.',
    'compression': 'Node.js compression middleware.',
    'daisyui': 'The most popular, free and open-source Tailwind CSS component library.',
    'express': 'A back-end web application framework for building RESTful APIs.',
    'mini-van-plate': 'A Minimalist Template Engine for Client/Server-side Rendering for VanJS.',
    'sirv': 'The optimized and lightweight middleware for serving requests to static assets.',
    'tailwindcss': 'A utility-first CSS framework for rapid UI development.',
    'typescript': 'A utility-first CSS framework for rapid UI development.',
    'vanjs-core': 'The core VanJS library for building reactive UIs.',
    'vanjs-ext': 'A collection of utilities to boost productivity and DX for VanJS.',
    'vanjs-feather': 'Feather icons for VanJS.',
    'vanjs-lucide': 'Lucide icons for VanJS.',
    'vite-vanjs-svg': 'A Vite plugin that lets you import SVG files into your app as VanJS components.',
    'vite-plugin-vanjs': 'A mini meta-framework for VanJS that provides basic/file-system routing, metadata management, JSX support, isomorphic rendering and more.',
    'vike': 'The next generation of framework architecture for flexible full-stack development.',
    'vite': 'Next generation frontend tooling.'
  };
  depsArray.forEach(dep => {
    if (deps[dep]) {
      result[dep] = deps[dep]
    }
  });

  return result;

}

function generateScriptsDocs(templateName, pkg = null) {
  const isNode = !templateName.startsWith('deno-');
  const isVike = templateName.startsWith('vike-');
  const isSSR = templateName.includes('-ssr');
  const section = isNode ? 'Scripts' : 'Tasks';

  const scriptsSource = isNode ? pkg?.scripts : pkg?.tasks;
  const command = isNode ? "npm run" : "deno task";

  const scripts = Object.entries(scriptsSource).map(([name, script]) => {
    switch (name) {
      case 'dev':
        return `* \`${command} dev\` - Start the development server`;
      case 'start':
        return `* \`${command} start\` - Start the app in production mode`;
      case 'generate':
        return `* \`${command} generate\` - Generate a static app (SSG)`;
      case 'build':
        return isSSR
          ? `* \`${command} build\` - Build both client and server for production`
          : `* \`${command} build\` - Build for production`;
      case 'build:client':
        return `* \`${command} build:client\` - Build the **client** for production`;
      case 'build:server':
        return `* \`${command} build:server\` - Build the **server** for production`;
      case 'preview':
        return isSSR
          ? `* \`${command} preview\` - Preview an ${isSSR ? "SSG (static)" : ""} production build`
          : `* \`${command} preview\` - Preview the production build`;
      case 'serve':
        return `* \`${command} serve\` - Vite serves the app on the network.`;
      default:
        return `* \`npm run ${name}\` - ${script}`;
    }
  });

  if (isVike) {
    scripts.push(`\n**Note**: Vike CLI always sets Vite to serve the app over the network.`)
  }

  return `### ${section}\n\n${scripts.join('\n')}`;
}

function generateDependenciesDocs(pkg = null) {
  const deps = getDependencies(pkg);
  const depsArray = Object.entries(deps)
    .filter(([name]) => name !== 'vite') // Exclude vite as per requirement
    .map(([name, description]) => {
      return `* \`${name}\` - ${description}`;
    });

  return `### What's included\n\n${depsArray.join('\n')}`;
}

async function generateReadme(templateDir) {
  const templateName = templateDir.replace('template-', '');
  const description = DESCRIPTIONS[templateName];
  const pkg = await getPackage(templateDir);

  const content = `## ${templateName}

${description}


${generateScriptsDocs(templateName, pkg)}


${generateDependenciesDocs(pkg)}
`;

  await writeFile(
    join(__dirname, templateDir, 'README.md'),
    content,
    'utf8'
  );

  console.log(`✅ Generated README.md for ${templateName}`);
}

async function main() {
  try {
    const dirs = await readdir(__dirname);
    const templateDirs = dirs.filter(dir => dir.startsWith('template-'));

    for (const templateDir of templateDirs) {
      await generateReadme(templateDir);
    }

    console.log('\nAll README.md files generated successfully!');
  } catch (error) {
    console.error('Error generating README.md files:', error);
  }
}

main();
