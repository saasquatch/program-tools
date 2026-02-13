import { describe, it, expect } from "vitest";
import { parseStates } from "./parseStates";

describe("parseStates", () => {
  it("parses a valid JSON string into an object", () => {
    expect(parseStates('{"active": true}')).toEqual({ active: true });
  });

  it("returns the object directly if input is already an object", () => {
    const obj = { active: true, count: 5 };
    expect(parseStates(obj)).toBe(obj);
  });

  it("returns undefined for invalid JSON string", () => {
    expect(parseStates("not valid json")).toBeUndefined();
  });

  it("returns undefined for non-string, non-object input", () => {
    expect(parseStates(42)).toBeUndefined();
    expect(parseStates(undefined)).toBeUndefined();
  });

  it("parses JSON arrays", () => {
    expect(parseStates("[1, 2, 3]")).toEqual([1, 2, 3]);
  });
});
