import {
  useLocale,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { VNode } from "@stencil/core";
import { gql } from "graphql-request";
import { LeaderboardViewProps } from "./sqm-leaderboard-view";
import { useMemo } from "@saasquatch/universal-hooks";

export interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
  rankheading?: string;
  anonymousUser?: string;
  showRank?: boolean;
  hideViewer?: boolean;
  viewingUserText?: string;
  hideNames?: boolean;
  width?: string;
  rankSuffix?: string;
  rankType: "rowNumber" | "rank" | "denseRank";
  leaderboardType:
    | "topStartedReferrers"
    | "topConvertedReferrers"
    | "topPointEarners";
  maxRows: number;
  programId?: string;
  interval: string;
  viewingUserHighlightColor?: string;
  viewingUserHighlightTextColor?: string;
  background?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  empty: VNode;
  demoProps?: LeaderboardViewProps;
}

const GET_LEADERBOARD = gql`
  query (
    $type: String!
    $filter: UserLeaderboardFilterInput
    $locale: RSLocale
    $limit: Int!
  ) {
    userLeaderboard(type: $type, filter: $filter) {
      dateModified
      rows(limit: $limit) {
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

const GET_LEADERBOARD_WITHOUT_NAMES = gql`
  query (
    $type: String!
    $filter: UserLeaderboardFilterInput
    $locale: RSLocale
    $limit: Int!
  ) {
    userLeaderboard(type: $type, filter: $filter) {
      dateModified
      rows(limit: $limit) {
        textValue(locale: $locale)
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
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        firstName
        lastInitial
        leaderboardRank(type: $type, filter: $filter) {
          textValue(locale: $locale)
          rank
          denseRank
          rowNumber
        }
      }
    }
  }
`;

const GET_RANK_WITHOUT_NAMES = gql`
  query (
    $type: String!
    $filter: UserLeaderboardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        leaderboardRank(type: $type, filter: $filter) {
          textValue(locale: $locale)
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
      }
    : {
        type: props.leaderboardType,
        filter: {},
      };

  if (props.interval) {
    variables.filter["interval"] = props.interval;
  }

  if (locale) {
    variables["locale"] = locale;
  }

  if (props.maxRows > 0) {
    variables["limit"] = props.maxRows;
  }

  const {
    data: leaderboardData,
    loading: loadingLeaderboard,
    errors: leaderboardErrors,
  } = useQuery(
    props.hideNames ? GET_LEADERBOARD_WITHOUT_NAMES : GET_LEADERBOARD,
    variables,
    !user?.jwt,
    { batch: false }
  );

  const { data: rankData } = useQuery(
    props.hideNames ? GET_RANK_WITHOUT_NAMES : GET_RANK,
    variables,
    !user?.jwt
  );

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
    textValue: rankData?.viewer?.leaderboardRank?.textValue,
    firstName: rankData?.viewer?.firstName,
    lastInitial: rankData?.viewer?.lastInitial,
    rank: rankData?.viewer?.leaderboardRank?.[props.rankType],
    rowNumber: rankData?.viewer?.leaderboardRank?.rowNumber,
  };

  // Show feature enforcement if request was forbidden
  const isEssentials = useMemo(
    () =>
      !!leaderboardErrors?.response?.errors?.find(
        (error) => error?.extensions?.apiError?.statusCode === 403
      ),
    [leaderboardErrors]
  );

  return {
    states: {
      loading: loadingLeaderboard,
      isEssentials,
      hasLeaders: sortedLeaderboard?.length > 0,
      styles: props,
    },
    data: {
      leaderboard: sortedLeaderboard,
      rankType: props.rankType,
      viewerRank: viewingUser,
    },
    elements: {
      empty: props.empty,
    },
  };
}
