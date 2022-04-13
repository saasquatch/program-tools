import {
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { LeaderboardRankViewProps } from "./sqm-leaderboard-rank-view";
import { intl } from "../../global/global";

export interface LeaderboardRankProps {
  rankType: "rowNumber" | "rank" | "denseRank";
  rankText: string;
  leaderboardType:
    | "topStartedReferrers"
    | "topConvertedReferrers"
    | "topPointEarners";
  programId?: string;
  unrankedText: string;
  interval: string;
}

const GET_RANK = gql`
  query ($type: String!, $filter: UserLeaderboardFilterInput) {
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
  const programIdContext = useProgramId();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;
  const user = useUserIdentity();

  const rankVariables = programId
    ? {
        type: props.leaderboardType,
        filter: { programId_eq: programId },
      }
    : {
        type: props.leaderboardType,
        filter: {},
      };

  if (props.interval) {
    rankVariables.filter["interval"] = props.interval;
  }

  const { data: rankData } = useQuery(GET_RANK, rankVariables, !user?.jwt);

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
