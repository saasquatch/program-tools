import { buildFontsCssUrl } from "./fonts/GoogleFonts";

export function insertFont(font: string) {
  if (font === undefined) {
    throw new Error("insert-font: No font was provided");
  }

  const container = document.querySelector("head");
  const url = buildFontsCssUrl(font);

  const existingLink = container.querySelector(`link#brandFontStylesheet`);
  if (existingLink?.getAttribute("href") === url) return;

  if (existingLink) container.removeChild(existingLink);

  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", url);
  link.setAttribute("id", "brandFontStylesheet");
  container.appendChild(link);
}
