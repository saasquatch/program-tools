import { getWorld } from "./world";

// Disable all logging for running tests unless otherwise specified
if (!process.env.PROGRAM_LOG_LEVEL) process.env.PROGRAM_LOG_LEVEL = "none";

function hasTag(tag: string) {
  const match = expect.getState().currentTestName.match(/\[(.*)\]$/);
  return match && match[1] && match[1].split(",").includes(tag);
}

function printState() {
  const state = { ...getWorld().state };

  state.current = {
    ...state.current,
    template: "REMOVED FOR CLARITY",
  };

  return JSON.stringify(state, null, 2);
}

beforeEach(() => {
  // Reset the world between each test
  getWorld().reset();

  if (hasTag("@debug")) {
    console.debug(`
===== State before "${expect.getState().currentTestName}" =====
${printState()}
==================================================
    `);
  }
});

afterEach(() => {
  if (hasTag("@debug")) {
    console.debug(`
===== State after "${expect.getState().currentTestName}" =====
${printState()}
==================================================
    `);
  }
});
