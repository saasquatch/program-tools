import assert from "node:assert/strict";
import type { IntrospectionError, IntrospectionErrorRow } from "./types.ts";
import { getWorld } from "./world.ts";

export function getIntrospectionTemplate(): any {
  const result = getWorld().state.programTriggerResult;

  assert.ok(
    result && typeof result === "object",
    "Program introspection must return an object",
  );

  assert.equal(result.error, undefined, "Program introspection must succeed");

  const template = "template" in result ? result.template : result;
  assert.ok(
    template && typeof template === "object",
    "Program introspection must return a template",
  );

  return template;
}

export function getIntrospectionErrors(): IntrospectionError[] {
  // called only for the assertions in the function
  void getIntrospectionTemplate();

  const result: { errors?: IntrospectionError[] } =
    getWorld().state.programTriggerResult;

  const errors = result.errors ?? [];
  assert.ok(Array.isArray(errors));

  for (const error of errors) {
    assert.ok(error && typeof error === "object");
    assert.equal(Object.keys(error).length, 3);
    assert.equal(typeof error.key, "string");
    assert.equal(typeof error.jsonPointer, "string");
    assert.equal(typeof error.description, "string");
    assert.ok(error.key.length > 0);
    assert.ok(error.description.trim().length > 0);
  }

  return errors;
}

function countIntrospectionErrors(
  errors: readonly IntrospectionErrorRow[],
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const { key, jsonPointer } of errors) {
    const signature = JSON.stringify([key, jsonPointer]);
    counts.set(signature, (counts.get(signature) ?? 0) + 1);
  }

  return counts;
}

export function assertIntrospectionErrors(
  expected: readonly IntrospectionErrorRow[],
  options: { ordered?: boolean } = {},
): void {
  assert.ok(Array.isArray(expected));

  const actual = getIntrospectionErrors().map(({ key, jsonPointer }) => ({
    key,
    jsonPointer,
  }));

  if (options.ordered) {
    assert.deepEqual(actual, expected);
    return;
  }

  assert.deepEqual(
    countIntrospectionErrors(actual),
    countIntrospectionErrors(expected),
  );
}
