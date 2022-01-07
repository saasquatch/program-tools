import { h } from "@stencil/core";
import { BigStatView } from "./sqm-big-stat-view";
import { useDemoBigStat } from "./useDemoBigStat";
import { useBigStat } from "./useBigStat";
import { useState } from "@saasquatch/stencil-hooks";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useEffect } from "@saasquatch/universal-hooks";
import { setUserIdentity } from "@saasquatch/component-boilerplate";

export default {
  title: "Hooks / useBigStat",
};

function setupGraphQL() {
  const id = "nynellie";
  const accountId = id;
  const programId = "ny-post-referrals";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a7yoz8854cf6x",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6Im55bmVsbGllIiwiaWQiOiJueW5lbGxpZSJ9fQ.3KV974VPLgk4tD8LQfJTi4IPkKCmnaB8w48HzVJYDuI",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);
}

const View = (statType: string, format: string) => {
  console.log(`View("${statType}") - CALLED`);
  setupGraphQL();
  const { props, label } = useBigStat({
    statType,
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  });
  return (
    <div>
      <b>Stat format:</b>
      <pre>{format}</pre>
      <br />
      <b>Stat selected:</b> <pre style={{ color: "green" }}>{statType}</pre>
      <BigStatView {...props}>{label}</BigStatView>
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
export const RewardsRedeemed = createHookStory(() =>
  View(
    "/rewardsRedeemed/CREDIT/COFFEE",
    "/(rewardsRedeemed)/:statType/:unit/:global?"
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