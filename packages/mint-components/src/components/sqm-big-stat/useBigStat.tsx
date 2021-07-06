import { gql } from "graphql-request";
import { pathToRegexp } from "path-to-regexp";
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
      query ($programId: ID!) {
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
const programGoalsQuery = (goalId: string) =>
  debugQuery(
    gql`
      query {
        viewer {
          ... on User {
            programGoals {
              goalId
              count
            }
          }
        }
      }
    `,
    { goalId },
    (res) => {
      let count =0;
      const goals = [res.data?.viewer?.programGoals]?.[0];
      goals.forEach((element) => {
        if (element.goalId === goalId) {
          count = element.count;
        }
      });
      return count.toString();
    }
  );

const referralsMonthQuery = (programId: string) =>
  debugQuery(
    gql`
      query ($programId: ID!) {
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
      query ($programId: ID!) {
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
      query ($programId: ID!) {
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
      query ($programId: ID!) {
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
      query ($programId: ID!) {
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
        $programId: ID!
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
        $programId: ID!
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
        $programId: ID!
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

const creditAndIntegrationQuery = (
  programId: string,
  locale: string,
  type: string,
  baseUnit: string,
  unitType?: string,
  format = "prettyValue",
  global = "false"
) => {
  console.log();
  const unit = unitType ? `${baseUnit}/${unitType}` : baseUnit;
  const res = useQuery(
    gql`
      query ($programId: ID, $unit: String!, $locale: RSLocale) {
        fallback: formatRewardPrettyValue(
          value: 0
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )
        viewer: viewer {
          ... on User {
            rewards(
              filter: {
                type_in: [INTEGRATION, CREDIT]
                unit_eq: $unit
                programId_eq: $programId
              }
              limit: 1000
            ) {
              data {
                type
                value
                currency
              }
            }
          }
        }
      }
    `,
    {
      programId: global === "false" ? programId : null,
      // type,
      unit,
      // format: parseRewardValueFormat[format] ?? "UNIT_FORMATTED",
      locale,
    }
    // (res) => {

    //   return res.data;
    // }
  );

  const arr = res.data?.viewer?.rewards?.data;
  const fallback = res?.data?.fallback;
  console.log({ res, unit, arr, unitType });
  const giftcardAgg =
    arr?.length &&
    arr?.reduce(
      (sum, giftcard) =>
        giftcard.currency === unitType || unit ? (sum += giftcard.value) : sum,
      0
    );

  const currencyRewards = giftcardAgg;
  console.log("the goods", currencyRewards);

  return currencyRewards?.toString() || fallback;
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
  creditAndIntegrationBalance: {
    label: "Balance - Credit and Gift Cards Earned",
    query: creditAndIntegrationQuery,
  },
  programGoals: {
    label: "Program Goals",
    query: programGoalsQuery,
  },
};

// this should be exposed in documentation somehow
export const StatPaths = [
  "/(programGoals)/:goalId",
  "/(referralsCount)",
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

export const StatPatterns = StatPaths.map((pattern) => pathToRegexp(pattern));

export function parsePath(type: string): string[] | undefined {
  const re = useMemo(() => StatPatterns.find((re) => re.test(type)), [type]);
  return re?.exec(type).slice(1);
}

export function useBigStat({ statType }: BigStat) {
  const programId = useProgramId();
  const locale = useLocale();
  const userIdent = useUserIdentity();
  debug({ programId, statType });
  const re = useMemo(
    () => StatPatterns.find((re) => re.test(statType)),
    [statType]
  );
  if (re === undefined) {
    return { label: "BAD TYPE PROP", props: { statvalue: "!!!" } };
  }
  const [queryName, ...queryArgs] = re.exec(statType).slice(1);

  const label = queries[queryName].label;

  const stat =
    userIdent?.jwt && queries[queryName].query(programId, locale, ...queryArgs);
  debug("stat:", stat);
  return { label, props: { statvalue: stat ?? LOADING } };
}

export type BigStatHook = {
  props: BigStatViewProps;
  label: string;
};
