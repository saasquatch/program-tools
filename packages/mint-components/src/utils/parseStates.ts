export function parseStates(states) {
  if (typeof states === "string") {
    try {
      return JSON.parse(states);
    } catch (e) {
      return undefined;
    }
  }

  if (typeof states === "object") return states;
}
