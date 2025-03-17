#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import spawn from "cross-spawn";
// import mri from 'mri'
import minimist from "minimist";
import * as prompts from "@clack/prompts";
import colors from "picocolors";

const {
  blue,
  // blueBright,
  cyan,
  green,
  // greenBright,
  magenta,
  // red,
  // redBright,
  // reset,
  yellow,
} = colors;

const argv = minimist(process.argv.slice(2), { string: ["_"] });

const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Usage: create-vanjs [OPTION]... [DIRECTORY]

Create a new VanJS project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${green("node-base-ts        node-base")}
${green("node-jsx-ts         node-jsx")}
${green("node-ssr-ts         node-ssr")}
${green("node-ssr-jsx-ts     node-ssr-jsx")}
${cyan("deno-base-ts        deno-base")}
${cyan("deno-jsx-ts         deno-jsx")}
${magenta("vike-ts             vike")}
${magenta("vike-jsx-ts         vike-jsx")}`;

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

const TEMPLATES = FRAMEWORKS.map((f) => f.variants.map((v) => v.name)).reduce(
  (a, b) => a.concat(b),
  [],
);
// const TEMPLATES = FRAMEWORKS.map(
//   (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
// ).reduce((a, b) => a.concat(b), []);

const renameFiles = {
  _gitignore: ".gitignore",
};

const defaultTargetDir = "vanjs-project";

async function init() {
  const argTargetDir = argv._[0]
    ? formatTargetDir(String(argv._[0]))
    : undefined;
  const argTemplate = argv.template;
  const argOverwrite = argv.overwrite;

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const cancel = () => prompts.cancel("Operation cancelled");

  // 1. Get project name and target dir
  let targetDir = argTargetDir;
  if (!targetDir) {
    const projectName = await prompts.text({
      message: "Project name:",
      defaultValue: defaultTargetDir,
      placeholder: defaultTargetDir,
    });
    if (prompts.isCancel(projectName)) return cancel();
    targetDir = formatTargetDir(projectName);
  }

  // 2. Handle directory if exist and not empty
  if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
    const overwrite = argOverwrite ? "yes" : await prompts.select({
      message: (targetDir === "."
        ? "Current directory"
        : `Target directory "${targetDir}"`) +
        ` is not empty. Please choose how to proceed:`,
      options: [
        {
          label: "Cancel operation",
          value: "no",
        },
        {
          label: "Remove existing files and continue",
          value: "yes",
        },
        {
          label: "Ignore files and continue",
          value: "ignore",
        },
      ],
    });
    if (prompts.isCancel(overwrite)) return cancel();
    switch (overwrite) {
      case "yes":
        emptyDir(targetDir);
        break;
      case "no":
        cancel();
        return;
    }
  }

  // 3. Get package name
  let packageName = path.basename(path.resolve(targetDir));
  if (!isValidPackageName(packageName)) {
    const packageNameResult = await prompts.text({
      message: "Package name:",
      defaultValue: toValidPackageName(packageName),
      placeholder: toValidPackageName(packageName),
      validate(dir) {
        if (!isValidPackageName(dir)) {
          return "Invalid package.json name";
        }
      },
    });
    if (prompts.isCancel(packageNameResult)) return cancel();
    packageName = packageNameResult;
  }

  // 4. Choose a framework and variant
  let template = argTemplate;
  let hasInvalidArgTemplate = false;
  if (argTemplate && !TEMPLATES.includes(argTemplate)) {
    template = undefined;
    hasInvalidArgTemplate = true;
  }
  if (!template) {
    const framework = await prompts.select({
      message: hasInvalidArgTemplate
        ? `"${argTemplate}" isn't a valid template. Please choose from below: `
        : "Select a framework:",
      options: FRAMEWORKS.map((framework) => {
        const frameworkColor = framework.color;
        return {
          label: frameworkColor(framework.display || framework.name),
          value: framework,
        };
      }),
    });
    if (prompts.isCancel(framework)) return cancel();

    const variant = await prompts.select({
      message: "Select a variant:",
      options: framework.variants.map((variant) => {
        const variantColor = variant.color;
        const command = variant.customCommand
          ? getFullCustomCommand(variant.customCommand, pkgInfo).replace(
            / TARGET_DIR$/,
            "",
          )
          : undefined;
        return {
          label: variantColor(variant.display || variant.name),
          value: variant.name,
          hint: command,
        };
      }),
    });
    if (prompts.isCancel(variant)) return cancel();

    template = variant;
  }

  const root = path.join(cwd, targetDir);
  fs.mkdirSync(root, { recursive: true });

  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ??
      {};

  if (customCommand) {
    const fullCustomCommand = getFullCustomCommand(customCommand, pkgInfo);

    const [command, ...args] = fullCustomCommand.split(" ");
    // we replace TARGET_DIR here because targetDir may include a space
    const replacedArgs = args.map((arg) =>
      arg.replace("TARGET_DIR", () => targetDir)
    );
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: "inherit",
    });
    process.exit(status ?? 0);
  }

  prompts.log.step(`Scaffolding project in ${root}...`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    `template-${template}`,
  );

  const write = (file, content) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
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
  if (!isDeno) {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), "utf-8"),
    );

    pkg.name = packageName;

    write("package.json", JSON.stringify(pkg, null, 2) + "\n");
  }

  let doneMessage = "";
  const cdProjectName = path.relative(cwd, root);
  doneMessage += `Done. Now run:\n`;
  if (root !== cwd) {
    doneMessage += `\n  cd ${
      cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
    }`;
  }
  if (!isDeno) {
    switch (pkgManager) {
      case "yarn":
        doneMessage += "\n  yarn";
        doneMessage += "\n  yarn dev";
        break;
      default:
        doneMessage += `\n  ${pkgManager} install`;
        doneMessage += `\n  ${pkgManager} run dev`;
        break;
    }
  } else {
    doneMessage += `\n  deno task dev`;
  }
  prompts.outro(doneMessage);
}

function formatTargetDir(targetDir) {
  return targetDir.trim().replace(/\/+$/g, "");
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  );
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function isEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

function getFullCustomCommand(customCommand, pkgInfo) {
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  const isYarn1 = pkgManager === "yarn" && pkgInfo?.version.startsWith("1.");

  return (
    customCommand
      .replace(/^npm create /, () => {
        // `bun create` uses it's own set of templates,
        // the closest alternative is using `bun x` directly on the package
        if (pkgManager === "bun") {
          return "bun x create-";
        }
        return `${pkgManager} create `;
      })
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace("@latest", () => (isYarn1 ? "" : "@latest"))
      .replace(/^npm exec/, () => {
        // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
        if (pkgManager === "pnpm") {
          return "pnpm dlx";
        }
        if (pkgManager === "yarn" && !isYarn1) {
          return "yarn dlx";
        }
        if (pkgManager === "bun") {
          return "bun x";
        }
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return "npm exec";
      })
  );
}

init().catch((e) => {
  console.error(e);
});
