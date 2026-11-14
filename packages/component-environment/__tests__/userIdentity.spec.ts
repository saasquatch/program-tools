/* oxlint-disable typescript/no-floating-promises */
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { ContextListener } from "dom-context";
import { lazilyStartUserContext } from "../src/contexts/UserIdentityContext.ts";
import { USER_CONTEXT_NAME } from "../src/types.ts";

const jwt = [
  Buffer.from(JSON.stringify({ alg: "HS256" })).toString("base64url"),
  Buffer.from(
    JSON.stringify({
      user: {
        id: "token-user",
        accountId: "token-account",
        email: "token@example.com",
      },
    }),
  ).toString("base64url"),
  "signature",
].join(".");

const storedIdentity = { id: "stored-user", accountId: "stored-account", jwt };
const managedIdentity = {
  email: "managed@example.com",
  emailVerified: true,
  sessionData: { nested: { value: 1 }, list: ["a"] },
};
const localStorageDescriptor = Object.getOwnPropertyDescriptor(
  globalThis,
  "localStorage",
);

beforeEach(() => {
  window.SquatchPortal = {
    tenantAlias: "demo",
    appDomain: "https://app.example.com",
    googleClientId: undefined,
  };
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: window.localStorage,
  });
  mock.method(
    ContextListener.prototype,
    "start",
    function (this: ContextListener<unknown>) {
      return this;
    },
  );
});

afterEach(() => {
  window.squatchUserIdentity?.stop();
  delete window.squatchUserIdentity;
  delete window.SquatchPortal;
  window.localStorage.clear();
  mock.restoreAll();
  if (localStorageDescriptor) {
    Object.defineProperty(globalThis, "localStorage", localStorageDescriptor);
  } else {
    Reflect.deleteProperty(globalThis, "localStorage");
  }
});

describe("Stored user identity", () => {
  for (const managed of [undefined, managedIdentity]) {
    it(`preserves valid identity with managed fields: ${Boolean(managed)}`, () => {
      localStorage.setItem(
        USER_CONTEXT_NAME,
        JSON.stringify({
          ...storedIdentity,
          managedIdentity: managed,
        }),
      );
      const identity = lazilyStartUserContext().context;
      assert.equal(identity?.id, "token-user");
      assert.equal(identity?.accountId, "token-account");
      assert.equal(identity?.email, "token@example.com");
      assert.equal(identity?.jwt, jwt);
      assert.deepEqual(identity?.managedIdentity, managed);
    });
  }

  for (const invalid of [
    null,
    [],
    {},
    { ...storedIdentity, id: 1 },
    { ...storedIdentity, accountId: null },
    { ...storedIdentity, email: false },
    { ...storedIdentity, jwt: 1 },
    { ...storedIdentity, managedIdentity: null },
    { ...storedIdentity, managedIdentity: {} },
    { ...storedIdentity, managedIdentity: { ...managedIdentity, email: 1 } },
    {
      ...storedIdentity,
      managedIdentity: { ...managedIdentity, emailVerified: "true" },
    },
    ...[null, [], "invalid"].map((sessionData) => ({
      ...storedIdentity,
      managedIdentity: { ...managedIdentity, sessionData },
    })),
  ]) {
    it(`rejects malformed stored identity: ${JSON.stringify(invalid)}`, () => {
      localStorage.setItem(USER_CONTEXT_NAME, JSON.stringify(invalid));
      assert.equal(lazilyStartUserContext().context, undefined);
    });
  }

  it("handles malformed JSON", () => {
    localStorage.setItem(USER_CONTEXT_NAME, "{");
    assert.equal(lazilyStartUserContext().context, undefined);
  });
});
