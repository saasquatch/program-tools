import { E2EPage, newE2EPage } from "@stencil/core/testing";

function newColumn(id) {
  return /*html*/ `
  <sqm-referral-table-date-column id=${id}>
  </sqm-referral-table-date-column>`;
}

function newElement(id) {
  return /*html*/ `
  <sqm-big-stat id=${id}></sqm-big-stat>`;
}

function newPlopTarget(id: string) {
  return /*html*/ `
  <raisins-plop-target>
    <div id=${id}>plop target</div>
  </raisins-plop-target>`;
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

describe("sqm-rewards-table", () => {
  test("Default table", async () => {
    const html = /*html*/ `
    <sqm-referral-table>
      ${newColumn("column-A")}
      ${newColumn("column-B")}
    </sqm-referral-table>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const { expectElement } = newPageFunctions(page);

    await expectElement("sqm-referral-table");
    await expectElement("#column-A");
    await expectElement("#column-B");

    page.close();
  });

  test("Adding a plop target", async () => {
    const html = /*html*/ `
    <sqm-referral-table>
      ${newColumn("column-A")}
      ${newColumn("column-B")}
    </sqm-referral-table>
    `;

  });

  test("Removing a plop target", async () => {
    const html = /*html*/ `
    <sqm-referral-table>
      ${newColumn("column-A")}
      ${newColumn("column-B")}
    </sqm-referral-table>
    `;

  });

  test("Adding and then removing plop target", async () => {
    const html = /*html*/ `
    <sqm-referral-table>
      ${newColumn("column-A")}
      ${newColumn("column-B")}
    </sqm-referral-table>
    `;

  });

  test("Adding non-table column plop target", async () => {
    const html = /*html*/ `
    <sqm-referral-table>
      ${newColumn("column-A")}
      ${newColumn("column-B")}
    </sqm-referral-table>
    `;

  });

  test("Adding non-table column plop target and cancelling, then add column", async () => {
    const html = /*html*/ `
    <sqm-referral-table>
      ${newColumn("column-A")}
      ${newColumn("column-B")}
    </sqm-referral-table>
    `;

  });
});

// nice debugging tool
//   console.log(await page.evaluate(()=>document.body.innerHTML))
