import { getWorld } from "./world";

// Disable all logging for running tests unless otherwise specified
if (!process.env.PROGRAM_LOG_LEVEL) process.env.PROGRAM_LOG_LEVEL = "none";

function hasTag(tag: string) {
  const match = expect.getState().currentTestName.match(/\[(.*)\]$/);
  return match && match[1] && match[1].split(",").includes(tag);
}

beforeEach(() => {
  if (hasTag("@debug")) {
    console.debug(`
===== State before "${expect.getState().currentTestName}" =====
${JSON.stringify(getWorld().state, null, 2)}
==================================================
    `);
  }
  getWorld().reset();
});

afterEach(() => {
  if (hasTag("@debug")) {
    console.debug(`
===== State after "${expect.getState().currentTestName}" =====
${JSON.stringify(getWorld().state, null, 2)}
==================================================
    `);
  }
});
