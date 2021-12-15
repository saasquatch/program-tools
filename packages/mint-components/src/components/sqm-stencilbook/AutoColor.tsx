import { ColorError, guard, hsla, parseToHsla } from "color2k";

const colorScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const lScale = [
  0.95, //weight 50
  0.86, //weight 100
  0.76, //weight 200
  0.66, //weight 300
  0.56, //weight 400
  0.46, //weight 500
  0.39, //weight 600
  0.32, //weight 700
  0.25, //weight 800
  0.18, //weight 900
  0.15, //weight 950
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
  return generateScale(color, name).join("\n");
}
