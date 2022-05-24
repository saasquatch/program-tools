import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import { useDemoBigStat } from "../components/sqm-big-stat/useDemoBigStat";
import { useBigStat } from "../components/sqm-big-stat/useBigStat";
import { useState } from "@saasquatch/stencil-hooks";

import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";

export default {
  title: "Hooks / useBigStat",
};

function setupGraphQL() {
  const id = "bj123";
  const accountId = id;
  const programId = "ny-post-referrals";

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a7yoz8854cf6x",
    appDomain: "https://staging.referralsaasquatch.com",
    token:
      // you have to change this if you change the id or accountId
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6ImJqMTIzIiwiaWQiOiJiajEyMyJ9fQ.rmJZebIyj-xThGi0WO6LSyE573vb1HkfLc8lFfqMmgs",
    userId: id,
    accountId,
    programId,
  };
  return { id, accountId };
}

const View = (statType: string) => {
  console.log(`View("${statType}") - CALLED`);
  setupGraphQL();
  const { props, label } = useBigStat({
    statType,
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  });
  return <BigStatView {...props}>{label}</BigStatView>;
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

export const ReferralsCount = createHookStory(() => View("/referralsCount"));
export const referralsConvertedCount = createHookStory(() => {
  return View("/referralsCount/converted");
});

export const referralsStartedCount = createHookStory(() => {
  return View("/referralsCount/started");
});
export const ReferralsMonth = createHookStory(() => View("/referralsMonth"));
export const ReferralsWeek = createHookStory(() => View("/referralsWeek"));
export const RewardsCount = createHookStory(() => View("/rewardsCount"));
export const RewardsMonth = createHookStory(() => View("/rewardsMonth"));
export const RewardsWeek = createHookStory(() => View("/rewardsWeek"));
export const RewardsAssigned = createHookStory(() =>
  View("/rewardsAssigned/CREDIT/COFFEE")
);
export const RewardsRedeemed = createHookStory(() =>
  View("/rewardsRedeemed/CREDIT/COFFEE")
);
export const RewardsAvailable = createHookStory(() =>
  View("/rewardsAvailable/CREDIT/COFFEE")
);
export const RewardsAvailableWithSlash = createHookStory(() =>
  View("/rewardsAvailable/CREDIT/CASH/USD")
);
export const RewardBalance = createHookStory(() =>
  View("/rewardBalance/CREDIT/COFFEE/prettyValue")
);
export const ProgramGoals = createHookStory(() => {
  const dummy = encodeURIComponent("Paid-Member-Goal/referrals");
  return View("/programGoals/count/" + `${dummy}`);
});