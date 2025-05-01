# create-vanjs

Scaffolding your first VanJS project in seconds!

> **Compatibility Note:** Vite requires [Node.js](https://nodejs.org/en/)
> version 18+, 20+, 22+. However, some templates require a higher Node.js
> version to work, please upgrade if your package manager warns about it.

```bash
# NPM:
npm create vanjs@latest
```

```bash
# PNPM:
pnpm create vanjs@latest
```

```bash
# Deno:
deno run -A npm:create-vanjs@latest
```

```bash
# Bun:
bun create vanjs@latest
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use
via additional command line options. For example, to scaffold a basic Vite +
SSR + VanJS project, run:

```bash
# npm
npm create vanjs@latest my-vanjs-app -- --template node-base
```

```bash
# pnpm
pnpm create vanjs my-vanjs-app --template node-base
```

```bash
# Deno
deno run -A npm:create-vanjs --template deno-base
```

```bash
# Bun
bun create vanjs my-vanjs-app --template node-base
```

Currently supported template presets include:

| Template             | Try online                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `node-base`          | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-base)          |
| `node-base-ts`       | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-base-ts)       |
| `node-routing`       | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-routing)       |
| `node-routing-ts`    | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-routing-ts)    |
| `node-fs-routing`    | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-fs-routing)    |
| `node-fs-routing-ts` | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-fs-routing-ts) |
| `node-jsx`           | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-jsx)           |
| `node-jsx-ts`        | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-jsx-ts)        |
| `node-ssr`           |                                                                                                              |
| `node-ssr-ts`        |                                                                                                              |
| `node-ssr-jsx`       |                                                                                                              |
| `node-ssr-jsx-ts`    |                                                                                                              |
| `vike`               |                                                                                                              |
| `vike-ts`            |                                                                                                              |
| `vike-jsx`           |                                                                                                              |
| `vike-jsx-ts`        |                                                                                                              |
| `deno-base`          |                                                                                                              |
| `deno-base-ts`       |                                                                                                              |
| `deno-routing`       |                                                                                                              |
| `deno-routing-ts`    |                                                                                                              |
| `deno-fs-routing`    |                                                                                                              |
| `deno-fs-routing-ts` |                                                                                                              |
| `deno-jsx`           |                                                                                                              |
| `deno-jsx-ts`        |                                                                                                              |

You can use `.` for the project name to scaffold in the current directory.

## Community Templates

**create-vanjs** is a tool to quickly start a project from a basic template for
VanJS. Check out Awesome Vite for
[community maintained templates](https://github.com/vitejs/awesome-vite#templates)
that include other tools or target different frameworks. You can use a tool like
[degit](https://github.com/Rich-Harris/degit) to scaffold your project with one
of the templates.

## About

This project is crafted by developers, for developers! Now you can really
develop applications of any kind or size with VanJS.

## Attribution

This project is originally a fork of
[create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite).
Credit goes to all of its contributors.
