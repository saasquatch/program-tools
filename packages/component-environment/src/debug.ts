const debugEnabled = window?.localStorage?.getItem("debug");

export function debug(ns: string, ...args: any[]) {
  if (debugEnabled) {
    console.debug(`sq:environment:${ns}`, ...args);
  }
}
