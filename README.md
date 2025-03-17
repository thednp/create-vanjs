# create-vanjs

## Scaffolding Your First VanJS Project

> **Compatibility Note:** Vite requires [Node.js](https://nodejs.org/en/)
> version 18+, 20+, 22+. However, some templates require a higher Node.js
> version to work, please upgrade if your package manager warns about it.

```bash
# NPM:
$ npm create vanjs@latest
```

```bash
# PNPM:
$ pnpm create vanjs
```

```bash
# Deno:
$ deno run -A npm:create-vanjs
```

```bash
# Bun:
$ bun create vanjs
```

```bash
# Yarn:
$ yarn create vanjs
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
# yarn
yarn create vanjs my-vanjs-app --template node-base
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

| Template          | Try online                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `node-base`       | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-base)       |
| `node-base-ts`    | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-base-ts)    |
| `node-jsx`        | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-jsx)        |
| `node-jsx-ts`     | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-jsx-ts)     |
| `node-ssr`        | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-ssr)        |
| `node-ssr-ts`     | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-ssr-ts)     |
| `node-ssr-jsx`    | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-ssr-jsx)    |
| `node-ssr-jsx-ts` | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-node-ssr-jsx-ts) |
| `vike`            | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-vike)            |
| `vike-ts`         | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-vike-ts)         |
| `vike-jsx`        | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-vike-jsx)        |
| `vike-jsx-ts`     | [StackBlitz](https://stackblitz.com/fork/github/thednp/create-vanjs/tree/master/template-vike-jsx-ts)     |
| `deno-base`       |                                                                                                           |
| `deno-base-ts`    |                                                                                                           |
| `deno-jsx`        |                                                                                                           |
| `deno-jsx-ts`     |                                                                                                           |

You can use `.` for the project name to scaffold in the current directory.

## Community Templates

**create-vanjs** is a tool to quickly start a project from a basic template for
popular frameworks. Check out Awesome Vite for
[community maintained templates](https://github.com/vitejs/awesome-vite#templates)
that include other tools or target different frameworks. You can use a tool like
[degit](https://github.com/Rich-Harris/degit) to scaffold your project with one
of the templates.

```bash
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

If the project uses `master` as the default branch, suffix the project repo with
`#master`

```bash
npx degit user/project#main my-project
```

## About

This project is crafted by developers, for developers! You really don't need the
mental gymnastics of React to manage local, derived or global state,
composability or scalability, there is no barrier anywhere, you can really
develop applications of any kind or size with VanJS.

## Attribution

This project is originally a fork of
[create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite).
Credit goes to all of its contributors.
