import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { LeaderboardProps, useLeaderboard } from "./useLeaderboard";
import { LeaderboardView } from "./sqm-leaderboard-view";
import { useEffect } from "@saasquatch/universal-hooks";
import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { getProps } from "../../utils/utils";

export default {
  title: "Hooks / useLeaderboard",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);
}

function setupOtherGraphQL() {
  const id = "sam+klip@saasquat.ch";
  const accountId = id;
  const programId = "klip-referral-program";
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbStrbGlwQHNhYXNxdWF0LmNoIiwiaWQiOiJzYW0ra2xpcEBzYWFzcXVhdC5jaCIsImVtYWlsIjoic2FtK2tsaXBAc2Fhc3F1YXQuY2giLCJsb2NhbGUiOiJlbiJ9fQ.a2nYYrSJ81FHXlCU-Sqp_-wquQizinHBhzwzULDzimg";

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
      jwt: JWT,
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

const View = (overrideProps?: LeaderboardProps & any) => {
  const props: LeaderboardProps = {
    leaderboardType: "topConvertedReferrers",
    showRank: true,
    rankType: "rowNumber",
    usersheading: "Top Referrers",
    statsheading: "Completed Referrals",
    interval: "",
    // empty: <span>No Referrals</span>,
    // loadingstate: <span>Loading</span>,
    ...overrideProps,
  };
  const { leaderboardType, rankType } = props;
  console.log(`View("${leaderboardType}") - CALLED`);
  overrideProps.setup();

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
      <sqm-leaderboard {...getProps(props)}></sqm-leaderboard>
      <hr />
    </div>
  );
};

export const TopConvertedReferrers = createHookStory(() => {
  const setup = setupGraphQL;
  return [
    View({ setup }),
    View({ rankType: "rank", setup }),
    View({ rankType: "denseRank", setup }),
  ];
});

export const TopStartedReferrers = createHookStory(() => {
  const setup = setupGraphQL;
  return [
    View({
      leaderboardType: "topStartedReferrers",
      statsheading: "New Referrals",
      setup,
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "rank",
      statsheading: "New Referrals",
      setup,
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "denseRank",
      statsheading: "New Referrals",
      setup,
    }),
  ];
});

export const EmptyLeaderboard = createHookStory(() => {
  const setup = setupOtherGraphQL;
  return [
    View({
      leaderboardType: "topStartedReferrers",
      statsheading: "New Referrals",
      setup,
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "rank",
      statsheading: "New Referrals",
      setup,
    }),
    View({
      leaderboardType: "topStartedReferrers",
      rankType: "denseRank",
      statsheading: "New Referrals",
      interval: "2022-02-11T08:00:00.000Z/2022-02-13T08:00:00.000Z",
      setup,
    }),
  ];
});
