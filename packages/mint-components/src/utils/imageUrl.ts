// Max image dimension to deliver (retina-safe for 4K/DPR 2x displays)
const MAX_IMAGE_WIDTH = 3840;

function tryParseUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

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

  const parsed = tryParseUrl(url);
  if (!parsed) return url;

  if (parsed.hostname !== "res.cloudinary.com") return url;

  const pathSegments = parsed.pathname.split("/");
  const uploadIndex = pathSegments.indexOf("upload");
  if (uploadIndex === -1 || pathSegments[uploadIndex - 1] !== "image") {
    return url;
  }

  // The segment immediately after "upload" is either a transform string or a version/path
  const querySegment = pathSegments[uploadIndex + 1] || "";
  const existingParts = querySegment.split(",");
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

  // Insert the new transform segment right after "upload"
  pathSegments.splice(uploadIndex + 1, 0, transforms.join(","));
  parsed.pathname = pathSegments.join("/");

  return parsed.toString();
}
