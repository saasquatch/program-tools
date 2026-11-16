import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { ContextListener } from "dom-context";
import {
  lazilyStartUserContext,
  userIdentityFromJwt,
} from "../src/contexts/UserIdentityContext.ts";
import { USER_CONTEXT_NAME } from "../src/types.ts";

const base64url = (value: unknown) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");
const jwtFor = (payload: unknown) =>
  [base64url({ alg: "HS256" }), base64url(payload), "signature"].join(".");

const jwt = jwtFor({
  user: {
    id: "token-user",
    accountId: "token-account",
    email: "token@example.com",
  },
});

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

  it("takes identity fields from the JWT, not storage", () => {
    localStorage.setItem(
      USER_CONTEXT_NAME,
      JSON.stringify({ jwt, id: 1, accountId: null, email: false }),
    );
    const identity = lazilyStartUserContext().context;
    assert.equal(identity?.id, "token-user");
    assert.equal(identity?.accountId, "token-account");
    assert.equal(identity?.email, "token@example.com");
  });

  for (const invalid of [
    null,
    [],
    {},
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

describe("Widget API JWT", () => {
  const sub = `${btoa("widget-account")}:${btoa("widget-user")}@demo:users`;

  for (const invalid of [`${sub}-x`, `junk ${sub}`]) {
    it(`rejects a malformed subject: ${invalid}`, () => {
      assert.equal(userIdentityFromJwt(jwtFor({ sub: invalid })), undefined);
    });
  }

  it("decodes the account and user from the subject", () => {
    const identity = userIdentityFromJwt(jwtFor({ sub }));
    assert.equal(identity?.accountId, "widget-account");
    assert.equal(identity?.id, "widget-user");
  });
});
