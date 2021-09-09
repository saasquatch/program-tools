import { h } from "@stencil/core";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";
import {
  LeaderboardProps,
  useLeaderboard,
} from "../components/sqm-leaderboard/useLeaderboard";
import { LeaderboardView } from "../components/sqm-leaderboard/sqm-leaderboard-view";

export default {
  title: "Hooks / useLeaderboard",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    userId: id,
    accountId,
    programId,
  };

  return { id, accountId };
}

const View = (overrideProps?: LeaderboardProps & any) => {
  const props: LeaderboardProps = {
    leaderboardType: "topConvertedReferrers",
    rankType: "rowNumber",
    usersheading: "Top Referrers",
    statsheading: "Completed Referrals",
    interval: "",
    empty: <span>No Referrals</span>,
    loadingstate: <span>Loading</span>,
    ...overrideProps,
  };
  const { leaderboardType, rankType } = props;
  console.log(`View("${leaderboardType}") - CALLED`);
  setupGraphQL();
  const { states, data, elements } = useLeaderboard(props);
  return (
    <div>
      <b>Leaderboard Type:</b>
      <pre>{leaderboardType}</pre>
      <br />
      <b>Rank Type:</b>
      <pre>{rankType}</pre>
      {overrideProps?.unit && (
        <span>
          <b>Unit:</b>
          <pre>{overrideProps?.unit}</pre>
        </span>
      )}
      <LeaderboardView
        states={states}
        data={data}
        elements={elements}
      ></LeaderboardView>
    </div>
  );
};

export const TopConvertedReferrers = createHookStory(() => {
  return View();
});

export const TopStartedReferrers = createHookStory(() => {
  return View({
    leaderboardType: "topStartedReferrers",
    statsheading: "New Referrals",
  });
});

export const RewardCount = createHookStory(() => {
  return View({
    leaderboardType: "rewardCount",
    statsheading: "Number of Rewards",
    empty: <span>No Rewards</span>,
  });
});

export const RewardValueSum = createHookStory(() => {
  return View({
    leaderboardType: "rewardValueSum",
    statsheading: "Value of Rewards",
    empty: <span>No Rewards</span>,
  });
});

export const RewardValueSumOfUnit = createHookStory(() => {
  return View({
    leaderboardType: "singleUnitRewardValueSum",
    unit: "POINT",
    statsheading: "Value of Rewards",
    empty: <span>No Rewards</span>,
  });
});
