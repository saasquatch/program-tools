export function sanitizeUrlPath(path: string): URL {
  const url = new URL(path, window.location.origin);
  const cleanUrl = new URL(window.location.origin);
  cleanUrl.pathname = url.pathname;
  cleanUrl.search = url.search;
  cleanUrl.hash = url.hash;

  return cleanUrl;
}
