import { validateLocale } from "../src/contexts/LocaleContext";

describe("Validate locale", () => {
  it("returns undefined when locale is undefined", () => {
    expect(validateLocale(undefined)).toBeUndefined();
  });

  it("expects the locale to be in the format xx_XX", () => {
    const testCases = {
      xx_XX: true,
      xx_xx: false,
      en_us: false,
      EN_US: false,
      en_US: true,
      hello: false,
      sr_Latn_sr: false,
      es_419: true,
      de_DE_1901_1901: false,
      az_Arab_IR: false,
      en_029: true,
      "en_GB-oxendict": false,
    };

    Object.entries(testCases).forEach(([key, shouldPass]) => {
      const result = validateLocale(key);
      shouldPass ? expect(result).toEqual(key) : expect(result).toBeUndefined();
    });
  });
});
