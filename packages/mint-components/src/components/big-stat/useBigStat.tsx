import gql from "graphql-tag";
import { pathToRegexp } from "path-to-regexp";
import { useMemo } from "@saasquatch/universal-hooks";
import { useQuery, useProgramId, useLocale } from "@saasquatch/component-boilerplate";
import { QueryData } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import debugFn from "debug";

import { BigStat } from "./big-stat";
import { BigStatViewProps } from "./big-stat-view";

const debug = debugFn("sq:useBigStat");
const LOADING = "...";

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

const referralsCountQuery = (programId: string) =>
  debugQuery(
    gql`
      query($programId: ID!) {
        viewer {
          ... on User {
            referrals(filter: { programId_eq: $programId }) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    (res) => res.data?.viewer?.referrals?.totalCount?.toString()
  );

const referralsMonthQuery = (programId: string) =>
  debugQuery(
    gql`
      query($programId: ID!) {
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
      query($programId: ID!) {
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
      query($programId: ID!) {
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
      query($programId: ID!) {
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
      query($programId: ID!) {
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


const rewardsRedeemedQuery = (programId: string, type: string, unit: string, locale: string) =>
  debugQuery(
    gql`
      query($programId: ID!, $type: RewardType, $unit: String!, $locale: RSLocale) {
        fallback: formatRewardPrettyValue(value: 0, unit: $unit, locale: $locale, formatType: UNIT_FORMATTED)
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
      return arr?.[0]?.prettyReedemedCredit || fallback;
    }
  );

const rewardsAssignedQuery = (programId: string, type: string, unit: string, locale: string) =>
  debugQuery(
    gql`
      query($programId: ID!, $type: RewardType, $unit: String!, $locale: RSLocale) {
        fallback: formatRewardPrettyValue(value: 0, unit: $unit, locale: $locale, formatType: UNIT_FORMATTED)
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

const rewardsAvailableQuery = (programId: string, type: string, unit: string, locale: string) =>
  debugQuery(
    gql`
      query($programId: ID!, $type: RewardType, $unit: String!, $locale: RSLocale) {
        fallback: formatRewardPrettyValue(value: 0, unit: $unit, locale: $locale, formatType: UNIT_FORMATTED)
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

const parseRewardValueFormat = {
  prettyValue: "UNIT_FORMATTED",
  value: "NUMBER_UNFORMATTED",
};
const rewardsBalanceQuery = (
  programId: string,
  type: string,
  unit: string,
  format = "prettyValue",
  global = "false"
) =>
  debugQuery(
    gql`
      query(
        $programId: ID
        $type: RewardType!
        $unit: String!
        $format: RewardValueFormatType!
      ) {
        viewer {
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
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = "TODO";
      return arr?.[0]?.prettyAvailableValue || fallback;
    }
  );

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
};

// this should be exposed in documentation somehow
export const StatPaths = [
  "/(referralsCount)",
  "/(referralsMonth)",
  "/(referralsWeek)",
  "/(rewardsCount)",
  "/(rewardsMonth)",
  "/(rewardsWeek)",
  "/(rewardsAssigned)/:statType/:unit",
  "/(rewardsRedeemed)/:statType/:unit",
  "/(rewardsAvailable)/:statType/:unit",
  "/(rewardBalance)/:statType/:unit/:format?/:global?",
];

export const StatPatterns = StatPaths.map((pattern) => pathToRegexp(pattern));

export function parsePath(type: string): string[] | undefined {
  const re = useMemo(() => StatPatterns.find((re) => re.test(type)), [type]);
  return re?.exec(type).slice(1);
}

export function useBigStat({
  statType,
}: BigStat) {
  const programId = useProgramId();
  const locale = useLocale();
  debug({programId, statType})
  const re = useMemo(() => StatPatterns.find((re) => re.test(statType)), [statType]);
  if (re === undefined) {
    return { label: "BAD TYPE PROP", props: { statvalue: "!!!" } };
  }
  const [queryName, ...queryArgs] = re.exec(statType).slice(1);

  const label = queries[queryName].label;
  const stat = queries[queryName].query(programId, ...queryArgs, locale);

  debug("stat:", stat)
  return { label, props: { statvalue: stat ?? LOADING } };
}

export type BigStatHook = {
  props: BigStatViewProps;
  label: string;
};
