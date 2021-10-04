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

// <script>
// window.widgetIdent = {
//   tenantAlias: "test_a7yoz8854cf6x",
//   appDomain: "https://staging.referralsaasquatch.com",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6Im55bmVsbGllIiwiaWQiOiJueW5lbGxpZSJ9fQ.3KV974VPLgk4tD8LQfJTi4IPkKCmnaB8w48HzVJYDuI",
//   userId: "nynellie",
//   accountId: "nynellie",
//   programId: "ny-post-referrals",
// }
// </script>

function getHTML(stat) {
  return /*html*/ `
  <div>
    ${stat}
  </div>
  `;
}

const statTypes = [
  "/referralsCount",
  "/referralsCount/converted",
  "/referralsCount/started",
  "/referralsMonth",
  "/referralsWeek",
  "/rewardsCount",
  "/rewardsCount/global",
  "/rewardsCountFiltered",
  "/rewardsCountFiltered/global",
  "/rewardsCountFiltered/INTEGRATION",
  "/rewardsCountFiltered/INTEGRATION/global",
  "/rewardsCountFiltered/PCT_DISCOUNT",
  "/rewardsCountFiltered/PCT_DISCOUNT/global",
  "/rewardsCountFiltered/PCT_DISCOUNT/PENDING",
  "/rewardsCountFiltered/PCT_DISCOUNT/AVAILABLE",
  "/rewardsCountFiltered/PCT_DISCOUNT/CANCELLED",
  "/rewardsCountFiltered/PCT_DISCOUNT/PENDING/global",
  "/rewardsCountFiltered/CREDIT",
  "/rewardsCountFiltered/CREDIT/global",
  "/rewardsCountFiltered/CREDIT/COFFEE",
  "/rewardsCountFiltered/CREDIT/COFFEE/global",
  "/rewardsCountFiltered/CREDIT/COFFEE/PENDING/global",
  "/rewardsCountFiltered/CREDIT/COFFEE/AVAILABLE/global",
  "/rewardsCountFiltered/CREDIT/CASH%2FUSD",
  "/rewardsCountFiltered/CREDIT/CASH%2FUSD/global",
  "/rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING",
  "/rewardsCountFiltered/CREDIT/CASH%2FUSD/PENDING/global",
  "/integrationRewardsCountFiltered",
  "/integrationRewardsCountFiltered/global",
  "/integrationRewardsCountFiltered/PENDING/global",
  "/integrationRewardsCountFiltered/AVAILABLE/global",
  "/rewardsMonth",
  "/rewardsMonth/global",
  "/rewardsWeek",
  "/rewardsWeek/global",
  "/rewardsAssigned/CREDIT/COFFEE",
  "/rewardsAssigned/CREDIT/COFFEE/global",
  "/rewardsAssigned/CREDIT/CASH%2FUSD",
  "/rewardsAssigned/CREDIT/CASH%2FUSD/global",
  "/rewardsRedeemed/CREDIT/COFFEE",
  "/rewardsRedeemed/CREDIT/CASH%2FUSD",
  "/rewardsRedeemed/CREDIT/COFFEE/global",
  "/rewardsRedeemed/CREDIT/CASH%2FUSD/global",
  "/rewardsAvailable/CREDIT/COFFEE",
  "/rewardsAvailable/CREDIT/COFFEE/global",
  "/rewardsAvailable/CREDIT/CASH%2FUSD",
  "/rewardsAvailable/CREDIT/CASH%2FUSD/global",
  "/rewardBalance/CREDIT/COFFEE",
  "/rewardBalance/CREDIT/CASH/USD",
  "/rewardBalance/CREDIT/COFFEE/global",
  "/rewardBalance/CREDIT/COFFEE/prettyValue",
  "/rewardBalance/CREDIT/COFFEE/value",
  "/rewardBalance/CREDIT/COFFEE/prettyValue/global",
  "/rewardBalance/CREDIT/COFFEE/value/global",
  "/rewardBalance/CREDIT/CASH%2FUSD",
  "/rewardBalance/CREDIT/CASH%2FUSD/global",
  "/rewardBalance/CREDIT/CASH%2FUSD/prettyValue",
  "/rewardBalance/CREDIT/CASH%2FUSD/value",
  "/rewardBalance/CREDIT/CASH%2FUSD/prettyValue/global",
  "/rewardBalance/CREDIT/CASH%2FUSD/value/global",
  "/programGoals/count/Paid-Member-Goal%2Freferrals",
  "/programGoals/conversionCount/Paid-Member-Goal%2Freferrals",
];

describe("sqm-big-stat", () => {
  statTypes.map((statType) => {
    return test(statType, async () => {
      const html = getHTML(
        `<sqm-big-stat stat-type="${statType}"></sqm-big-stat>`
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
  test("/programGoals/count/My-Goal/referrals returns !!!", async () => {
    const html = getHTML(
      `<sqm-big-stat stat-type="/programGoals/count/My-Goal/referrals"></sqm-big-stat>`
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
});

// nice debugging tool
// console.log(await page.evaluate(()=>document.body.innerHTML))
