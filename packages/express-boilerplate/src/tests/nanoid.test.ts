import * as assert from "node:assert";
import { test } from "node:test";
import { nanoid } from "../nanoid.ts";

/* eslint-disable @typescript-eslint/no-floating-promises */

test("nanoid", () => {
  assert.strictEqual(nanoid().length, 32);
  assert.strictEqual(nanoid(12).length, 12);
  assert.strictEqual(nanoid(64).length, 64);
});
