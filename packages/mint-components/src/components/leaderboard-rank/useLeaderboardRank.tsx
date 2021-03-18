import { useQuery } from "@saasquatch/component-boilerplate";
import gql from "graphql-tag";
import { LeaderboardRankViewProps } from "./leaderboard-rank-view";
import { createIntl, createIntlCache } from "@formatjs/intl";

export interface LeaderboardRankProps {
  rankType: "rowNumber" | "rank" | "denseRank";
  rankText: string;
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

// const GET_LEADERBOARD_UPDATED = gql`
//   query {
//     userLeaderboard(type: "topConvertedReferrers") {
//       dateModified
//     }
//   }
// `;

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
  // const leaderboardVariables = {
  //   type: "topConvertedReferrers",
  // };
  // const { data: leaderboardData, loading: loadingLeaderboard } = useQuery(
  //   GET_LEADERBOARD_UPDATED,
  //   leaderboardVariables
  // );

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
    : "unranked";

  // const now = new Date();
  // const relative =
  //   (new Date(now.getTime() + now.getTimezoneOffset() * 60000).getTime() -
  //     leaderboardData?.userLeaderboard?.dateModified) *
  //   -1;

  return {
    // states: {
    //   loading: loadingLeaderboard || loadingRank,
    //   styles: props,
    // },
    data: {
      rank: fullRankText,
      // rankType: props.rankType,
      // lastUpdated: intl.formatRelativeTime(
      //   Math.ceil(relative / (60 * 60 * 24 * 1000)),
      //   "seconds",
      //   {
      //     localeMatcher: "lookup",
      //     numeric: "auto",
      //     style: "short",
      //   }
      // ),
    },
    // callbacks: {},
  };
}
