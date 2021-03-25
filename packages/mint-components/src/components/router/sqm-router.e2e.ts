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
    expectElement: async (selector: string) =>
      // convert to string because jest pretty printing the object causes errors
      expect((await page.find(selector))?.id).not.toBeUndefined(),
    dontExpectElement: async (selector: string) =>
      expect((await page.find(selector))?.id).toBeUndefined(),
    expectTemplate: async (selector: string) =>
      expect((await page.find("#" + selector))?.id).not.toBeUndefined(),
    dontExpectTemplate: async (selector: string) =>
      expect((await page.find("#" + selector))?.id).toBeUndefined(),
    expectRoute: async (selector: string) =>
      expect(
        (await page.find('div[style="display: contents;"] > div#' + selector))
          ?.id
      ).not.toBeUndefined(),
    dontExpectRoute: async (selector: string) =>
      expect(
        (await page.find('div[style="display: contents;"] > div#' + selector))
          ?.id
      ).toBeUndefined(),
    history: {
      push: (path: string) =>
        page.evaluate((x) => window.squatchHistory.push(x), path),
      back: () => page.evaluate(() => window.squatchHistory.back()),
    },
  };
}

describe("sqm-router", () => {
  test("Default route", async () => {
    const html = /*html*/ `
    <sqm-router>
      ${newRoute("RouteA", "/")}
      ${newRoute("RouteB", "/B")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectElement,
      expectRoute,
      dontExpectRoute,
    } = newPageFunctions(page);

    await expectElement("sqm-router");

    await expectRoute("RouteA");
    await dontExpectRoute("RouteB");

    page.close();
  });

  test("Changing pages", async () => {
    const html = /*html*/ `
    <sqm-router>
      ${newRoute("RouteA", "/")}
      ${newRoute("RouteB", "/B")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectElement,
      expectRoute,
      dontExpectRoute,
      history,
    } = newPageFunctions(page);

    await expectElement("sqm-router");

    await expectRoute("RouteA");
    await dontExpectRoute("RouteB");

    await history.push("/B");
    await page.waitForChanges();

    await dontExpectRoute("RouteA");
    await expectRoute("RouteB");

    await history.push("/");
    await page.waitForChanges();

    await expectRoute("RouteA");
    await dontExpectRoute("RouteB");

    page.close();
  });

  test("Going back", async () => {
    const html = /*html*/ `
    <sqm-router>
      ${newRoute("RouteA", "/")}
      ${newRoute("RouteB", "/B")}
      ${newRoute("RouteC", "/C")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectElement,
      expectRoute,
      dontExpectRoute,
      history,
    } = newPageFunctions(page);

    await expectElement("sqm-router");

    await expectRoute("RouteA");
    await dontExpectRoute("RouteB");
    await dontExpectRoute("RouteC");

    await history.push("/B");
    await page.waitForChanges();

    await dontExpectRoute("RouteA");
    await expectRoute("RouteB");
    await dontExpectRoute("RouteC");

    await history.push("/C");
    await page.waitForChanges();

    await dontExpectRoute("RouteA");
    await dontExpectRoute("RouteB");
    await expectRoute("RouteC");

    await history.back();
    await page.waitForChanges();

    await dontExpectRoute("RouteA");
    await expectRoute("RouteB");
    await dontExpectRoute("RouteC");

    await history.back();
    await page.waitForChanges();

    await expectRoute("RouteA");
    await dontExpectRoute("RouteB");
    await dontExpectRoute("RouteC");

    page.close();
  });

  test("Template has precedence over route", async () => {
    const html = /*html*/ `
    <sqm-router>
      ${newRoute("RouteA", "/")}
      ${newTemplate("RouteB", "/")}
      ${newRoute("RouteC", "/B")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectElement,
      expectTemplate,
      dontExpectTemplate,
      expectRoute,
      dontExpectRoute,
      history,
    } = newPageFunctions(page);

    await expectElement("sqm-router");

    await dontExpectRoute("RouteA");
    await expectTemplate("RouteB");
    await dontExpectRoute("RouteC");

    await history.push("/B");
    await page.waitForChanges();

    await dontExpectRoute("RouteA");
    await dontExpectTemplate("RouteB");
    await expectRoute("RouteC");

    await history.push("/");
    await page.waitForChanges();

    await dontExpectRoute("RouteA");
    await expectTemplate("RouteB");
    await dontExpectRoute("RouteC");

    page.close();
  })

  test("First matching element is chosen, with precedence", async ()=>{
    const html = /*html*/ `
    <sqm-router>
      ${newRoute("RootA", "/")}
      ${newRoute("RootB", "/")}
      ${newTemplate("RootC", "/")}
      ${newTemplate("RootD", "/")}
      ${newRoute("StuffA", "/stuff")}
      ${newRoute("StuffB", "/stuff")}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const {
      expectElement,
      expectTemplate,
      dontExpectTemplate,
      expectRoute,
      dontExpectRoute,
      history,
    } = newPageFunctions(page);

    await expectElement("sqm-router");

    await dontExpectRoute("RootA");
    await dontExpectRoute("RootB");
    await expectTemplate("RootC");
    await dontExpectTemplate("RootD");
    await dontExpectRoute("StuffA");
    await dontExpectRoute("StuffB");

    await history.push("/stuff");
    await page.waitForChanges();

    await dontExpectRoute("RootA");
    await dontExpectRoute("RootB");
    await dontExpectTemplate("RootC");
    await dontExpectTemplate("RootD");
    await expectRoute("StuffA");
    await dontExpectRoute("StuffB");

    await history.push("/");
    await page.waitForChanges();

    await dontExpectRoute("RootA");
    await dontExpectRoute("RootB");
    await expectTemplate("RootC");
    await dontExpectTemplate("RootD");
    await dontExpectRoute("StuffA");
    await dontExpectRoute("StuffB");

    page.close();
  })
});

// nice debugging tool
//   console.log(await page.evaluate(()=>document.body.innerHTML))