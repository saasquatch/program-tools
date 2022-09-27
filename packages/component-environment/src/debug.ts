const debugEnabled = (() => {
  try {
    return window?.localStorage?.getItem("debug");
  } catch (e) {
    return false;
  }
})();

export function debug(ns: string, ...args: any[]) {
  if (debugEnabled) {
    console.debug(`sq:environment:${ns}`, ...args);
  }
}
