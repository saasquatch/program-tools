import { describe, it, expect } from "vitest";
import { optional, isEmpty } from "./utilities";

describe("optional", () => {
  it("returns object with property when value is truthy", () => {
    expect(optional("color", "red")).toEqual({ color: "red" });
  });

  it("returns empty object when value is falsy", () => {
    expect(optional("color", "")).toEqual({});
    expect(optional("color", null)).toEqual({});
    expect(optional("color", undefined)).toEqual({});
    expect(optional("color", 0)).toEqual({});
  });

  it("returns object with property when value is a non-zero number", () => {
    expect(optional("count", 5)).toEqual({ count: 5 });
  });

  it("returns object with property when value is true", () => {
    expect(optional("active", true)).toEqual({ active: true });
  });
});

describe("isEmpty", () => {
  it("returns true for empty object", () => {
    expect(isEmpty({})).toBe(true);
  });

  it("returns true for null/undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("returns false for object with properties", () => {
    expect(isEmpty({ key: "value" })).toBe(false);
  });

  it("returns false for object with empty string values", () => {
    expect(isEmpty({ key: "" })).toBe(false);
  });
});
