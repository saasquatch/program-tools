const base64Url = (value: unknown) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(value))))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

/**
 * An unsigned (`alg: none`) JWT for demos and stories. Components only decode
 * the token client-side, so this stands in for a real, signed credential;
 * no SaaSquatch server accepts it.
 */
export function fakeJwt(payload: Record<string, unknown>): string {
  return `${base64Url({ alg: "none", typ: "JWT" })}.${base64Url(payload)}.`;
}
