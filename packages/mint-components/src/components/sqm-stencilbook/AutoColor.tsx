import { ColorError, guard, hsla, parseToHsla } from "color2k";

const colorScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const lScale = [
  0.95,
  0.84,
  0.73,
  0.62,
  0.49,
  0.35,
  0.23,
  0.15,
  0.1,
  0.05,
  0.02
];

// https://github.com/ricokahler/color2k/blob/main/src/parseToRgba.ts
const hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
function niceParseToHsla(color: string): [number, number, number, number] {
  const normalizedColor = color.trim();
  const hslaMatch = hslaRegex.exec(normalizedColor);
  if (hslaMatch) {
    const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
    if (guard(0, 100, s) !== s) throw new ColorError(color);
    if (guard(0, 100, l) !== l) throw new ColorError(color);
    return [h, s, l, a || 1] as [number, number, number, number];
  }

  // Warning -- converts to RGB first, so is lossy
  return parseToHsla(color);
}

function generateScale(color: string, name = "primary"): string[] {
  const [h, s, l, a] = niceParseToHsla(color);

  return lScale
    .map((l) => hsla(h, s, l, a))
    .map((color, index) => {
      return `--sl-color-${name}-${colorScale[index]}: ${color};\n`;
    });
}


/**
 * Generated a Shoelace color scale css string from a base color
 *
 * @param color
 * @param name
 * @returns
 */
export function autoColorScaleCss(color: string, name = "primary"): string {
  return generateScale(color,name).join("\n")
}