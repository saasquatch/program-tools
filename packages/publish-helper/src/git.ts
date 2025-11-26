import { promisify } from "node:util";
import { exec as child_exec } from "node:child_process";
const exec = promisify(child_exec);

export async function gitCurrentBranch(): Promise<string> {
  let ref: string | undefined;
  try {
    const { stdout } = await exec("git symbolic-ref --quiet HEAD");
    ref = stdout.trim();
  } catch (e) {
    try {
      const { stdout } = await exec("git rev-parse --short HEAD");
      ref = stdout.trim();
    } catch (e) {}
  }

  if (!ref) {
    throw new Error("Failed to determine current Git branch");
  }

  return ref.replace("refs/heads/", "");
}
