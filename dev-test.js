/**
 * @fileoverview Development test runner for all VanJS templates.
 * @description This script automates testing of all template variants by:
 *   1. Installing/updating dependencies (pnpm for Node, deno for Deno)
 *   2. Starting the dev server for each template
 *   3. Verifying the server responds on port 5173
 *   4. Killing the server and reporting results
 *
 * @usage
 *   # Run all templates
 *   node dev-test.js
 *
 *   # Run specific template(s) using filter regex
 *   node dev-test.js --filter=node-base
 *   node dev-test.js --filter=deno-routing
 *   node dev-test.js --filter="node|deno"
 *
 * @requires Node.js 18+
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const WAIT_MS = 5000;
const PORT = 5173;

const results = [];

async function run(cmd, args, options = {}, timeoutMs = 60_000) {
  const { cwd: cwdPath, env: envVars, ...rest } = options;
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd: cwdPath,
      stdio: "pipe",
      env: { ...process.env, ...envVars },
      ...rest,
    });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d) => (stdout += d.toString()));
    proc.stderr.on("data", (d) => (stderr += d.toString()));

    const timer = setTimeout(() => {
      proc.kill("SIGTERM");
      reject(
        new Error(
          `Command timed out after ${timeoutMs}ms: ${cmd} ${args.join(" ")}`,
        ),
      );
    }, timeoutMs);

    proc.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(stdout);
      else {
        reject(
          new Error(
            `Command failed with code ${code}: ${cmd} ${
              args.join(" ")
            }\n${stderr}`,
          ),
        );
      }
    });
    proc.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function waitForPort(port, timeoutMs = 15_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://localhost:${port}`);
      if (
        res.ok ||
        res.status === 301 ||
        res.status === 302 ||
        res.status === 404
      ) {
        return true;
      }
    } catch {
      // port not ready
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Port ${port} did not respond within ${timeoutMs}ms`);
}

async function killProcessTree(proc) {
  if (proc.pid) {
    try {
      process.kill(-proc.pid, "SIGTERM");
    } catch {
      // already dead
    }
  }
}

const args = process.argv.slice(2);
const filterArg = args.find((a) => a.startsWith("--filter="));
const filterRe = filterArg ? new RegExp(filterArg.split("=")[1]) : null;

const directories = await fs.readdir(cwd);
let templates = directories.filter((d) => d.startsWith("template-"));
if (filterRe) templates = templates.filter((d) => filterRe.test(d));

for (const template of templates) {
  const templatePath = path.join(cwd, template);
  const isNode = template.startsWith("template-node-") ||
    template.startsWith("template-vike");
  const isDeno = template.startsWith("template-deno-");
  const start = Date.now();

  try {
    let devProc;

    if (isNode) {
      const hasNodeModules = await fs
        .stat(path.join(templatePath, "node_modules"))
        .then(() => true)
        .catch(() => false);

      const workspaceFile = path.join(cwd, "pnpm-workspace.yaml");
      const tempWorkspaceFile = path.join(cwd, "pnpm-workspace.yaml.bak");
      let movedWorkspace = false;
      if (await fs.stat(workspaceFile).then(() => true).catch(() => false)) {
        await fs.rename(workspaceFile, tempWorkspaceFile);
        movedWorkspace = true;
      }

      try {
        if (hasNodeModules) {
          console.log(`[${template}] Updating dependencies...`);
          await run("pnpm", ["update"], {
            cwd: templatePath,
            env: { ...process.env, CI: "true" },
          }, 120_000);
        } else {
          console.log(`[${template}] Installing dependencies...`);
          await run("pnpm", ["install"], {
            cwd: templatePath,
            env: { ...process.env, CI: "true" },
          }, 120_000);
        }
      } finally {
        if (movedWorkspace) {
          await fs.rename(tempWorkspaceFile, workspaceFile);
        }
      }
      console.log(`[${template}] Starting dev server...`);
      devProc = spawn("pnpm", ["run", "dev"], {
        cwd: templatePath,
        stdio: "pipe",
        detached: true,
      });
    } else if (isDeno) {
      const hasNodeModules = await fs
        .stat(path.join(templatePath, "node_modules"))
        .then(() => true)
        .catch(() => false);
      if (hasNodeModules) {
        console.log(`[${template}] Updating dependencies...`);
        await run(
          "deno",
          ["cache", "--reload", "deno.json"],
          { cwd: templatePath },
          120_000,
        );
      } else {
        console.log(`[${template}] Caching dependencies...`);
        await run(
          "deno",
          ["cache", "deno.json"],
          { cwd: templatePath },
          120_000,
        );
      }
      console.log(`[${template}] Starting dev server...`);
      devProc = spawn("deno", ["task", "dev"], {
        cwd: templatePath,
        stdio: "pipe",
        detached: true,
      });
    } else {
      results.push({
        template,
        type: "unknown",
        status: "skip",
        duration: "0ms",
        error: "",
      });
      continue;
    }

    let stderr = "";
    devProc.stderr?.on("data", (d) => (stderr += d.toString()));

    await waitForPort(PORT, 15_000);

    const exited = new Promise((resolve) => {
      devProc.on("close", resolve);
    });

    await new Promise((resolve) => setTimeout(resolve, WAIT_MS));

    // check if still alive
    if (devProc.exitCode !== null) {
      throw new Error(
        `Dev server exited early with code ${devProc.exitCode}\n${stderr}`,
      );
    }

    killProcessTree(devProc);
    await exited.catch(() => {});

    const duration = `${Date.now() - start}ms`;
    console.log(`[${template}] Passed (${duration})`);
    results.push({
      template,
      type: isNode ? "node" : "deno",
      status: "pass",
      duration,
      error: "",
    });
  } catch (err) {
    const duration = `${Date.now() - start}ms`;
    console.error(`[${template}] Failed (${duration}): ${err.message}`);
    results.push({
      template,
      type: isNode ? "node" : "deno",
      status: "fail",
      duration,
      error: err.message.split("\n")[0],
    });
  }
}

console.log("\n");
console.table(results);

const failed = results.filter((r) => r.status === "fail");
process.exit(failed.length > 0 ? 1 : 0);
