import history, { BrowserHistory, MemoryHistory } from "../src/history";

const memoryHistoryListener = jest.fn();
const browserHistoryListener = jest.fn();

describe("Lazy History", () => {
  it("does not instantiate a history object at startup", () => {
    expect(window.squatchHistory).toBeUndefined();
  });

  it("creates history lazily", () => {
    history.push("/");
    expect(window.squatchHistory).not.toBeUndefined();
  });
});

describe("Memory History", () => {
  beforeAll(() => {
    (window.squatchHistory as any) = undefined;
  });

  it("creates an instance of MemoryHistory in the absence of SquatchPortal", () => {
    expect(history.location.pathname).toBe("/");
    expect(window.squatchHistory).toBeInstanceOf(MemoryHistory);
  });

  it("has an initial entry of /", () => {
    expect(history.location.pathname).toBe("/");
  });

  it("calls listeners on route changes", () => {
    const cleanup = history.listen(memoryHistoryListener);
    history.push("/test");
    expect(memoryHistoryListener).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it("pushes history entries", () => {
    history.push("/test1");
    expect(history.location.pathname).toBe("/test1");
    history.push("/test2");
    expect(history.location.pathname).toBe("/test2");
  });

  it("replaces history entries", () => {
    history.push("/test1");
    expect(history.location.pathname).toBe("/test1");
    history.replace("/test2");
    expect(history.location.pathname).toBe("/test2");
  });

  it("can go back", () => {
    history.push("/test1");
    expect(history.location.pathname).toBe("/test1");
    history.push("/test2");
    expect(history.location.pathname).toBe("/test2");
    history.back();
    expect(history.location.pathname).toBe("/test1");
  });

  it("can go forward", () => {
    history.push("/test1");
    expect(history.location.pathname).toBe("/test1");
    history.push("/test2");
    expect(history.location.pathname).toBe("/test2");
    history.back();
    expect(history.location.pathname).toBe("/test1");
    history.forward();
    expect(history.location.pathname).toBe("/test2");
  });

  it("can go to an arbitrary delta", () => {
    history.push("/test1");
    history.push("/test2");
    history.push("/test3");
    history.push("/test4");
    history.push("/test5");

    history.go(-2);
    expect(history.location.pathname).toBe("/test3");

    history.go(2);
    expect(history.location.pathname).toBe("/test5");
  });

  it("supports query params", () => {
    history.push({ pathname: "/test1", search: "?foo=bar" });
    expect(history.location.pathname).toBe("/test1");
    expect(history.location.search).toBe("?foo=bar");
    expect(new URLSearchParams(history.location.search).get("foo")).toBe("bar");
  });
});

// NOTE: jsdom doesn't actually support back/forward/go in its History implementation,
//       so we can't write natural tests for those.

describe("Browser History", () => {
  beforeAll(() => {
    (window.squatchHistory as any) = undefined;
    window.SquatchPortal = {
      appDomain: "https://app.referralsaasquatch.com",
      tenantAlias: "demo",
    };
  });

  it("creates an instance of BrowserHistory when in a SquatchPortal", () => {
    expect(history.location.pathname).toBe(window.location.pathname);
    expect(window.squatchHistory).toBeInstanceOf(BrowserHistory);
  });

  it("has an initial entry that matches the window location", () => {
    expect(history.location.pathname).toBe(window.location.pathname);
  });

  it("calls listeners on route changes", () => {
    const cleanup = history.listen(browserHistoryListener);
    history.push("/test");
    expect(browserHistoryListener).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it("pushes history entries", () => {
    history.push("/test1");
    expect(history.location.pathname).toBe("/test1");
    history.push("/test2");
    expect(history.location.pathname).toBe("/test2");
  });

  it("replaces history entries", () => {
    history.push("/test1");
    expect(history.location.pathname).toBe("/test1");
    history.replace("/test2");
    expect(history.location.pathname).toBe("/test2");
  });

  it("supports query params", () => {
    history.push({ pathname: "/test1", search: "?foo=bar" });
    expect(history.location.pathname).toBe("/test1");
    expect(history.location.search).toBe("?foo=bar");
    expect(new URLSearchParams(history.location.search).get("foo")).toBe("bar");
  });
});
