#!/usr/bin/env node

// @ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import prompts from "prompts";
import colors from "picocolors";

const {
  blue,
  cyan,
  green,
  redBright,
  blueBright,
  magenta,
  red,
  reset,
  yellow,
  magentaBright,
} = colors;

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist(process.argv.slice(2), { string: ["_"] });
const cwd = process.cwd();

const FRAMEWORKS = [
  {
    name: "node-base",
    color: green,
    variants: [
      {
        name: "node-base",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "node-base-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "node-jsx",
    color: green,
    variants: [
      {
        name: "node-jsx",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "node-jsx-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "node-ssr",
    color: green,
    variants: [
      {
        name: "node-ssr",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "node-ssr-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "node-ssr-jsx",
    color: green,
    variants: [
      {
        name: "node-ssr-jsx",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "node-ssr-jsx-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "vike",
    color: cyan,
    variants: [
      {
        name: "vike",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "vike-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "vike-jsx",
    color: cyan,
    variants: [
      {
        name: "vike-jsx",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "vike-jsx-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "deno-base",
    color: magenta,
    variants: [
      {
        name: "deno-base",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "deno-base-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "deno-jsx",
    color: magenta,
    variants: [
      {
        name: "deno-jsx",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "deno-jsx-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
];

const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), []);

const renameFiles = {
  _gitignore: ".gitignore",
};

async function init() {
  /** @type {string} */
  // @ts-ignore
  let targetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  const defaultTargetDir = "vanjs-project";
  const getProjectName = () => path.basename(path.resolve(targetDir));

  let result = {};

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : "text",
          name: "projectName",
          message: reset("Project name:"),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
          name: "overwrite",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          // @ts-ignore
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : "text"),
          name: "packageName",
          message: reset("Package name:"),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name",
        },
        {
          type: argTemplate && TEMPLATES.includes(argTemplate)
            ? null
            : "select",
          name: "framework",
          message:
            typeof argTemplate === "string" && !TEMPLATES.includes(argTemplate)
              ? reset(
                `"${argTemplate}" isn't a valid template. Please choose from below: `,
              )
              : reset("Select a template:"),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            };
          }),
        },
        // Variant 1
        {
          type: (framework) =>
            framework && framework.variants ? "select" : null,
          name: "variant",
          message: reset("Select a variant:"),
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.variants ? variant : variant.name,
              };
            }),
        },
        // Variant 2
        {
          type: (framework) =>
            framework && framework.variants ? "select" : null,
          name: "variant",
          message: reset("Select a variant:"),
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      },
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { framework, overwrite, packageName, variant } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // determine template
  let template = variant || framework?.name || argTemplate;

  console.log(`\nScaffolding project in ${root}...`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    `template-${template}`,
  );

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  const isDeno = template.startsWith("deno-");
  if (isDeno) {
    console.log(`\nDone. Now run:\n`);
    if (root !== cwd) {
      console.log(`  cd ${path.relative(cwd, root)}`);
    }
    console.log("  deno task dev");
    console.log();
  } else {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), "utf-8"),
    );

    pkg.name = packageName || getProjectName();

    write("package.json", JSON.stringify(pkg, null, 2));

    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
    const pkgManager = pkgInfo ? pkgInfo.name : "npm";

    console.log(`\nDone. Now run:\n`);
    if (root !== cwd) {
      console.log(`  cd ${path.relative(cwd, root)}`);
    }
    switch (pkgManager) {
      case "yarn":
        console.log("  yarn");
        console.log("  yarn dev");
        break;
      default:
        console.log(`  ${pkgManager} install`);
        console.log(`  ${pkgManager} run dev`);
        break;
    }
    console.log();
  }
}

/**
 * @param {string | undefined} targetDir
 */
function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

/**
 * Copy file/folder
 * @param {string} src
 * @param {string} dest
 */
function copy(src, dest) {
  if (src.includes("node_modules")) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

/**
 * @param {string} projectName
 */
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  );
}

/**
 * @param {string} projectName
 */
function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

/**
 * @param {string} srcDir
 * @param {string} destDir
 */
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

/**
 * @param {string} path
 */
function isEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

/**
 * @param {string} dir
 */
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

init().catch((e) => {
  console.error(e);
});
