import { E2EPage, newE2EPage } from "@stencil/core/testing";

function newRoute(id: string, path: string) {
  return /*html*/ `
  <sqm-route path="${path}">
    <div id=${id}></div>
  <sqm-route>`;
}

function newTemplate(id: string, path: string) {
  return /*html*/ `
  <template path="${path}">
    <div id=${id}></div>
  </template>`;
}

function newPageFunctions(page: Readonly<E2EPage>) {
  return {
    expectComponent: async (selector: string) =>
      // expect(await page.find(selector)).not.toBeNull(),
      // convert to string because jest pretty printing the object causes errors
      expect((await page.find(selector))?.id).not.toBeUndefined(),
    dontExpectComponent: async (selector: string) =>
      // expect(await page.find(selector)).toBeNull(),
      // convert to string because jest pretty printing the object causes errors
      expect((await page.find(selector))?.id).toBeUndefined(),
    history: {
      push: (path: string) => page.evaluate((x) => window.squatchHistory.push(x), path),
    },
  };
}

describe("sqm-router", () => {
  test("Simple with templates", async () => {
    const html = /*html*/ `
    <sqm-router>
      ${newTemplate("RouteA", "/")}
      ${newTemplate("RouteB", "/B")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectComponent,
      dontExpectComponent,
      history,
    } = newPageFunctions(page);

    await expectComponent("sqm-router")

    await expectComponent("#RouteA")
    await dontExpectComponent("#RouteB")

    await history.push("/B")

    await dontExpectComponent("#RouteA")
    await expectComponent("#RouteB")
    await page.close();
  });

  test("Simple with sqm-route", async () => {
    const html = /*html*/ `
    <sqm-router>
      ${newRoute("RouteA", "/")}
      ${newRoute("RouteB", "/B")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectComponent,
      dontExpectComponent,
      history,
    } = newPageFunctions(page);

    await expectComponent("sqm-router")

    await expectComponent("#RouteA")
    // FIXME vvv FAILS HERE vvv
    // it's not behaving in puppeteer
    await dontExpectComponent("#RouteB")

    await history.push("/B")

    await dontExpectComponent("#RouteA")
    await expectComponent("#RouteB")
    await page.close();
  });

  // test("scrap", async () => {
  //   const html = /*html*/ `
  //   <sqm-router>
  //     ${newTemplate("RouteA", "/")}
  //     ${newTemplate("RouteB", "/B")}
  //   </sqm-router>
  //   `;

  //   const page = await newE2EPage();
  //   await page.setContent(html);

  //   expect(await page.find("sqm-router")).not.toBeNull();

  //   expect(await page.find("#RouteA")).not.toBeNull();
  //   expect(await page.find("#RouteB")).toBeNull();

  //   await page.evaluate((x) => window.squatchHistory.push(x), "/B")

  //   expect(await page.find("#RouteA")).toBeNull();
  //   expect(await page.find("#RouteB")).not.toBeNull();
  // });
});
