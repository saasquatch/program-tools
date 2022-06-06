import { E2EPage, newE2EPage } from "@stencil/core/testing";

function newColumn(id) {
  return /*html*/ `<sqm-rewards-table-date-column id="${id}"></sqm-rewards-table-date-column>`;
}

function newElement(id) {
  return /*html*/ `<sqm-big-stat id="${id}"></sqm-big-stat>`;
}

function newPlopTarget(id) {
  return /*html*/ `<raisins-plop-target id="${id}"></raisins-plop-target>`;
}

function newPageFunctions(page: Readonly<E2EPage>) {
  return {
    expectElement: async (selector: string) =>
      // convert to string because jest pretty printing the object causes errors
      expect((await page.find(selector))?.id).not.toBeUndefined(),
    dontExpectElement: async (selector: string) =>
      expect((await page.find(selector))?.id).toBeUndefined(),
  };
}

async function createDemoPage(html: string) {
  // @ts-ignore
  window.widgetIdent = { env: "demo" };
  const page = await newE2EPage();
  await page.setContent(html);

  const { expectElement, dontExpectElement } = newPageFunctions(page);
  return { page, expectElement, dontExpectElement };
}

describe("sqm-rewards-table", () => {
  test("Default table", async () => {
    const html = /*html*/ `
    <sqm-rewards-table>
      ${newColumn("column-A")}
      ${newElement("plop-A")}
      ${newColumn("column-B")}
    </sqm-rewards-table>
    `;
    const { page, expectElement } = await createDemoPage(html);

    await expectElement("sqm-rewards-table");
    await expectElement("#column-A");
    await expectElement("#column-B");

    page.close();
  });

  test("Adding a plop target", async () => {
    const html = /*html*/ `
    <sqm-rewards-table>
      ${newColumn("column-A")}
      ${newPlopTarget("plop-A")}
      ${newColumn("column-B")}
    </sqm-rewards-table>
    `;
    const { page, expectElement } = await createDemoPage(html);

    await expectElement("#column-A");
    await expectElement("#plop-A");
    await expectElement("#column-B");
    page.close();
  });

  // test("Removing a plop target", async () => {
  //   const html = /*html*/ `
  //   <sqm-rewards-table>
  //     ${newColumn("column-A")}
  //     ${newPlopTarget("plop-A")}
  //     ${newColumn("column-B")}
  //   </sqm-rewards-table>
  //   `;
  //   const { page, expectElement, dontExpectElement } = await createDemoPage(
  //     html
  //   );

  //   await expectElement("#column-A");
  //   await expectElement("#plop-A");
  //   await expectElement("#column-B");

  //   const noPlop = /*html*/ `
  //   <sqm-rewards-table>
  //     ${newColumn("column-A")}
  //     ${newColumn("column-B")}
  //   </sqm-rewards-table>
  //   `;

  //   await page.setContent(noPlop);

  //   await dontExpectElement("#plop-A");
  //   page.close();
  // });

  // TODO: Don't actually have all of the functions available to test these properly
  //   test("Adding and then removing plop target", async () => {
  //     const html = /*html*/ `
  //     <sqm-rewards-table>
  //       ${newColumn("column-A")}
  //       ${newColumn("column-B")}
  //     </sqm-rewards-table>
  //     `;

  //     const { page, expectElement } = await createDemoPage(html);

  //     page.close();
  //   });

  //   test("Adding non-table column plop target", async () => {
  //     const html = /*html*/ `
  //     <sqm-rewards-table>
  //       ${newColumn("column-A")}
  //       ${newColumn("column-B")}
  //     </sqm-rewards-table>
  //     `;

  //     const { page, expectElement } = await createDemoPage(html);

  //     page.close();
  //   });

  //   test("Adding non-table column plop target and cancelling, then add column", async () => {
  //     const html = /*html*/ `
  //     <sqm-rewards-table>
  //       ${newColumn("column-A")}
  //       ${newColumn("column-B")}
  //     </sqm-rewards-table>
  //     `;
  //     const { page, expectElement } = await createDemoPage(html);

  //     page.close();
  //   });
});

// nice debugging tool
//   console.log(await page.evaluate(()=>document.body.innerHTML))
