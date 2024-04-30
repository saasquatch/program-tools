import { h, VNode } from "@stencil/core";
import { BigStatView } from "./sqm-big-stat-view";
import { useDemoBigStat } from "./useDemoBigStat";
import { useState } from "@saasquatch/stencil-hooks";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useEffect } from "@saasquatch/universal-hooks";
import { setUserIdentity } from "@saasquatch/component-boilerplate";

export default {
  title: "Hooks / useBigStat",
};

function setupGraphQL() {
  const id = "zach.harrison@referralsaasquatch.com";
  const accountId = id;
  const programId = "klip-referral-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIiwiYWNjb3VudElkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIn19.Wi8Vd5r64g5n8VNhiY-v5cqFcLwGxPG3Wi3dVSfkFZI",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);
}

const View = (statType: string, format: string, label?: VNode | string) => {
  //   console.log(`View("${statType}") - CALLED`);
  setupGraphQL();
  return (
    <div>
      <b>Stat format:</b>
      <pre>{format}</pre>
      <br />
      <b>Stat selected:</b> <pre style={{ color: "green" }}>{statType}</pre>
      <sqm-big-stat stat-type={statType}>{label}</sqm-big-stat>
    </div>
  );
};

const DemoView = () => {
  const [type, setType] = useState("/someRandomThing/with/someArguments/1234");
  const { props, label } = useDemoBigStat({
    statType: type,
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  });
  return (
    <div>
      <div>
        Stat type:{" "}
        <input
          style={{ width: "300px" }}
          type="text"
          value={type}
          onInput={(e) => setType((e.target as HTMLInputElement).value)}
        ></input>
      </div>
      <hr />
      <div>
        <BigStatView {...props}>{label}</BigStatView>
      </div>
    </div>
  );
};

export const Demo = createHookStory(DemoView);

export const ReferralsCount = createHookStory(() =>
  View("/referralsCount", "/(referralsCount)/:status?")
);
export const referralsConvertedCount = createHookStory(() => {
  return View("/referralsCount/converted", "/(referralsCount)/:status?");
});

export const referralsStartedCount = createHookStory(() => {
  return View("/referralsCount/started", "/(referralsCount)/:status?");
});
export const ReferralsMonth = createHookStory(() =>
  View("/referralsMonth", "/(referralsMonth)")
);
export const ReferralsWeek = createHookStory(() =>
  View("/referralsWeek", "/(referralsWeek)")
);
export const RewardsCount = createHookStory(() =>
  View("/rewardsCount", "/(rewardsCount)/:global?")
);
export const GlobalRewardsCount = createHookStory(() =>
  View("/rewardsCount/global", "/(rewardsCount)/:global")
);
export const GlobalRewardsCountFiltered = createHookStory(() =>
  View(
    "/rewardsCountFiltered/global",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const GlobalRewardsCountPctDiscount = createHookStory(() =>
  View(
    "/rewardsCountFiltered/PCT_DISCOUNT/global",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const GlobalRewardsCountPctDiscountPending = createHookStory(() =>
  View(
    "/rewardsCountFiltered/PCT_DISCOUNT/PENDING/global",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const RewardsCountByUnit = createHookStory(() =>
  View(
    "/rewardsCountFiltered/CREDIT/COFFEE",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const GlobalRewardsCountByUnit = createHookStory(() =>
  View(
    "/rewardsCountFiltered/CREDIT/COFFEE/global",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const GlobalPendingRewardsCount = createHookStory(() =>
  View(
    "/rewardsCountFiltered/CREDIT/COFFEE/PENDING/global",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const RewardsAvailableCount = createHookStory(() =>
  View(
    "/rewardsCountFiltered/AVAILABLE",
    "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const GlobalRewardsCountByIntegration = createHookStory(() =>
  View(
    "/integrationRewardsCountFiltered/AVAILABLE/global",
    "/(integrationRewardsCountFiltered)/:format([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const GlobalRewardsCountByPendingIntegration = createHookStory(() =>
  View(
    "/integrationRewardsCountFiltered/PENDING/global",
    "/(integrationRewardsCountFiltered)/:format([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?"
  )
);
export const RewardsMonth = createHookStory(() =>
  View("/rewardsMonth", "/(rewardsMonth)/:global?")
);
export const RewardsWeek = createHookStory(() =>
  View("/rewardsWeek", "/(rewardsWeek)/:global?")
);
export const RewardsAssigned = createHookStory(() =>
  View(
    "/rewardsAssigned/CREDIT/COFFEE",
    "/(rewardsAssigned)/:statType/:unit/:global?"
  )
);
export const RewardsAssignedCashUSD = createHookStory(() =>
  View(
    "/rewardsAssigned/CREDIT/CASH%2FUSD",
    "/(rewardsAssigned)/:statType/:unit/:global?"
  )
);
export const RewardsPending = createHookStory(() =>
  View(
    "/rewardsPending/CREDIT/USD",
    "/(rewardsPending)/:statType/:unit/:global?"
  )
);
export const RewardsPendingGlobal = createHookStory(() =>
  View(
    "/rewardsPending/CREDIT/USD/global",
    "/(rewardsPending)/:statType/:unit/:global?"
  )
);
export const RewardsRedeemed = createHookStory(() =>
  View(
    "/rewardsRedeemed/CREDIT/USD",
    "/(rewardsRedeemed)/:statType/:unit/:global?"
  )
);
export const RewardsRedeemedWeek = createHookStory(() =>
  View(
    "/rewardsRedeemedWeek/CREDIT/USD",
    "/(rewardsRedeemedWeek)/:statType/:unit/:global?"
  )
);
export const RewardsRedeemedMonth = createHookStory(() =>
  View(
    "/rewardsRedeemedMonth/CREDIT/USD",
    "/(rewardsRedeemedMonth)/:statType/:unit/:global?"
  )
);
export const RewardsRedeemedGlobal = createHookStory(() =>
  View(
    "/rewardsRedeemed/CREDIT/USD/global",
    "/(rewardsRedeemed)/:statType/:unit/:global?"
  )
);
export const RewardsRedeemedWeekGlobal = createHookStory(() =>
  View(
    "/rewardsRedeemedWeek/CREDIT/USD/global",
    "/(rewardsRedeemedWeek)/:statType/:unit/:global?"
  )
);
export const RewardsRedeemedMonthGlobal = createHookStory(() =>
  View(
    "/rewardsRedeemedMonth/CREDIT/USD/global",
    "/(rewardsRedeemedMonth)/:statType/:unit/:global?"
  )
);
export const RewardsAvailable = createHookStory(() =>
  View(
    "/rewardsAvailable/CREDIT/COFFEE",
    "/(rewardsAvailable)/:statType/:unit/:global?"
  )
);
export const RewardsAvailableWithSlash = createHookStory(() =>
  View(
    "/rewardsAvailable/CREDIT/CASH%2FUSD",
    "/(rewardsAvailable)/:statType/:unit/:global?"
  )
);
export const RewardBalance = createHookStory(() =>
  View(
    "/rewardBalance/CREDIT/COFFEE/prettyValue",
    "/(rewardBalance)/:statType/:unit/:format([prettyValue|value]*)?/:global?"
  )
);
export const RewardBalanceCashUSD = createHookStory(() => {
  const unit = encodeURIComponent("CASH/USD");
  return View(
    `/rewardBalance/CREDIT/${unit}/prettyValue`,
    "/(rewardBalance)/:statType/:unit/:format([prettyValue|value]*)?/:global?"
  );
});

export const ProgramGoals = createHookStory(() => {
  const dummy = encodeURIComponent("Paid-Member-Goal/referrals");
  return View(
    `/programGoals/count/${dummy}`,
    "/(programGoals)/:metricType/:goalId"
  );
});

export const CustomField = createHookStory(() => {
  return View(`/customFields/thingCount`, "/(customFields)/:customField");
});

export const CustomFieldWithLabel = createHookStory(() => {
  return View(
    `/customFields/thingCount`,
    "/(customFields)/:customField",
    <sqm-text>Thing Count</sqm-text>
  );
});

export const CustomFieldWithEmptyLabel = createHookStory(() => {
  return View(
    `/customFields/thingCount`,
    "/(customFields)/:customField",
    "   "
  );
});

export const CustomFieldWithEmptySpaceLabel = createHookStory(() => {
  return View(
    `/customFields/thingCount`,
    "/(customFields)/:customField",
    "\n   "
  );
});

export const CustomFieldWithTextLabel = createHookStory(() => {
  return View(
    `/customFields/thingCount`,
    "/(customFields)/:customField",
    "Thing Count"
  );
});

export const Traffic = createHookStory(() => View("/traffic", "/(traffic)"));

export const TrafficTwo = createHookStory(() =>
  View("/userStats/traffic", "/(userStat)/:statId", "Traffic")
);

export const Referrals = createHookStory(() =>
  View("/userStats/referrals", "/(userStat)/:statId", "Referrals")
);

export const Conversions = createHookStory(() =>
  View("/userStats/conversions", "/(userStat)/:statId", "Conversions")
);

export const Goals = createHookStory(() =>
  View("/userStats/goals", "/(userStat)/:statId", "Goals")
);

export const Rewards = createHookStory(() =>
  View("/userStats/rewards", "/(userStat)/:statId", "Rewards")
);

export const WidgetLoads = createHookStory(() =>
  View("/userStats/widgetLoads", "/(userStat)/:statId", "Widget Loads")
);

export const Revenue = createHookStory(() =>
  View("/userStats/revenue", "/(userStat)/:statId", "Revenue")
);

export const GeneratedRevenue = createHookStory(() =>
  View(
    "/userStats/generatedRevenue",
    "/(userStat)/:statId",
    "Generated Revenue"
  )
);

export const ReferredRevenue = createHookStory(() =>
  View("/userStats/referredRevenue", "/(userStat)/:statId", "Referred Revenue")
);

export const PayoutBalance = createHookStory(() =>
  View("/payoutBalance", "/(payoutBalance)")
);
