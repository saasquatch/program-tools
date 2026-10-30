import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { LeaderboardProps } from "./useLeaderboard";
import { getProps } from "../../utils/utils";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

export default {
  title: "Hooks / useLeaderboard",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  useCannedEnvironment({ programId, user: { id, accountId } });
}

function setupOtherGraphQL() {
  const id = "sam+klip@saasquat.ch";
  const accountId = id;
  const programId = "klip-referral-program";

  useCannedEnvironment({ programId, user: { id, accountId } });

  return { id, accountId };
}

const View = (overrideProps?: LeaderboardProps & any) => {
  const props: LeaderboardProps = {
    "leaderboard-type": "topConvertedReferrers",
    showRank: true,
    "rank-type": "rowNumber",
    usersheading: "Top Referrers",
    statsheading: "Completed Referrals",
    interval: "",
    // empty: <span>No Referrals</span>,
    // loadingstate: <span>Loading</span>,
    ...overrideProps,
  };
  const { leaderboardType, rankType } = props;
  //   console.log(`View("${leaderboardType}") - CALLED`, { ...props });

  return (
    <div style={{ marginBottom: "20px" }}>
      <sqm-divided-layout direction="row">
        <div style={{ padding: "10px" }}>
          <b>Leaderboard Type</b>
          <pre>{leaderboardType}</pre>
        </div>
        <div style={{ padding: "10px" }}>
          <b>Rank Type</b>
          <pre>{rankType}</pre>
        </div>
      </sqm-divided-layout>
      <sqm-leaderboard {...props}>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
          empty-state-header="View your rank in the leaderboard"
          empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
        ></sqm-empty>
      </sqm-leaderboard>
      <hr />
    </div>
  );
};

export const TopConvertedReferrers = createHookStory(() => {
  setupGraphQL();
  return [
    View({}),
    View({ rankType: "rank" }),
    View({ rankType: "denseRank" }),
  ];
});

export const TopStartedReferrers = createHookStory(() => {
  setupGraphQL();
  return [
    View({
      leaderboardType: "topStartedReferrers",
      statsheading: "New Referrals",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "rank",
      statsheading: "New Referrals",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "denseRank",
      statsheading: "New Referrals",
    }),
  ];
});

export const topPointEarners = createHookStory(() => {
  setupGraphQL();
  return [
    View({
      leaderboardType: "topPointEarners",
      statsheading: "Points",
      usersheading: "Top Earners",
    }),
    View({
      leaderboardType: "topPointEarners",
      rankType: "rank",
      statsheading: "Points",
      usersheading: "Top Earners",
    }),
    View({
      leaderboardType: "topPointEarners",
      rankType: "denseRank",
      statsheading: "Points",
      usersheading: "Top Earners",
    }),
  ];
});

export const globalLeaderboards = createHookStory(() => {
  setupGraphQL();
  return [
    View({
      leaderboardType: "topPointEarners",
      rankType: "rank",
      statsheading: "Points",
      usersheading: "Top Earners",
      programId: "",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "rank",
      statsheading: "Referrals",
      programId: "",
    }),
    View({
      leaderboardType: "topConvertedReferrers",
      rankType: "rank",
      statsheading: "Referrals",
      programId: "",
    }),
  ];
});

export const FiveResults = createHookStory(() => {
  setupGraphQL();
  return [
    View({
      leaderboardType: "topStartedReferrers",
      maxRows: 5,
      statsheading: "Referrals",
    }),
  ];
});

export const EmptyLeaderboard = createHookStory(() => {
  setupOtherGraphQL();
  return [
    View({
      leaderboardType: "topStartedReferrers",
      statsheading: "New Referrals",
      interval: "2021-02-11T08:00:00.000Z/2021-02-13T08:00:00.000Z",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "rank",
      statsheading: "New Referrals",
      interval: "2021-02-11T08:00:00.000Z/2021-02-13T08:00:00.000Z",
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "denseRank",
      statsheading: "New Referrals",
      interval: "2021-02-11T08:00:00.000Z/2021-02-13T08:00:00.000Z",
    }),
  ];
});

export const DemoHook = createHookStory(() => {
  return (
    <sqm-leaderboard
      usersheading="Referrer"
      statsheading="Referrals"
      rank-type="rank"
      leaderboard-type="topStartedReferrers"
      rankheading="Rank"
      show-rank="true"
    >
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
        empty-state-header="View your rank in the leaderboard"
        empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
      ></sqm-empty>
    </sqm-leaderboard>
  );
});

export const DemoHookEmpty = createHookStory(() => {
  return (
    <sqm-leaderboard
      usersheading="Referrer"
      statsheading="Referrals"
      rank-type="rank"
      leaderboard-type="topStartedReferrers"
      rankheading="Rank"
      show-rank="true"
      demoData={{
        data: {
          rankType: "rank",
          leaderboard: [],
        },
        states: {
          loading: false,
          hasLeaders: false,
          styles: {
            usersheading: "Top referrers",
            statsheading: "New customers",
            rankheading: "Rank",
            anonymousUser: "Anonymous User",
            showRank: true,
          },
        },
      }}
    >
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
        empty-state-header="View your rank in the leaderboard"
        empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
      ></sqm-empty>
    </sqm-leaderboard>
  );
});
