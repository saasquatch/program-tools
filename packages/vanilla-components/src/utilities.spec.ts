import { isUrl } from "./utilities";

describe("isUrl", () => {
  it("detects URL backgrounds", () => {
    expect(isUrl("https://example.com/image.png")).toBe(true);
    expect(isUrl("http://example.com/image.png")).toBe(true);
    expect(isUrl("www.example.com/image.png")).toBe(true);
    expect(isUrl("example.com/image.png")).toBe(true);
    expect(isUrl("//example.com/image.png")).toBe(true);
    expect(isUrl("//www.example.com/image.png")).toBe(true);
    expect(isUrl("  https://example.com/image.png  ")).toBe(true);
  });

  it("does not treat colors as URLs", () => {
    expect(isUrl("#4486E1")).toBe(false);
    expect(isUrl("red")).toBe(false);
    expect(isUrl("rgba(0, 0, 0, 0.5)")).toBe(false);
    expect(isUrl("linear-gradient(to right, #fff, #000)")).toBe(false);
  });

  it("does not match URLs embedded mid-value", () => {
    expect(isUrl("color https://example.com/image.png")).toBe(false);
  });

  // Regression: the previous unanchored regex rescanned the suffix at every
  // word boundary, causing quadratic-time matching that froze the widget on
  // long non-matching backgrounds since isUrl runs synchronously in render().
  it("handles pathological non-URL input in linear time", () => {
    const pathological = "a.".repeat(32000) + "!";
    const start = Date.now();
    expect(isUrl(pathological)).toBe(false);
    expect(isUrl("//" + pathological)).toBe(false);
    expect(Date.now() - start).toBeLessThan(200);
  });
});
