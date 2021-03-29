import { useQuery } from "@saasquatch/component-boilerplate";
import { VNode } from "@stencil/core";
import { gql } from "graphql-request";
import { LeaderboardViewProps } from "./leaderboard-view";

export interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
  // heading: string;
  rankType: "rowNumber" | "rank" | "denseRank";
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  // updatefrequency: string;
  empty: VNode;
  loadingstate: VNode;
}

const GET_LEADERBOARD = gql`
  query {
    userLeaderboard(type: "topConvertedReferrers") {
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

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  const leaderboardVariables = {
    type: props.leaderboardType,
  };
  const { data: leaderboardData, loading: loadingLeaderboard } = useQuery(
    GET_LEADERBOARD,
    leaderboardVariables
  );

  const flattenedLeaderBoard = leaderboardData?.userLeaderboard?.rows.flatMap(
    (user) => ({
      value: user.value,
      firstName: user.firstName,
      lastInitial: user.lastInitial,
      rank: user.rank?.[props.rankType],
    })
  );

  const sortedLeaderboard = flattenedLeaderBoard?.sort(function (
    a: { rank: number },
    b: { rank: number }
  ) {
    return a.rank - b.rank;
  });

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
