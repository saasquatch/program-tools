import { describe, it, expect, vi, afterEach } from "vitest";
import {
  format,
  sanitizeUrlPath,
  getProps,
  getMissingProps,
  luxonLocale,
  capitalizeFirstLetter,
} from "./utils";

describe("format", () => {
  it("returns empty string for no names defined", () => {
    expect(format(undefined, undefined, undefined)).toEqual("");
  });

  it("formats just first names", () => {
    expect(format("Joseph", undefined, undefined)).toEqual("Joseph");
  });

  it("formats first and last names", () => {
    expect(format("Joseph", undefined, "Publique")).toEqual("Joseph Publique");
  });

  it("formats first, middle and last names", () => {
    expect(format("Joseph", "Quincy", "Publique")).toEqual(
      "Joseph Quincy Publique",
    );
  });
});

describe("Users are redirected to the value of the nextPage url parameter as if it were a relative path", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const expectUrlToRedirectTo = (currentUrl: string, expectedUrl: string) => {
    const parsed = new URL(currentUrl);
    vi.stubGlobal("location", {
      origin: parsed.origin,
      search: parsed.search,
      href: parsed.href,
      pathname: parsed.pathname,
      hash: parsed.hash,
      host: parsed.host,
      hostname: parsed.hostname,
      port: parsed.port,
      protocol: parsed.protocol,
    });

    const urlParams = new URLSearchParams(parsed.search);
    const nextPage = urlParams.get("nextPage");
    const url = sanitizeUrlPath(nextPage);
    expect(url.href).toEqual(expectedUrl);
  };

  it("https://www.example.com?nextPage=activity --> https://www.example.com/activity", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=activity",
      "https://www.example.com/activity",
    );
  });
  it("https://www.example.com?nextPage=./activity --> https://www.example.com/activity", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=./activity",
      "https://www.example.com/activity",
    );
  });
  it("https://www.example.com?nextPage=/activity --> https://www.example.com/activity", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=/activity",
      "https://www.example.com/activity",
    );
  });
  it("http://www.example.com/nest/page?oob=123&other&nextPage=activity#heading-1 --> http://www.example.com/activity", () => {
    expectUrlToRedirectTo(
      "http://www.example.com/nest/page?oob=123&other&nextPage=activity#heading-1",
      "http://www.example.com/activity",
    );
  });
  it("https://www.example.com?nextPage=www.google.com --> https://www.example.com/www.google.com", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=www.google.com",
      "https://www.example.com/www.google.com",
    );
  });
  it("https://www.example.com?nextPage=//foo.com --> https://www.example.com/", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=//foo.com",
      "https://www.example.com/",
    );
  });
  it("https://www.example.com?nextPage=https://malicious.example.com --> https://www.example.com/", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=https://malicious.example.com",
      "https://www.example.com/",
    );
  });
  it("https://www.example.com?nextPage=activity?foo=bar --> https://www.example.com/activity", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=activity?foo=bar",
      "https://www.example.com/activity?foo=bar",
    );
  });
  it("https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar --> https://www.example.com/activity?foo=bar", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar",
      "https://www.example.com/activity?foo=bar",
    );
  });
  it("https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar#hash --> https://www.example.com/activity?foo=bar", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar#hash",
      "https://www.example.com/activity?foo=bar",
    );
  });
  it("https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar%23hash --> https://www.example.com/activity?foo=bar#hash", () => {
    expectUrlToRedirectTo(
      "https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar%23hash",
      "https://www.example.com/activity?foo=bar#hash",
    );
  });
  it("https://www.example.com:1337?nextPage=activity --> https://www.example.com:1337/activity", () => {
    expectUrlToRedirectTo(
      "https://www.example.com:1337?nextPage=activity",
      "https://www.example.com:1337/activity",
    );
  });
  it("http://1.1.1.1:1111?nextPage=activity --> http://1.1.1.1:1111/activity", () => {
    expectUrlToRedirectTo(
      "http://1.1.1.1:1111?nextPage=activity",
      "http://1.1.1.1:1111/activity",
    );
  });
  it("@landmine https://user:pass@www.example.com:444?nextPage=activity --> https://www.example.com:444/activity", () => {
    expectUrlToRedirectTo(
      "https://user:pass@www.example.com:444?nextPage=activity",
      "https://www.example.com:444/activity",
    );
  });
});

describe("getProps", () => {
  it("extracts getter properties from prototype", () => {
    const proto = {
      get name() {
        return "test";
      },
      get age() {
        return 25;
      },
    };
    const obj = Object.create(proto);
    const result = getProps(obj);
    expect(result).toEqual({ name: "test", age: 25 });
  });

  it("returns empty object when no getters exist", () => {
    const obj = { name: "test" };
    const result = getProps(obj);
    expect(result).toEqual({});
  });
});

describe("getMissingProps", () => {
  it("returns missing props when some have falsy values", () => {
    const props = [
      { attribute: "name", value: "John" },
      { attribute: "email", value: "" },
      { attribute: "age", value: 0 },
    ];
    const result = getMissingProps(props);
    expect(result).toEqual([
      { attribute: "email", value: "" },
      { attribute: "age", value: 0 },
    ]);
  });

  it("returns false when all props have values", () => {
    const props = [
      { attribute: "name", value: "John" },
      { attribute: "active", value: true },
      { attribute: "count", value: 5 },
    ];
    expect(getMissingProps(props)).toBe(false);
  });

  it("returns all props when all are missing", () => {
    const props = [
      { attribute: "a", value: "" },
      { attribute: "b", value: 0 },
    ];
    const result = getMissingProps(props);
    expect(result).toHaveLength(2);
  });

  it("returns false for empty array", () => {
    expect(getMissingProps([])).toBe(false);
  });
});

describe("luxonLocale", () => {
  it("converts underscore locale to hyphen format with uppercase country", () => {
    expect(luxonLocale("en_us")).toBe("en-US");
  });

  it("handles already correct locale with no underscore", () => {
    expect(luxonLocale("en")).toBe("en");
  });

  it("returns undefined for undefined input", () => {
    expect(luxonLocale(undefined)).toBeUndefined();
  });

  it("handles locale with uppercase country already", () => {
    expect(luxonLocale("fr_FR")).toBe("fr-FR");
  });
});

describe("capitalizeFirstLetter", () => {
  it("capitalizes first letter of a lowercase word", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("keeps already capitalized word unchanged", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });

  it("handles single character", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });
});
