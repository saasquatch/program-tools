import { describe, it, expect } from "vitest";
import { buildFontsCssUrl } from "./GoogleFonts";

describe("buildFontsCssUrl", () => {
  it("builds URL for a single font", () => {
    expect(buildFontsCssUrl("Roboto")).toBe(
      "https://fonts.googleapis.com/css2?family=Roboto",
    );
  });

  it("builds URL for multiple fonts", () => {
    const url = buildFontsCssUrl("Roboto", "Open Sans");
    expect(url).toBe(
      "https://fonts.googleapis.com/css2?family=Roboto&family=Open%20Sans",
    );
  });

  it("encodes special characters in font names", () => {
    const url = buildFontsCssUrl("Noto Sans+Display");
    expect(url).toContain("family=Noto%20Sans%2BDisplay");
  });

  it("handles a single font with weight specification", () => {
    const url = buildFontsCssUrl("Roboto:wght@400;700");
    expect(url).toContain("family=Roboto%3Awght%40400%3B700");
  });
});
