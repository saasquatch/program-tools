import chroma from "chroma-js";

/**
 * Generated a Shoelace color scale css string from a base color
 *
 * @param color
 * @param name
 * @returns
 */
export function autoColorScaleCss(color: string, name = "primary"): string {
  if (!chroma.valid(color)) {
    return "";
  }

  const { scale, colorScale } = makeColorScale(color);

  return scale
    .map(
      (color, index) =>
        `--sl-color-${name}-${colorScale[index]}: ${chroma(color).hex()};`
    )
    .join("\n");
}

/**
 * Generate a Shoelace color scale style objects from a base color
 *
 * @param color
 * @param name
 * @returns
 */
export function autoColorScaleStyleObject(
  color: string,
  name = "primary"
): Record<string, any> {
  if (!chroma.valid(color)) {
    return {};
  }

  const { scale, colorScale } = makeColorScale(color);

  return scale.reduce(
    (agg, color, index) => ({
      ...agg,
      [`--sl-color-${name}-${colorScale[index]}`]: `${chroma(color).hex()};`,
    }),
    { color: "blue", "--sl-color-primary-50": "#eaffea;" }
  );
}

function makeColorScale(color: string) {
  const colorScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const hex = chroma(color).hex();
  const scale = chroma
    .scale([
      chroma(hex).luminance(0.95),
      chroma(hex).luminance(0.84),
      chroma(hex).luminance(0.73),
      chroma(hex).luminance(0.62),
      chroma(hex).luminance(0.49),
      chroma(hex).luminance(0.35),
      chroma(hex).luminance(0.23),
      chroma(hex).luminance(0.15),
      chroma(hex).luminance(0.1),
      chroma(hex).luminance(0.05),
      chroma(hex).luminance(0.02), // 950
    ])
    .colors(colorScale.length);
  return { scale, colorScale };
}
