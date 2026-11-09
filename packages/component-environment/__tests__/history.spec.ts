/* oxlint-disable typescript/no-floating-promises */
import assert from "node:assert";
import { describe, it, before, mock } from "node:test";
import history, { BrowserHistory, MemoryHistory } from "../src/history.ts";

const memoryHistoryListener = mock.fn();
const browserHistoryListener = mock.fn();

describe("Lazy History", () => {
  it("does not instantiate a history object at startup", () => {
    assert.strictEqual(window.squatchHistory, undefined);
  });

  it("creates history lazily", () => {
    history.push("/");
    assert.notEqual(window.squatchHistory, undefined);
  });
});

describe("Memory History", () => {
  before(() => {
    window.squatchHistory = undefined;
  });

  it("creates an instance of MemoryHistory in the absence of SquatchPortal", () => {
    assert.strictEqual(history.location.pathname, "/");
    assert.ok(window.squatchHistory instanceof MemoryHistory);
  });

  it("has an initial entry of /", () => {
    assert.strictEqual(history.location.pathname, "/");
  });

  it("calls listeners on route changes", () => {
    const cleanup = history.listen(memoryHistoryListener);
    history.push("/test");
    assert.strictEqual(memoryHistoryListener.mock.calls.length, 1);
    cleanup();
  });

  it("pushes history entries", () => {
    history.push("/test1");
    assert.strictEqual(history.location.pathname, "/test1");
    history.push("/test2");
    assert.strictEqual(history.location.pathname, "/test2");
  });

  it("replaces history entries", () => {
    history.push("/test1");
    assert.strictEqual(history.location.pathname, "/test1");
    history.replace("/test2");
    assert.strictEqual(history.location.pathname, "/test2");
  });

  it("can go back", () => {
    history.push("/test1");
    assert.strictEqual(history.location.pathname, "/test1");
    history.push("/test2");
    assert.strictEqual(history.location.pathname, "/test2");
    history.back();
    assert.strictEqual(history.location.pathname, "/test1");
  });

  it("can go forward", () => {
    history.push("/test1");
    assert.strictEqual(history.location.pathname, "/test1");
    history.push("/test2");
    assert.strictEqual(history.location.pathname, "/test2");
    history.back();
    assert.strictEqual(history.location.pathname, "/test1");
    history.forward();
    assert.strictEqual(history.location.pathname, "/test2");
  });

  it("can go to an arbitrary delta", () => {
    history.push("/test1");
    history.push("/test2");
    history.push("/test3");
    history.push("/test4");
    history.push("/test5");

    history.go(-2);
    assert.strictEqual(history.location.pathname, "/test3");

    history.go(2);
    assert.strictEqual(history.location.pathname, "/test5");
  });

  it("supports query params", () => {
    history.push({ pathname: "/test1", search: "?foo=bar" });
    assert.strictEqual(history.location.pathname, "/test1");
    assert.strictEqual(history.location.search, "?foo=bar");
    assert.strictEqual(
      new URLSearchParams(history.location.search).get("foo"),
      "bar",
    );
  });
});

// NOTE: jsdom doesn't actually support back/forward/go in its History implementation,
//       so we can't write natural tests for those.

describe("Browser History", () => {
  before(() => {
    window.squatchHistory = undefined;
    window.SquatchPortal = {
      appDomain: "https://app.referralsaasquatch.com",
      tenantAlias: "demo",
      googleClientId: undefined,
    };
  });

  it("creates an instance of BrowserHistory when in a SquatchPortal", () => {
    assert.strictEqual(history.location.pathname, window.location.pathname);
    assert.ok(window.squatchHistory instanceof BrowserHistory);
  });

  it("has an initial entry that matches the window location", () => {
    assert.strictEqual(history.location.pathname, window.location.pathname);
  });

  it("calls listeners on route changes", () => {
    const cleanup = history.listen(browserHistoryListener);
    history.push("/test");
    assert.strictEqual(browserHistoryListener.mock.calls.length, 1);
    cleanup();
  });

  it("pushes history entries", () => {
    history.push("/test1");
    assert.strictEqual(history.location.pathname, "/test1");
    history.push("/test2");
    assert.strictEqual(history.location.pathname, "/test2");
  });

  it("replaces history entries", () => {
    history.push("/test1");
    assert.strictEqual(history.location.pathname, "/test1");
    history.replace("/test2");
    assert.strictEqual(history.location.pathname, "/test2");
  });

  it("supports query params", () => {
    history.push({ pathname: "/test1", search: "?foo=bar" });
    assert.strictEqual(history.location.pathname, "/test1");
    assert.strictEqual(history.location.search, "?foo=bar");
    assert.strictEqual(
      new URLSearchParams(history.location.search).get("foo"),
      "bar",
    );
  });
});
