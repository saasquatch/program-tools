/* oxlint-disable typescript/no-floating-promises */
import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import { fetchLocale } from "../src/fetchLocale.ts";

afterEach(() => mock.restoreAll());

describe("Fetch locale", () => {
  for (const locale of ["en_US", "", null]) {
    it(`handles a locale of ${JSON.stringify(locale)}`, async () => {
      mock.method(globalThis, "fetch", async () =>
        Response.json({ data: { viewer: { locale } } }),
      );
      assert.equal(await fetchLocale(), locale || undefined);
    });
  }

  for (const response of [
    null,
    {},
    { data: null },
    { data: { viewer: null } },
    { data: { viewer: {} } },
    { data: { viewer: { locale: 123 } } },
    { errors: [{ message: "Request failed" }] },
    {
      data: { viewer: { locale: "en_US" } },
      errors: [{ message: "Partial failure" }],
    },
  ]) {
    it(`rejects an invalid response: ${JSON.stringify(response)}`, async () => {
      mock.method(globalThis, "fetch", async () => Response.json(response));
      assert.equal(await fetchLocale(), undefined);
    });
  }
});
