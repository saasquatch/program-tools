import { newSpecPage } from "@stencil/core/testing";
import { format, sanitizeUrlPath } from "./utils";

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
      "Joseph Quincy Publique"
    );
  });
});

describe("Users are redirected to the value of the nextPage url parameter as if it were a relative path", () => {
  const expectUrlToRedirectTo = async (
    currentUrl: string,
    expectedUrl: string
  ) => {
    await newSpecPage({
      components: [],
      html: ``,
      url: currentUrl,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const nextPage = urlParams.get("nextPage");
    const url = sanitizeUrlPath(nextPage);
    expect(url.href).toEqual(expectedUrl);
  };

  it("https://www.example.com?nextPage=activity --> https://www.example.com/activity", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=activity",
      "https://www.example.com/activity"
    );
  });
  it("https://www.example.com?nextPage=./activity --> https://www.example.com/activity", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=./activity",
      "https://www.example.com/activity"
    );
  });
  it("https://www.example.com?nextPage=/activity --> https://www.example.com/activity", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=/activity",
      "https://www.example.com/activity"
    );
  });
  it("http://www.example.com/nest/page?oob=123&other&nextPage=activity#heading-1 --> http://www.example.com/activity", async () => {
    await expectUrlToRedirectTo(
      "http://www.example.com/nest/page?oob=123&other&nextPage=activity#heading-1",
      "http://www.example.com/activity"
    );
  });
  it("https://www.example.com?nextPage=www.google.com --> https://www.example.com/www.google.com", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=www.google.com",
      "https://www.example.com/www.google.com"
    );
  });
  it("https://www.example.com?nextPage=//foo.com --> https://www.example.com/", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=//foo.com",
      "https://www.example.com/"
    );
  });
  it("https://www.example.com?nextPage=https://malicious.example.com --> https://www.example.com/", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=https://malicious.example.com",
      "https://www.example.com/"
    );
  });
  it("https://www.example.com?nextPage=activity?foo=bar --> https://www.example.com/activity", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=activity?foo=bar",
      "https://www.example.com/activity?foo=bar"
    );
  });
  it("https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar --> https://www.example.com/activity?foo=bar", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar",
      "https://www.example.com/activity?foo=bar"
    );
  });
  it("https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar#hash --> https://www.example.com/activity?foo=bar", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar#hash",
      "https://www.example.com/activity?foo=bar"
    );
  });
  it("https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar%23hash --> https://www.example.com/activity?foo=bar#hash", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com?nextPage=%2Factivity%3Ffoo%3Dbar%23hash",
      "https://www.example.com/activity?foo=bar#hash"
    );
  });
  it("https://www.example.com:1337?nextPage=activity --> https://www.example.com:1337/activity", async () => {
    await expectUrlToRedirectTo(
      "https://www.example.com:1337?nextPage=activity",
      "https://www.example.com:1337/activity"
    );
  });
  it("http://1.1.1.1:1111?nextPage=activity --> http://1.1.1.1:1111/activity", async () => {
    await expectUrlToRedirectTo(
      "http://1.1.1.1:1111?nextPage=activity",
      "http://1.1.1.1:1111/activity"
    );
  });
  it("@landmine https://user:pass@www.example.com:444?nextPage=activity --> https://www.example.com:444/activity", async () => {
    await expectUrlToRedirectTo(
      "https://user:pass@www.example.com:444?nextPage=activity",
      "https://www.example.com:444/activity"
    );
  });
});
