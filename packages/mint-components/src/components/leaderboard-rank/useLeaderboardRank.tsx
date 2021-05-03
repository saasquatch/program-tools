import {
  useProgramId,
  useLazyQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import gql from "graphql-tag";
import { LeaderboardRankViewProps } from "./leaderboard-rank-view";
import { intl } from "../../global/global";
import { useEffect } from "@saasquatch/universal-hooks";

export interface LeaderboardRankProps {
  rankType: "rowNumber" | "rank" | "denseRank";
  rankText: string;
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  unrankedText: string;
}

const GET_RANK = gql`
  query($type: String!, $filter: UserLeaderboardFilterInput) {
    viewer {
      ... on User {
        leaderboardRank(type: $type, filter: $filter) {
          rowNumber
          rank
          denseRank
        }
      }
    }
  }
`;

export function useLeaderboardRank(
  props: LeaderboardRankProps
): LeaderboardRankViewProps {
  const programId = useProgramId();
  const user = useUserIdentity();

  const rankVariables = {
    type: props.leaderboardType,
    filter: { programId_eq: programId },
  };

  const [getData, { data: rankData }] = useLazyQuery(GET_RANK);

  useEffect(() => {
    if (user?.jwt) getData(rankVariables);
  }, [user?.jwt]);

  const fullRankText = rankData?.viewer?.leaderboardRank
    ? intl.formatMessage(
        { id: "rankText", defaultMessage: props.rankText },
        {
          rank: rankData?.viewer?.leaderboardRank?.[props.rankType],
        }
      )
    : props.unrankedText || "unranked";

  return {
    data: {
      rank: fullRankText,
    },
  };
}
