import { h } from "@stencil/core";
import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

function statFunctions(page: Readonly<E2EPage>) {
  return {
    expectElement: async (selector: string) =>
      // convert to string because jest pretty printing the object causes errors
      expect((await page.find(selector))?.id).not.toBeUndefined(),
    dontExpectElement: async (selector: string) =>
      expect((await page.find(selector))?.id).toBeUndefined(),
    hasStat: async (stat: E2EElement) => {
      expect(stat.innerHTML).not.toEqual("!!!");
    },
    hasInvalidStat: async (stat: E2EElement) => {
      expect(stat.innerHTML).toEqual("!!!");
    },
  };
}

function getHTML(stat) {
  return /*html*/ `
  <div>
    <script>
    window.widgetIdent = {
      tenantAlias: "test_a7yoz8854cf6x",
      appDomain: "https://staging.referralsaasquatch.com",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6Im55bmVsbGllIiwiaWQiOiJueW5lbGxpZSJ9fQ.3KV974VPLgk4tD8LQfJTi4IPkKCmnaB8w48HzVJYDuI",
      userId: "nynellie",
      accountId: "nynellie",
      programId: "ny-post-referrals",
    }
    </script>
    ${stat}
  </div>
  `;
}

describe("sqm-big-stat", () => {
  test("No props returns !!!", async () => {
    const html = getHTML(`<sqm-big-stat></sqm-big-stat>`);
    const page = await newE2EPage();
    const { expectElement, hasInvalidStat } = statFunctions(page);
    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasInvalidStat(stat);
    page.close();
  });
  test("/garbage/props", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/garbage/props"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasInvalidStat } = statFunctions(page);
    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasInvalidStat(stat);
    page.close();
  });
  test("referralsCount", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/referralsCount"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/referralsCount/converted", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/referralsCount/converted"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/referralsCount/started", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/referralsCount/started"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/referralsMonth", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/referralsMonth"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/referralsWeek", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/referralsWeek"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCount", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCount"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCount/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCount/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/INTEGRATION", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/INTEGRATION"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/PCT_DISCOUNT", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/PCT_DISCOUNT"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/PCT_DISCOUNT/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/PCT_DISCOUNT/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/PCT_DISCOUNT/PENDING", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/PCT_DISCOUNT/PENDING"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/PCT_DISCOUNT/PENDING/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/PCT_DISCOUNT/PENDING/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/CREDIT", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT"></sqm-big-stat>`
    );
    const page = await newE2EPage();
    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/CREDIT/COFFEE", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/COFFEE"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsCountFiltered/CREDIT/COFFEE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/COFFEE/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsCountFiltered/CREDIT/COFFEE/PENDING/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/COFFEE/PENDING/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsCountFiltered/CREDIT/COFFEE/AVAILABLE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/COFFEE/AVAILABLE/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsCountFiltered/CREDIT/CASH%2FUSD", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/CASH%2FUSD"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsCountFiltered/CREDIT/CASH%2FUSD/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/CASH%2FUSD/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/integrationRewardsCountFiltered", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/integrationRewardsCountFiltered/PENDING/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/integrationRewardsCountFiltered/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/integrationRewardsCountFiltered/PENDING/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/integrationRewardsCountFiltered/PENDING/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/integrationRewardsCountFiltered/PENDING/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/integrationRewardsCountFiltered/AVAILABLE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/integrationRewardsCountFiltered/AVAILABLE/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsMonth", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsMonth"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsMonth/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsMonth/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsWeek", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsWeek"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsWeek/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsWeek/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAssigned/CREDIT/COFFEE", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsAssigned/CREDIT/COFFEE"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAssigned/CREDIT/COFFEE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsAssigned/CREDIT/COFFEE/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAssigned/CREDIT/CASH%2FUSD", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsAssigned/CREDIT/CASH%2FUSD"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
  test("/rewardsAssigned/CREDIT/CASH%2FUSD/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsAssigned/CREDIT/CASH%2FUSD/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsRedeemed/CREDIT/COFFEE", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/COFFEE"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsRedeemed/CREDIT/CASH%2FUSD", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/CASH%2FUSD"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsRedeemed/CREDIT/COFFEE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/COFFEE/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsRedeemed/CREDIT/CASH%2FUSD/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/CASH%2FUSD/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAvailable/CREDIT/COFFEE", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/COFFEE"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAvailable/CREDIT/COFFEE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/COFFEE/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAvailable/CASH%2FUSD", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/CASH%2FUSD"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardsAvailable/CASH%2FUSD/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardsRedeemed/CREDIT/CASH%2FUSD/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/COFFEE", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/COFFEE"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/COFFEE/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/COFFEE"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/COFFEE/prettyValue", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/COFFEE/prettyValue"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/COFFEE/value", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/COFFEE/value"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/COFFEE/prettyValue/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/COFFEE/prettyValue/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/COFFEE/value/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/COFFEE/value/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/CASH%2FUSD", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/CASH%2FUSD"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/CASH%2FUSD/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/CASH%2FUSD/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/CASH%2FUSD/prettyValue", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/CASH%2FUSD/prettyValue"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/CASH%2FUSD/value", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/CASH%2FUSD/value"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/CASH%2FUSD/prettyValue/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/CASH%2FUSD/prettyValue/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/rewardBalance/CREDIT/CASH%2FUSD/value/global", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/rewardBalance/CREDIT/CASH%2FUSD/value/global"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/programGoals/count returns !!!", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/programGoals/count"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasInvalidStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasInvalidStat(stat);
    page.close();
  });

  test("/programGoals/count/Paid-Member-Goal%2Freferrals", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/programGoals/count/Paid-Member-Goal%2Freferrals"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });

  test("/programGoals/conversionCount returns !!!", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/programGoals/conversionCount"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasInvalidStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasInvalidStat(stat);
    page.close();
  });

  test("/programGoals/conversionCount/Paid-Member-Goal%2Freferrals", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/programGoals/count/Paid-Member-Goal%2Freferrals"></sqm-big-stat>`
    );
    const page = await newE2EPage();

    const { expectElement, hasStat } = statFunctions(page);

    await page.setContent(html);
    await page.waitForChanges();
    await expectElement("sqm-big-stat");
    const stat = await page.find(
      `sqm-big-stat >>> div > div[part="stat-value"]`
    );
    hasStat(stat);
    page.close();
  });
});

// nice debugging tool
// console.log(await page.evaluate(()=>document.body.innerHTML))
