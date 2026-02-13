import { describe, it, expect, vi } from "vitest";

vi.mock("../../global/global", () => ({
  intl: {
    formatMessage: (
      descriptor: { id: string; defaultMessage: string },
      values: Record<string, string>,
    ) => descriptor.defaultMessage,
  },
}));

import {
  validTaxDocument,
  objectIsFull,
  taxTypeToName,
  validateBillingField,
  formatErrorMessage,
  getCountryObj,
} from "./utils";

describe("validTaxDocument", () => {
  it("returns true for W9", () => {
    expect(validTaxDocument("W9")).toBe(true);
  });

  it("returns true for W8BEN", () => {
    expect(validTaxDocument("W8BEN")).toBe(true);
  });

  it("returns true for W8BENE", () => {
    expect(validTaxDocument("W8BENE")).toBe(true);
  });

  it("returns false for undefined", () => {
    expect(validTaxDocument(undefined)).toBe(false);
  });

  it("returns false for unknown type", () => {
    expect(validTaxDocument("W2" as any)).toBe(false);
  });
});

describe("objectIsFull", () => {
  it("returns true when all values are defined", () => {
    expect(objectIsFull({ a: "hello", b: 123, c: true })).toBe(true);
  });

  it("returns false when a value is undefined", () => {
    expect(objectIsFull({ a: "hello", b: undefined })).toBe(false);
  });

  it("returns false when a value is null", () => {
    expect(objectIsFull({ a: "hello", b: null })).toBe(false);
  });

  it("returns true for empty object", () => {
    expect(objectIsFull({})).toBe(true);
  });

  it("treats empty string as defined", () => {
    expect(objectIsFull({ a: "" })).toBe(true);
  });

  it("treats zero as defined", () => {
    expect(objectIsFull({ a: 0 })).toBe(true);
  });
});

describe("taxTypeToName", () => {
  it("maps W9 to W-9", () => {
    expect(taxTypeToName("W9")).toBe("W-9");
  });

  it("maps W8BEN to W-8", () => {
    expect(taxTypeToName("W8BEN")).toBe("W-8");
  });

  it("maps W8BENE to W-8", () => {
    expect(taxTypeToName("W8BENE")).toBe("W-8");
  });

  it("returns empty string for unknown type", () => {
    expect(taxTypeToName("UNKNOWN" as any)).toBe("");
  });
});

describe("validateBillingField", () => {
  it("returns true when value matches regex", () => {
    expect(validateBillingField(/^[a-z]+$/, "hello")).toBe(true);
  });

  it("returns false when value does not match regex", () => {
    expect(validateBillingField(/^[a-z]+$/, "Hello123")).toBe(false);
  });

  it("trims whitespace before checking", () => {
    expect(validateBillingField(/^[a-z]+$/, "  hello  ")).toBe(true);
  });

  it("returns false for empty string after trimming", () => {
    expect(validateBillingField(/^[a-z]+$/, "   ")).toBe(false);
  });
});

describe("formatErrorMessage", () => {
  it("returns the default message from intl mock", () => {
    const result = formatErrorMessage("email", "Email is required");
    expect(result).toBe("Email is required");
  });
});

describe("getCountryObj", () => {
  it("returns country code and display name", () => {
    const result = getCountryObj({ countryCode: "US", locale: "en" });
    expect(result.countryCode).toBe("US");
    expect(result.displayName).toBe("United States");
  });

  it("returns display name in specified locale", () => {
    const result = getCountryObj({ countryCode: "DE", locale: "en" });
    expect(result.countryCode).toBe("DE");
    expect(result.displayName).toBe("Germany");
  });
});
