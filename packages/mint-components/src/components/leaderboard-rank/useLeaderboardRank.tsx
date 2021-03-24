import { useQuery } from "@saasquatch/component-boilerplate";
import gql from "graphql-tag";
import { LeaderboardRankViewProps } from "./leaderboard-rank-view";
import { createIntl, createIntlCache } from "@formatjs/intl";

export interface LeaderboardRankProps {
  rankType: "rowNumber" | "rank" | "denseRank";
  rankText: string;
  unrankedText:string;
}

const GET_RANK = gql`
  query {
    viewer {
      ... on User {
        leaderboardRank(type: "topStartedReferrers") {
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
  const cache = createIntlCache();

  const intl = createIntl(
    {
      locale: "en",
    },
    cache
  );

  const rankVariables = {
    type: "topStartedReferrers",
  };
  const { data: rankData } = useQuery(GET_RANK, rankVariables);

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
