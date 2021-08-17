import { gql } from "graphql-request";
import { match, MatchResult } from "path-to-regexp";
import { useMemo } from "@saasquatch/universal-hooks";
import {
  useQuery,
  useProgramId,
  useUserIdentity,
  useLocale,
} from "@saasquatch/component-boilerplate";
import { QueryData } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import debugFn from "debug";

import { BigStat } from "./sqm-big-stat";
import { BigStatViewProps } from "./sqm-big-stat-view";

const debug = debugFn("sq:useBigStat");
const LOADING = "...";

type Goal = {
  goalId: string;
  programId: string;
  count: number;
  firstDate: number;
  lastDate: number;
  conversionCount: number;
};

const debugQuery = (
  query: Parameters<typeof useQuery>[0],
  variables: unknown,
  getStat: (res: QueryData<any>) => string
) => {
  const res = useQuery(query, variables);
  if (!res?.data && !res.loading) {
    console.error("issue getting stat:", res);
  }
  const stat = getStat(res);
  return stat;
};

const referralsCountQuery = (
  programId: string,
  // locale
  _: string,
  status?: "started" | "converted"
) => {
  const convertedFilter =
    status && status == "converted"
      ? { dateConverted_exists: true }
      : status && status == "started"
      ? { dateConverted_exists: false }
      : {};

  const queryFilter = { programId_eq: programId, ...convertedFilter };

  return debugQuery(
    gql`
      query ($queryFilter: ReferralFilterInput) {
        viewer {
          ... on User {
            referrals(filter: $queryFilter) {
              totalCount
            }
          }
        }
      }
    `,
    { queryFilter },

    (res) => res.data?.viewer?.referrals?.totalCount?.toString()
  );
};

const programGoalsQuery = (
  programId: string,
  locale: string,
  metricType: string,
  goalId: string
) => {
  return debugQuery(
    gql`
      query {
        viewer {
          ... on User {
            programGoals {
              goalId
              programId
              count
              conversionCount
            }
          }
        }
      }
    `,
    { programId, metricType, goalId, locale },
    (res) => {
      const goal = res.data?.viewer?.programGoals?.filter(
        (goal: Goal) => goal.goalId === goalId && goal.programId === programId
      );
      return goal?.[0]?.[metricType]?.toString() || 0;
    }
  );
};

const referralsMonthQuery = (programId: string) =>
  debugQuery(
    gql`
      query ($programId: ID) {
        viewer {
          ... on User {
            referrals(
              filter: {
                programId_eq: $programId
                dateReferralStarted_timeframe: "this_month"
              }
            ) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    (res) => res.data?.viewer?.referrals?.totalCount?.toString()
  );

const referralsWeekQuery = (programId: string) =>
  debugQuery(
    gql`
      query ($programId: ID) {
        viewer {
          ... on User {
            referrals(
              filter: {
                programId_eq: $programId
                dateReferralStarted_timeframe: "this_week"
              }
            ) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    (res) => res.data?.viewer?.referrals?.totalCount?.toString()
  );

const rewardsCountQuery = (programId: string) =>
  debugQuery(
    gql`
      query ($programId: ID) {
        viewer {
          ... on User {
            rewards(filter: { programId_eq: $programId }) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    (res) => res.data?.viewer?.rewards?.totalCount?.toString()
  );

const rewardsMonthQuery = (programId: string) =>
  debugQuery(
    gql`
      query ($programId: ID) {
        viewer {
          ... on User {
            rewards(
              filter: {
                programId_eq: $programId
                dateGiven_timeframe: "this_month"
              }
            ) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    (res) => res.data?.viewer?.rewards?.totalCount?.toString()
  );

const rewardsWeekQuery = (programId: string) =>
  debugQuery(
    gql`
      query ($programId: ID) {
        viewer {
          ... on User {
            rewards(
              filter: {
                programId_eq: $programId
                dateGiven_timeframe: "this_week"
              }
            ) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    (res) => res.data?.viewer?.rewards?.totalCount?.toString()
  );

const rewardsRedeemedQuery = (
  programId: string,
  locale: string,
  type: string,
  baseUnit: string,
  unitType?: string
) => {
  const unit = unitType ? `${baseUnit}/${unitType}` : baseUnit;
  return debugQuery(
    gql`
      query (
        $programId: ID
        $type: RewardType
        $unit: String!
        $locale: RSLocale
      ) {
        fallback: formatRewardPrettyValue(
          value: 0
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )
        viewer: viewer {
          ... on User {
            rewardBalanceDetails(
              programId: $programId
              filter: { type_eq: $type, unit_eq: $unit }
            ) {
              ... on CreditRewardBalance {
                prettyRedeemedCredit
              }
            }
          }
        }
      }
    `,
    { programId, type, unit, locale },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return arr?.[0]?.prettyRedeemedCredit || fallback;
    }
  );
};

const rewardsAssignedQuery = (
  programId: string,
  locale: string,
  type: string,
  baseUnit: string,
  unitType?: string
) => {
  const unit = unitType ? `${baseUnit}/${unitType}` : baseUnit;
  return debugQuery(
    gql`
      query (
        $programId: ID
        $type: RewardType
        $unit: String!
        $locale: RSLocale
      ) {
        fallback: formatRewardPrettyValue(
          value: 0
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )
        viewer: viewer {
          ... on User {
            rewardBalanceDetails(
              programId: $programId
              filter: { type_eq: $type, unit_eq: $unit }
            ) {
              ... on CreditRewardBalance {
                prettyAssignedCredit
              }
            }
          }
        }
      }
    `,
    { programId, type, unit, locale },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return arr?.[0]?.prettyAssignedCredit || fallback;
    }
  );
};

const rewardsAvailableQuery = (
  programId: string,
  locale: string,
  type: string,
  baseUnit: string,
  unitType?: string
) => {
  const unit = unitType ? `${baseUnit}/${unitType}` : baseUnit;
  return debugQuery(
    gql`
      query (
        $programId: ID
        $type: RewardType
        $unit: String!
        $locale: RSLocale
      ) {
        fallback: formatRewardPrettyValue(
          value: 0
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )
        viewer: viewer {
          ... on User {
            rewardBalanceDetails(
              programId: $programId
              filter: { type_eq: $type, unit_eq: $unit }
            ) {
              ... on CreditRewardBalance {
                prettyAvailableValue
              }
            }
          }
        }
      }
    `,
    { programId, type, unit, locale },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return arr?.[0]?.prettyAvailableValue || fallback;
    }
  );
};

const parseRewardValueFormat = {
  prettyValue: "UNIT_FORMATTED",
  value: "NUMBER_UNFORMATTED",
};
const rewardsBalanceQuery = (
  programId: string,
  locale: string,
  type: string,
  baseUnit: string,
  unitType?: string,
  format = "prettyValue",
  global = "false"
) => {
  const unit = unitType ? `${baseUnit}/${unitType}` : baseUnit;
  return debugQuery(
    gql`
      query (
        $programId: ID
        $type: RewardType!
        $unit: String!
        $format: RewardValueFormatType!
        $locale: RSLocale
      ) {
        fallback: formatRewardPrettyValue(
          value: 0
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )
        viewer: viewer {
          ... on User {
            rewardBalanceDetails(
              programId: $programId
              filter: { type_eq: $type, unit_eq: $unit }
            ) {
              ... on CreditRewardBalance {
                prettyAvailableValue(formatType: $format)
              }
            }
          }
        }
      }
    `,
    {
      programId: global === "false" ? programId : null,
      type,
      unit,
      format: parseRewardValueFormat[format] ?? "UNIT_FORMATTED",
      locale,
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return arr?.[0]?.prettyAvailableValue || fallback;
    }
  );
};

// functions are of the form (programId: string, ...args: string) => string
const queries: {
  [key: string]: {
    label: string;
    query: (programId: string, ...args: string[]) => string;
  };
} = {
  rewardsAssigned: {
    label: "Rewards Earned",
    query: rewardsAssignedQuery,
  },
  rewardsRedeemed: {
    label: "Rewards Paid",
    query: rewardsRedeemedQuery,
  },
  rewardsAvailable: {
    label: "Rewards Available",
    query: rewardsAvailableQuery,
  },
  referralsCount: {
    label: "Referrals - Count",
    query: referralsCountQuery,
  },
  referralsMonth: {
    label: "Referrals - This Month",
    query: referralsMonthQuery,
  },
  referralsWeek: {
    label: "Referrals - This Week",
    query: referralsWeekQuery,
  },
  rewardsCount: {
    label: "Rewards - Count",
    query: rewardsCountQuery,
  },
  rewardsMonth: {
    label: "Rewards - This Month",
    query: rewardsMonthQuery,
  },
  rewardsWeek: {
    label: "Rewards - This Week",
    query: rewardsWeekQuery,
  },
  rewardBalance: {
    label: "Balance - Credit Earned",
    query: rewardsBalanceQuery,
  },
  programGoals: {
    label: "Program Goals",
    query: programGoalsQuery,
  },
};

// this should be exposed in documentation somehow
export const StatPaths = [
  "/(programGoals)/:metricType/:goalId",
  "/(referralsCount)/:status?",
  "/(referralsMonth)",
  "/(referralsWeek)",
  "/(rewardsCount)",
  "/(rewardsMonth)",
  "/(rewardsWeek)",
  "/(rewardsAssigned)/:statType/:unit/:valueType?",
  "/(rewardsRedeemed)/:statType/:unit/:valueType?",
  "/(rewardsAvailable)/:statType/:unit/:valueType?",
  "/(rewardBalance)/:statType/:unit/:valueType?/:format?/:global?",
  "/(creditAndIntegrationBalance)/:statType/:unit/:valueType?",
];

export const StatPatterns = StatPaths.map((pattern) =>
  match(pattern, { decode: decodeURIComponent })
);

export function parsePath(type: string): string[] | undefined {
  const re = useMemo(() => StatPatterns.find((re) => re(type)), [type]);

  const result = re(type) as MatchResult<object>;

  return Object.values(result.params);
}

export function useBigStat(props: BigStat): BigStatHook {
  const { statType, flexReverse, alignment } = props;
  const programId = useProgramId();

  // fail fast
  if (programId === "classic")
    return {
      props: { statvalue: "!!!", flexReverse, alignment },
      label: "CLASSIC FILTER NOT SUPPORTED",
    };

  const locale = useLocale();
  const userIdent = useUserIdentity();
  const re = useMemo(() => StatPatterns.find((re) => re(statType)), [statType]);

  if (re === undefined) {
    return {
      props: { statvalue: "!!!", flexReverse, alignment },
      label: "BAD PROP TYPE",
    };
  }

  const result = re(statType) as MatchResult<object>;
  const [queryName, ...queryArgs] = Object.values(result.params);

  const label = queries[queryName].label;

  const stat =
    userIdent?.jwt && queries[queryName].query(programId, locale, ...queryArgs);
  debug("stat:", stat);
  return {
    props: { statvalue: stat ?? LOADING, flexReverse, alignment },
    label,
  };
}

export type BigStatHook = {
  props: BigStatViewProps;
  label: string;
};
