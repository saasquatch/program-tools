import * as assert from "node:assert";
import { test } from "node:test";
import { formatGenericError } from "../error.ts";

// oxlint-disable typescript/no-floating-promises

test("formatGenericError", () => {
  const error = new Error("Error message");
  const formatted = formatGenericError(error);

  assert.ok(formatted.e instanceof Error);
  assert.strictEqual(typeof formatted.eStr, "string");
  assert.strictEqual(formatted.eStr, "Error: Error message");
  assert.strictEqual(typeof formatted.eJson, "string");
});
