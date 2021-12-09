import chroma from "chroma-js";

export function autoColorScaleCss(color: string, name = "primary"): string {
  if (!chroma.valid(color)) {
    return;
  }

  const colorScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const hex = chroma(color).hex();
  const scale = chroma
    .scale([
      chroma(hex).luminance(0.95), // 50
      chroma(hex).luminance(0.84), // 100
      chroma(hex).luminance(0.73), // 200
      chroma(hex).luminance(0.62), // 300
      chroma(hex).luminance(0.49), // 400
      chroma(hex).luminance(0.35), // 500
      chroma(hex).luminance(0.23), // 600
      chroma(hex).luminance(0.15), // 700
      chroma(hex).luminance(0.1), // 800
      chroma(hex).luminance(0.05), // 900
      chroma(hex).luminance(0.02), // 950
    ])
    .colors(colorScale.length);

  return scale
    .map(
      (color, index) =>
        `--sl-color-${name}-${colorScale[index]}: ${chroma(color).hex()};`
    )
    .join("\n");
}
