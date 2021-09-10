import {
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { VNode } from "@stencil/core";
import { gql } from "graphql-request";
import { LeaderboardViewProps } from "./sqm-leaderboard-view";

export interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
  rankType: "rowNumber" | "rank" | "denseRank";
  leaderboardType:
    | "topStartedReferrers"
    | "topConvertedReferrers"
    | "rewardCount"
    | "rewardValueSum"
    | "singleUnitRewardValueSum";
  interval: string;
  unit?: string;
  empty: VNode;
  loadingstate: VNode;
  demoProps?: LeaderboardViewProps;
}

const GET_LEADERBOARD = gql`
  query ($type: String!, $filter: UserLeaderboardFilterInput) {
    userLeaderboard(type: $type, filter: $filter) {
      dateModified
      rows {
        value
        firstName
        lastInitial
        rank {
          rank
          denseRank
          rowNumber
        }
      }
    }
  }
`;

const REWARD_COUNT_LEADERBOARD = gql`
  query {
    userLeaderboards {
      rewardCount {
        dateModified
        rows {
          value
          firstName
          lastInitial
          rank {
            rank
            denseRank
            rowNumber
          }
        }
      }
    }
  }
`;

const REWARD_VALUE_LEADERBOARD = gql`
  query {
    userLeaderboards {
      rewardValueSum {
        dateModified
        rows {
          value
          firstName
          lastInitial
          rank {
            rank
            denseRank
            rowNumber
          }
        }
      }
    }
  }
`;

const REWARD_UNIT_VALUE_LEADERBOARD = gql`
  query ($unit: String!) {
    userLeaderboards {
      singleUnitRewardValueSum(unit: $unit) {
        dateModified
        rows {
          value
          firstName
          lastInitial
          rank {
            rank
            denseRank
            rowNumber
          }
        }
      }
    }
  }
`;

const leaderboardQueries = {
  topStartedReferrers: GET_LEADERBOARD,
  topConvertedReferrers: GET_LEADERBOARD,
  rewardCount: REWARD_COUNT_LEADERBOARD,
  rewardValueSum: REWARD_VALUE_LEADERBOARD,
  singleUnitRewardValueSum: REWARD_UNIT_VALUE_LEADERBOARD,
};

type LeaderboardRows = {
  value: number;
  firstName: string;
  lastInitial: string;
  rank: Rank;
};

export type Rank = {
  rank: number;
  denseRank: number;
  rowNumber: number;
};

export type Leaderboard = {
  value: number;
  rank: number;
  firstName: string;
  lastInitial: string;
};

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  const programId = useProgramId();
  const user = useUserIdentity();

  const isReferralLeaderboard = [
    "topStartedReferrers",
    "topConvertedReferrers",
  ].includes(props.leaderboardType);

  const variables = isReferralLeaderboard
    ? {
        type: props.leaderboardType,
        filter: { programId_eq: programId },
      }
    : props.leaderboardType === "singleUnitRewardValueSum"
    ? {
        unit: props.unit,
      }
    : {};

  if (props.interval) {
    variables.filter["interval"] = props.interval;
  }

  const leaderboardQuery = leaderboardQueries[props.leaderboardType];

  const { data: leaderboardData, loading: loadingLeaderboard } = useQuery(
    leaderboardQuery,
    variables,
    !user?.jwt
  );

  const leaderboardRows = isReferralLeaderboard
    ? leaderboardData?.userLeaderboard?.rows
    : leaderboardData?.userLeaderboards?.[props.leaderboardType]?.rows;

  const flattenedLeaderboard = getFlattenedLeaderboard(leaderboardRows);

  const sortedLeaderboard = flattenedLeaderboard?.sort(function (
    a: { rank: number },
    b: { rank: number }
  ) {
    return a.rank - b.rank;
  });

  console.log({ flattenedLeaderboard, sortedLeaderboard });

  function getFlattenedLeaderboard(
    leaderboardRows: LeaderboardRows[]
  ): Leaderboard[] {
    return leaderboardRows?.flatMap((user) => ({
      value: user.value,
      firstName: user.firstName || "Anonymous",
      lastInitial: user.lastInitial,
      rank: user.rank?.[props.rankType],
    }));
  }

  return {
    states: {
      loading: loadingLeaderboard,
      hasLeaders: sortedLeaderboard?.length > 0,
      styles: props,
    },
    data: {
      leaderboard: sortedLeaderboard,
      rankType: props.rankType,
    },
    elements: {
      empty: props.empty,
      loadingstate: props.loadingstate,
    },
  };
}
