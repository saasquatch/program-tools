import { buildFontsCssUrl } from "./fonts/GoogleFonts";

const STYLESHEET_ID = "brandFontStylesheet";

function inferFontFormat(url: string): string | undefined {
  const ext = url.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase();
  if (ext === "woff2") return "woff2";
  if (ext === "woff") return "woff";
  if (ext === "ttf") return "truetype";
  if (ext === "otf") return "opentype";
  return undefined;
}

function buildFontFaceCss(family: string, url: string): string {
  const format = inferFontFormat(url);
  const src = format
    ? `url("${url}") format("${format}")`
    : `url("${url}")`;
  return `@font-face { font-family: "${family}"; src: ${src}; font-display: swap; }`;
}

function removeExisting(container: HTMLElement) {
  const existing = container.querySelector(`#${STYLESHEET_ID}`);
  if (existing) container.removeChild(existing);
}

export function insertFont(font: string, customFontUrl?: string) {
  if (font === undefined) {
    throw new Error("insert-font: No font was provided");
  }

  const container = document.querySelector("head");

  if (customFontUrl) {
    const css = buildFontFaceCss(font, customFontUrl);
    const existing = container.querySelector(
      `style#${STYLESHEET_ID}`
    ) as HTMLStyleElement | null;
    if (existing && existing.textContent === css) return;

    removeExisting(container);

    const style = document.createElement("style");
    style.setAttribute("id", STYLESHEET_ID);
    style.textContent = css;
    container.appendChild(style);
    return;
  }

  const url = buildFontsCssUrl(font);
  const existingLink = container.querySelector(
    `link#${STYLESHEET_ID}`
  ) as HTMLLinkElement | null;
  if (existingLink?.getAttribute("href") === url) return;

  removeExisting(container);

  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", url);
  link.setAttribute("id", STYLESHEET_ID);
  container.appendChild(link);
}
