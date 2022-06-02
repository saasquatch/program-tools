const debugEnabled = localStorage.getItem("debug");

export function debug(ns: string, ...args: any[]) {
  if (debugEnabled) {
    console.debug(`sq:microsite:${ns}`, ...args);
  }
}
