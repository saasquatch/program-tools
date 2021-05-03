import {
  useProgramId,
  useLazyQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { VNode } from "@stencil/core";
import { gql } from "graphql-request";
import { LeaderboardViewProps } from "./leaderboard-view";

export interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
  rankType: "rowNumber" | "rank" | "denseRank";
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  empty: VNode;
  loadingstate: VNode;
}

const GET_LEADERBOARD = gql`
  query($type: String!, $filter: UserLeaderboardFilterInput) {
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

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  const programId = useProgramId();
  const user = useUserIdentity();
  const leaderboardVariables = {
    type: props.leaderboardType,
    filter: { programId_eq: programId },
  };
  const [
    getData,
    { data: leaderboardData, loading: loadingLeaderboard },
  ] = useLazyQuery(GET_LEADERBOARD);

  useEffect(() => {
    if (user?.jwt) getData(leaderboardVariables);
  }, [user?.jwt]);

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
