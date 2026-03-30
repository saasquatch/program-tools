const UPLOAD_MARKER = "/image/upload/";

// Max image dimension to deliver (retina-safe for 4K/DPR 2x displays)
const MAX_IMAGE_WIDTH = 3840;

/**
 * Adds Cloudinary auto-format and auto-quality transformations to a Cloudinary URL.
 * Non-Cloudinary URLs are passed through unchanged.
 *
 * When no explicit width/height is provided, a c_limit,w_3840 cap is applied
 * to prevent downloading oversized originals while remaining sharp on 4K/retina.
 *
 * @param url - The image URL to optimize
 * @param options - Optional width/height for server-side resizing (use 2x display size for retina)
 */
export function optimizeCloudinaryUrl(
  url: string,
  options?: { width?: number; height?: number },
): string {
  if (!url) return url;

  if (!url.includes("res.cloudinary.com")) return url;

  const uploadIndex = url.indexOf(UPLOAD_MARKER);
  if (uploadIndex === -1) return url;

  const insertionPoint = uploadIndex + UPLOAD_MARKER.length;
  const base = url.slice(0, insertionPoint);
  const rest = url.slice(insertionPoint);

  // Don't double-transform if f_ or q_ are already present
  const existingParts = rest.split("/")[0].split(",");
  if (existingParts.some((p) => p.startsWith("f_") || p.startsWith("q_"))) {
    return url;
  }

  const transforms: string[] = [];
  if (options?.width) {
    transforms.push(`w_${options.width}`);
  }
  if (options?.height) {
    transforms.push(`h_${options.height}`);
  }
  // Cap max dimensions for variable-size images (no explicit size provided)
  if (!options?.width && !options?.height) {
    transforms.push(`c_limit`, `w_${MAX_IMAGE_WIDTH}`);
  }
  transforms.push("f_auto", "q_auto");

  return `${base}${transforms.join(",")}/${rest}`;
}
