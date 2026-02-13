import { describe, it, expect } from "vitest";
import { extractProps } from "./extractProps";

describe("extractProps", () => {
  it("extracts and strips prefix from matching keys", () => {
    const props = {
      error_name: "Name is required",
      error_email: "Email is invalid",
      label_name: "Name",
    };
    const result = extractProps(props, "error_");
    expect(result).toEqual({
      name: "Name is required",
      email: "Email is invalid",
    });
  });

  it("returns empty object when no keys match prefix", () => {
    const props = { label_name: "Name", label_email: "Email" };
    const result = extractProps(props, "error_");
    expect(result).toEqual({});
  });

  it("returns empty object for empty input", () => {
    expect(extractProps({}, "prefix_")).toEqual({});
  });

  it("handles prefix that matches all keys", () => {
    const props = { pre_a: 1, pre_b: 2, pre_c: 3 };
    const result = extractProps(props, "pre_");
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});
