import assert from "node:assert/strict";
import type { User } from "@saasquatch/program-boilerplate/dist/types/saasquatch.d.ts";
import { getWorld } from "./world.ts";

export function parseTestNumber(text: string): number {
  if (text === "NaN") {
    return NaN;
  }

  assert.ok(text.trim().length > 0, "A number must not be empty");

  const value = Number(text);
  assert.ok(!Number.isNaN(value), `Invalid test number: ${text}`);

  return value;
}

export function updateTestUser(audience: string, patch: Partial<User>): void {
  assert.ok(
    audience === "referred" || audience === "referrer",
    `Unknown audience: ${audience}`,
  );

  getWorld().setState({
    current: {
      user:
        audience === "referred"
          ? patch
          : { referredByReferral: { referrerUser: patch } },
    },
  });
}

export function getTestUser(
  audience = "referred",
  options: { create?: boolean } = {},
): User {
  assert.ok(
    audience === "referred" || audience === "referrer",
    `Unknown audience: ${audience}`,
  );

  const referred: User | undefined = getWorld().state.current.user;
  const user =
    audience === "referred"
      ? referred
      : referred?.referredByReferral?.referrerUser;

  if (!user && options.create) {
    updateTestUser(audience, {});
    return getTestUser(audience);
  }

  assert.ok(user, `The ${audience} user does not exist`);
  return user;
}

export function parseTestSegments(text: string): string[] {
  const segments: unknown = JSON.parse(text);

  assert.ok(
    Array.isArray(segments) &&
      segments.every((segment) => typeof segment === "string"),
    "Segments must be an array of strings",
  );

  return segments;
}
