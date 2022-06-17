const debugEnabled = localStorage.getItem("debug");

export function debug(ns: string, ...args: any[]) {
  if (debugEnabled) {
    console.debug(`sq:environment:${ns}`, ...args);
  }
}
