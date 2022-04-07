import {
  useLocale,
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
  rankheading?: string;
  anonymousUser?: string;
  showRank?: boolean;
  hideViewer?: boolean;
  rankType: "rowNumber" | "rank" | "denseRank";
  leaderboardType:
    | "topStartedReferrers"
    | "topConvertedReferrers"
    | "topPointEarners";
  rowNumber: number;
  programId?: string;
  interval: string;
  empty: VNode;
  loadingstate: VNode;
  demoProps?: LeaderboardViewProps;
}

const GET_LEADERBOARD = gql`
  query (
    $type: String!
    $filter: UserLeaderboardFilterInput
    $locale: RSLocale
  ) {
    userLeaderboard(type: $type, filter: $filter) {
      dateModified
      rows {
        value
        textValue(locale: $locale)
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

const GET_RANK = gql`
  query (
    $type: String!
    $filter: UserLeaderboardFilterInput
  ) {
    viewer {
      ... on User {
        firstName
        lastInitial
        leaderboardRank(type: $type, filter: $filter) {
          value
          rank
          denseRank
          rowNumber
        }
      }
    }
  }
`;

type LeaderboardRows = {
  textValue: string;
  firstName: string;
  lastInitial: string;
  rank: Rank;
  rowNumber: number;
};

export type Rank = {
  rank: number;
  denseRank: number;
  rowNumber: number;
};

export type Leaderboard = {
  textValue: string;
  rank: number;
  firstName: string;
  lastInitial: string;
  rowNumber: number;
};

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  const programIdContext = useProgramId();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;
  const user = useUserIdentity();
  const locale = useLocale();

  const variables = programId
    ? {
        type: props.leaderboardType,
        filter: { programId_eq: programId },
        locale: locale ?? "en_US",
      }
    : {
        type: props.leaderboardType,
        locale: locale ?? "en_US",
      };

  if (props.interval) {
    variables.filter["interval"] = props.interval;
  }
  console.log("VARIABLES", variables)

  const { data: leaderboardData, loading: loadingLeaderboard } = useQuery(
    GET_LEADERBOARD,
    variables,
    !user?.jwt
  );

  const { data: rankData } = useQuery(GET_RANK, variables, !user?.jwt);

  const leaderboardRows = leaderboardData?.userLeaderboard?.rows;

  const flattenedLeaderboard = getFlattenedLeaderboard(leaderboardRows);

  const sortedLeaderboard = flattenedLeaderboard?.sort(function (
    a: { rank: number },
    b: { rank: number }
  ) {
    return a.rank - b.rank;
  });

  function getFlattenedLeaderboard(
    leaderboardRows: LeaderboardRows[]
  ): Leaderboard[] {
    return leaderboardRows?.flatMap((user) => ({
      textValue: user.textValue,
      firstName: user.firstName,
      lastInitial: user.lastInitial,
      rank: user.rank?.[props.rankType],
      rowNumber: user.rank?.rowNumber,
    }));
  }

  const viewingUser: Leaderboard = {
    textValue: rankData?.viewer?.leaderboardRank?.value,
    firstName: rankData?.viewer?.firstName,
    lastInitial: rankData?.viewer?.lastInitial,
    rank: rankData?.viewer?.leaderboardRank?.[props.rankType],
    rowNumber: rankData?.viewer?.leaderboardRank?.rowNumber,
  };

  return {
    states: {
      loading: loadingLeaderboard,
      hasLeaders: sortedLeaderboard?.length > 0,
      styles: props,
    },
    data: {
      leaderboard: sortedLeaderboard?.slice(0, props.rowNumber),
      rankType: props.rankType,
      viewerRank: viewingUser,
    },
    elements: {
      empty: props.empty,
      loadingstate: props.loadingstate,
    },
  };
}
