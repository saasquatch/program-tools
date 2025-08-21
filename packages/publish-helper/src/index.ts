#!/usr/bin/env node

import { exec as child_exec } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { createInterface } from "node:readline";
import { promisify } from "node:util";
import { parse as yamlParse } from "yaml";
const exec = promisify(child_exec);

import { gitCurrentBranch } from "./git";
import { select } from "./select";

const workflowName = "publish-package.yml";

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  if (dryRun) {
    console.log(`=== DRY RUN ===`);
  }

  let gitRoot: string | undefined = undefined;
  try {
    const { stdout } = await exec("git rev-parse --show-toplevel");
    gitRoot = stdout.trim();
  } catch (e) {
    console.error(`Error: could not determine Git repository`);
    return;
  }

  const currentBranch = await gitCurrentBranch();

  try {
    const { stdout } = await exec(`git log origin/"${currentBranch}"..HEAD`);

    if (stdout.trim().length > 0) {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const shouldContinue = await new Promise<boolean>((resolve) => {
        rl.question(
          "WARN: You have un-pushed commits. The package will be published in CI using the commits pushed to GitHub. Continue anyway? [y/N] ",
          (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === "y");
          },
        );
      });

      if (!shouldContinue) {
        return;
      }
    }
  } catch (e) {
    console.error(`Failed to check for un-pushed commits.`);
    return;
  }

  const workflowFile = join(gitRoot, ".github", "workflows", workflowName);

  if (!existsSync(workflowFile)) {
    console.error("Could not find GH Actions workflow in Git repository.");
    return;
  }

  const workflow = yamlParse(await readFile(workflowFile, "utf8"));
  const packageOptions = workflow.on.workflow_dispatch.inputs.package
    .options as string[];

  const bumpOptions = workflow.on.workflow_dispatch.inputs["increment-type"]
    .options as string[];

  const currentPackage = relative(join(gitRoot, "packages"), process.cwd());

  const packageChoice = await select(
    "Select package:",
    packageOptions.map((o) => ({
      value: o,
      isDefault: currentPackage === o,
    })),
  );

  const bumpChoice = await select(
    "Select version bump type:",
    bumpOptions.map((o) => ({
      value: o,
      isDefault: o === "prerelease",
    })),
  );

  if (
    packageChoice.includes('"') ||
    bumpChoice.includes('"') ||
    packageChoice.includes("$") ||
    bumpChoice.includes("$")
  ) {
    throw new Error("Inputs cannot include double quotes or dollar signs");
  }

  const workflowRunCmd = `gh workflow run ${workflowName} --ref "${currentBranch}" -f "package=${packageChoice}" -f "increment-type=${bumpChoice}"`;
  console.log("$ " + `\x1b[1m${workflowRunCmd}\x1b[0m`);
  if (!dryRun) {
    await exec(workflowRunCmd);
  }

  console.log();
  console.log("Workflow started, sleeping for a few seconds...");

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));

  const workflowViewCmd = `gh workflow view ${workflowName}`;
  console.log("$ " + `\x1b[1m${workflowViewCmd}\x1b[0m`);
  if (!dryRun) {
    const { stdout } = await exec(workflowViewCmd);

    const runs = stdout
      .trim()
      .split(/\r?\n/g)
      .map((l) => l.trim())
      .filter((l) => l.includes(currentBranch));

    if (runs.length === 0) {
      console.error(
        "Error: Could not find recently created run in list of workflow runs. Logs link is unavailable.",
      );
      return;
    }

    const runId = runs[0]!.split("\t").slice(-1)[0];
    console.log(
      `\n\nWorkflow logs: \x1b[4mhttps://github.com/saasquatch/program-tools/actions/runs/${runId}\x1b[4m`,
    );
  }
}

main();
