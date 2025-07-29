import {
  useLocale,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { QueryData } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import { useMemo } from "@saasquatch/universal-hooks";
import debugFn from "debug";
import { gql } from "graphql-request";
import { pathToRegexp } from "path-to-regexp";
import { useChildElements } from "../../tables/useChildElements";
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
  getStat: (res: QueryData<any>) => { value: number; statvalue: string }
) => {
  const res = useQuery(query, variables);
  if (!res?.data && !res.loading) {
    console.error("issue getting stat:", res);
  }
  const stat = getStat(res);
  return { ...stat, loading: res.loading };
};

const referralsCountQuery = (
  programId: string,
  // locale
  _: string,
  status?: "started" | "converted"
) => {
  const programFilter =
    programId === "classic"
      ? { programId_exists: false }
      : { programId_eq: programId };

  const convertedFilter =
    status && status == "converted"
      ? { dateConverted_exists: true }
      : status && status == "started"
      ? { dateConverted_exists: false }
      : {};

  const queryFilter = { ...programFilter, ...convertedFilter };

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

    (res) => ({
      value: res.data?.viewer?.referrals?.totalCount || 0,
      statvalue: res.data?.viewer?.referrals?.totalCount?.toString(),
    })
  );
};

const programGoalsQuery = (
  programId: string,
  locale: string,
  metricType: string,
  goalId: string
) => {
  // Confirm this behaviour
  if (programId === "classic") return null;

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
      return {
        value: goal?.[0]?.[metricType] || 0,
        statvalue: goal?.[0]?.[metricType]?.toString() || 0,
      };
    }
  );
};

const customFieldsQuery = (
  _programId: string,
  locale: string,
  fieldName: string,
  goalId: string
) => {
  return debugQuery(
    gql`
      query {
        viewer {
          ... on User {
            customFields
          }
        }
      }
    `,
    { fieldName, goalId, locale },
    (res) => {
      const customField = res.data?.viewer?.customFields?.[fieldName];
      return {
        value: customField || 0,
        statvalue: customField?.toString() || "0",
      };
    }
  );
};

const referralsMonthQuery = (
  programId: string,
  status?: "started" | "converted"
) => {
  const programFilter =
    programId === "classic"
      ? { programId_exists: false }
      : { programId_eq: programId };

  const convertedFilter =
    status && status == "converted"
      ? { dateConverted_exists: true }
      : status && status == "started"
      ? { dateConverted_exists: false }
      : {};

  const filter = {
    ...programFilter,
    ...convertedFilter,
    dateReferralStarted_timeframe: "this_month",
  };

  return debugQuery(
    gql`
      query ($filter: ReferralFilterInput) {
        viewer {
          ... on User {
            referrals(filter: $filter) {
              totalCount
            }
          }
        }
      }
    `,
    { filter },
    (res) => ({
      value: res.data?.viewer?.referrals?.totalCount || 0,
      statvalue: res.data?.viewer?.referrals?.totalCount?.toString(),
    })
  );
};

const referralsWeekQuery = (programId: string) => {
  const programFilter =
    programId === "classic"
      ? { programId_exists: false }
      : { programId_eq: programId };

  const filter = {
    ...programFilter,
    dateReferralStarted_timeframe: "this_week",
  };
  return debugQuery(
    gql`
      query ($filter: ReferralFilterInput) {
        viewer {
          ... on User {
            referrals(filter: $filter) {
              totalCount
            }
          }
        }
      }
    `,
    { filter },
    (res) => ({
      value: res.data?.viewer?.referrals?.totalCount || 0,
      statvalue: res.data?.viewer?.referrals?.totalCount?.toString(),
    })
  );
};

const rewardsCountQuery = (
  programId: string,
  // locale
  _: string,
  global = ""
) => {
  return debugQuery(
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
    {
      programId: !global && programId !== "classic" ? programId : null,
    },
    (res) => ({
      value: res.data?.viewer?.rewards?.totalCount || 0,
      statvalue: res.data?.viewer?.rewards?.totalCount?.toString(),
    })
  );
};

const rewardsCountFilteredQuery = (
  programId: string,
  // locale
  _: string,
  type?: string,
  unit?: string,
  status?: string,
  global = ""
) => {
  const statusFilter = status ? { status } : null;

  return debugQuery(
    gql`
      query (
        $programId: ID
        $unit: String
        $type: RewardType
        $statusFilter: RewardStatusFilterInput
      ) {
        viewer {
          ... on User {
            rewards(
              filter: {
                programId_eq: $programId
                type_eq: $type
                unit_eq: $unit
                statuses_eq: $statusFilter
              }
            ) {
              totalCount
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      unit,
      type,
      statusFilter,
    },
    (res) => ({
      value: res.data?.viewer?.rewards?.totalCount || 0,
      statvalue: res.data?.viewer?.rewards?.totalCount?.toString(),
    })
  );
};

const integrationRewardsCountFilteredQuery = (
  programId: string,
  // locale
  _: string,
  status?: string,
  global = ""
) => {
  const statusFilter = status ? { status } : null;

  return debugQuery(
    gql`
      query ($programId: ID, $statusFilter: RewardStatusFilterInput) {
        viewer {
          ... on User {
            rewards(
              filter: {
                programId_eq: $programId
                type_eq: INTEGRATION
                statuses_eq: $statusFilter
              }
            ) {
              totalCount
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      statusFilter,
    },
    (res) => ({
      value: res.data?.viewer?.rewards?.totalCount || 0,
      statvalue: res.data?.viewer?.rewards?.totalCount?.toString(),
    })
  );
};

const rewardsMonthQuery = (
  programId: string,
  // locale
  _: string,
  global = ""
) => {
  return debugQuery(
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
    {
      programId: !global && programId !== "classic" ? programId : null,
    },
    (res) => ({
      value: res.data?.viewer?.rewards?.totalCount || 0,
      statvalue: res.data?.viewer?.rewards?.totalCount?.toString(),
    })
  );
};

const rewardsWeekQuery = (
  programId: string,
  // locale
  _: string,
  global = ""
) => {
  return debugQuery(
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
    {
      programId: !global && programId !== "classic" ? programId : null,
    },
    (res) => ({
      value: res.data?.viewer?.rewards?.totalCount || 0,
      statvalue: res.data?.viewer?.rewards?.totalCount?.toString(),
    })
  );
};

const rewardsPendingQuery = (
  programId: string,
  locale: string,
  type: string,
  unit: string,
  global = ""
) => {
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
              locale: $locale
            ) {
              ... on CreditRewardBalance {
                prettyPendingCredit
              }
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      type,
      unit,
      locale,
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return {
        value: arr?.[0]?.prettyPendingCredit || 0,
        statvalue: arr?.[0]?.prettyPendingCredit || fallback,
      };
    }
  );
};

const rewardsRedeemedQuery = (
  programId: string,
  locale: string,
  type: string,
  unit: string,
  global = ""
) => {
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
              locale: $locale
            ) {
              ... on CreditRewardBalance {
                prettyRedeemedCredit
              }
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      type,
      unit,
      locale,
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return {
        value: arr?.[0]?.prettyRedeemedCredit || 0,
        statvalue: arr?.[0]?.prettyRedeemedCredit || fallback,
      };
    }
  );
};

const rewardsRedeemedWeekQuery = (
  programId: string,
  locale: string,
  type: string,
  unit: string,
  global = ""
) => {
  return debugQuery(
    gql`
      query ($programId: ID, $type: RewardType, $unit: String!) {
        viewer: viewer {
          ... on User {
            rewards(
              limit: 1000
              filter: {
                programId_eq: $programId
                type_eq: $type
                unit_eq: $unit
                dateRedeemed_timeframe: "this_week"
              }
            ) {
              data {
                redeemedCredit
              }
              totalCount
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      type,
      unit,
    },
    (res) => {
      const rewardData = res.data?.viewer?.rewards?.data;
      const fallback = 0;
      const redeemedTotal = rewardData?.reduce(
        (total, reward) => (total += reward.redeemedCredit),
        fallback
      );

      if (redeemedTotal !== undefined) {
        const query = `query formatRewardPrettyValue(
          $value: Int!
          $unit: String!
          $locale: RSLocale
        ) {
          formatRewardPrettyValue(
          value: $value
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )}`;

        const result = useQuery(query, {
          value: redeemedTotal,
          unit,
          locale,
        });
        return {
          value: redeemedTotal || fallback,
          statvalue: result?.data?.formatRewardPrettyValue,
        };
      }

      return {
        value: fallback,
        statvalue: "...",
      };
    }
  );
};

const rewardsRedeemedMonthQuery = (
  programId: string,
  locale: string,
  type: string,
  unit: string,
  global = ""
) => {
  return debugQuery(
    gql`
      query ($programId: ID, $type: RewardType, $unit: String!) {
        viewer: viewer {
          ... on User {
            rewards(
              limit: 1000
              filter: {
                programId_eq: $programId
                type_eq: $type
                unit_eq: $unit
                dateRedeemed_timeframe: "this_month"
              }
            ) {
              data {
                redeemedCredit
              }
              totalCount
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      type,
      unit,
    },
    (res) => {
      const rewardData = res.data?.viewer?.rewards?.data;
      const fallback = 0;
      const redeemedTotal = rewardData?.reduce(
        (total, reward) => (total += reward.redeemedCredit),
        fallback
      );

      if (redeemedTotal !== undefined) {
        const query = `query formatRewardPrettyValue(
          $value: Int!
          $unit: String!
          $locale: RSLocale
        ) {
          formatRewardPrettyValue(
          value: $value
          unit: $unit
          locale: $locale
          formatType: UNIT_FORMATTED
        )}`;

        const result = useQuery(query, {
          value: redeemedTotal,
          unit,
          locale,
        });
        return {
          value: redeemedTotal || fallback,
          statvalue: result?.data?.formatRewardPrettyValue,
        };
      }

      return {
        value: fallback,
        statvalue: "...",
      };
    }
  );
};

const rewardsAssignedQuery = (
  programId: string,
  locale: string,
  type: string,
  unit: string,
  global = ""
) => {
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
              locale: $locale
            ) {
              ... on CreditRewardBalance {
                prettyAssignedCredit
              }
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      type,
      unit,
      locale,
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return {
        value: arr?.[0]?.prettyAssignedCredit || 0,
        statvalue: arr?.[0]?.prettyAssignedCredit || fallback,
      };
    }
  );
};

const rewardsAvailableQuery = (
  programId: string,
  locale: string,
  type: string,
  unit: string,
  global = ""
) => {
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
              locale: $locale
            ) {
              ... on CreditRewardBalance {
                prettyAvailableValue
              }
            }
          }
        }
      }
    `,
    {
      programId: !global && programId !== "classic" ? programId : null,
      type,
      unit,
      locale,
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return {
        value: arr?.[0]?.prettyAvailableValue || 0,
        statvalue: arr?.[0]?.prettyAvailableValue || fallback,
      };
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
  unit: string,
  format = "prettyValue",
  global = ""
) => {
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
          formatType: $format
        )
        viewer: viewer {
          ... on User {
            rewardBalanceDetails(
              programId: $programId
              filter: { type_eq: $type, unit_eq: $unit }
              locale: $locale
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
      programId: !global && programId !== "classic" ? programId : null,

      type,
      unit,
      format: parseRewardValueFormat[format] ?? "UNIT_FORMATTED",
      locale,
    },
    (res) => {
      const arr = res.data?.viewer?.rewardBalanceDetails;
      const fallback = res.data?.fallback;
      return {
        value: arr?.[0]?.prettyAvailableValue || 0,
        statvalue: arr?.[0]?.prettyAvailableValue || fallback,
      };
    }
  );
};

const trafficQuery = () => {
  return debugQuery(
    gql`
      query traffic {
        viewer: viewer {
          ... on User {
            stats {
              traffic
            }
          }
        }
      }
    `,
    {},
    (res) => {
      const traffic = res.data?.viewer?.stats?.traffic;
      const fallback = 0;

      return {
        value: traffic || fallback,
        statvalue: traffic || fallback,
      };
    }
  );
};

const userStatsQuery = (_programId, _locale, statId) => {
  const statArg = {
    [statId]: true,
  };
  const variables = {
    traffic: false,
    referrals: false,
    conversions: false,
    goals: false,
    rewards: false,
    widgetLoads: false,
    revenue: false,
    generatedRevenue: false,
    referredRevenue: false,
    ...statArg,
  };

  return debugQuery(
    gql`
      query userStat(
        $traffic: Boolean!
        $referrals: Boolean!
        $conversions: Boolean!
        $goals: Boolean!
        $rewards: Boolean!
        $widgetLoads: Boolean!
        $revenue: Boolean!
        $generatedRevenue: Boolean!
        $referredRevenue: Boolean!
      ) {
        viewer: viewer {
          ... on User {
            stats {
              traffic @include(if: $traffic)
              referrals @include(if: $referrals)
              conversions @include(if: $conversions)
              goals @include(if: $goals)
              rewards @include(if: $rewards)
              widgetLoads @include(if: $widgetLoads)
              revenue @include(if: $revenue)
              generatedRevenue @include(if: $generatedRevenue)
              referredRevenue @include(if: $referredRevenue)
            }
          }
        }
      }
    `,
    { ...variables },
    (res) => {
      const stat = res.data?.viewer?.stats?.[statId];
      const fallback = 0;

      return {
        value: stat || fallback,
        statvalue: stat || fallback,
      };
    }
  );
};

const payoutBalanceQuery = () => {
  return debugQuery(
    gql`
      query payoutBalance {
        viewer: viewer {
          ... on User {
            id
            impactConnection {
              publisher {
                payoutsAccount {
                  balance
                }
              }
            }
          }
        }
      }
    `,
    {},
    (res) => {
      const fallback = 0;
      const balance = res.data?.viewer?.publisher?.payoutsAccount?.balance;

      const balanceText = `${balance || fallback}`;
      return {
        value: balance || fallback,
        statvalue: balanceText,
      };
    }
  );
};
// functions are of the form (programId: string, ...args: string) => string
export const queries: {
  [key: string]: {
    label: string;
    query: (
      programId: string,
      ...args: string[]
    ) => { value: number; statvalue: string; loading: boolean };
  };
} = {
  rewardsAssigned: {
    label: "Rewards Earned",
    query: rewardsAssignedQuery,
  },
  rewardsPending: {
    label: "Rewards Pending",
    query: rewardsPendingQuery,
  },
  rewardsRedeemed: {
    label: "Rewards Paid",
    query: rewardsRedeemedQuery,
  },
  rewardsRedeemedMonth: {
    label: "Rewards Paid - This Month",
    query: rewardsRedeemedMonthQuery,
  },
  rewardsRedeemedWeek: {
    label: "Rewards Paid - This Week",
    query: rewardsRedeemedWeekQuery,
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
    label: "Rewards",
    query: rewardsCountQuery,
  },
  rewardsCountFiltered: {
    label: "Rewards",
    query: rewardsCountFilteredQuery,
  },
  integrationRewardsCountFiltered: {
    label: "Rewards",
    query: integrationRewardsCountFilteredQuery,
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
  customFields: {
    label: "Custom Fields",
    query: customFieldsQuery,
  },
  traffic: {
    label: "Traffic",
    query: trafficQuery,
  },
  userStats: {
    label: "User Stat",
    query: userStatsQuery,
  },
  payoutBalance: {
    label: "Payout Balance",
    query: payoutBalanceQuery,
  },
};

// TODO: Add rewardsExpired and rewardsCancelled
// this should be exposed in documentation somehow
export const StatPaths = [
  { name: "programGoals", route: "/(programGoals)/:metricType/:goalId" },
  { name: "customFields", route: "/(customFields)/:customField" },
  { name: "referralsCount", route: "/(referralsCount)/:status?" },
  { name: "referralsMonth", route: "/(referralsMonth)/:status?" }, // TODO: Add status
  { name: "referralsWeek", route: "/(referralsWeek)/:status?" }, // TODO: Add status
  { name: "rewardsCount", route: "/(rewardsCount)/:global?" },
  { name: "rewardsMonth", route: "/(rewardsMonth)/:global?" },
  { name: "rewardsWeek", route: "/(rewardsWeek)/:global?" },
  {
    name: "rewardsCountFiltered",
    route:
      "/(rewardsCountFiltered)/:statType([FUELTANK|INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?",
  },
  {
    name: "integrationRewardsCountFiltered",
    route:
      "/(integrationRewardsCountFiltered)/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?",
  },
  {
    name: "rewardsAssigned",
    route: "/(rewardsAssigned)/:statType/:unit/:global?",
  },
  {
    name: "rewardsPending",
    route: "/(rewardsPending)/:statType/:unit/:global?",
  },
  {
    name: "rewardsRedeemed",
    route: "/(rewardsRedeemed)/:statType/:unit/:global?",
  },
  {
    name: "rewardsRedeemedWeek",
    route: "/(rewardsRedeemedWeek)/:statType/:unit/:global?",
  },
  {
    name: "rewardsRedeemedMonth",
    route: "/(rewardsRedeemedMonth)/:statType/:unit/:global?",
  },
  {
    name: "rewardsAvailable",
    route: "/(rewardsAvailable)/:statType/:unit/:global?",
  },
  {
    name: "rewardBalance",
    route:
      "/(rewardBalance)/:statType/:unit/:format([prettyValue|value]*)?/:global?",
  },
  {
    name: "traffic",
    route: "/(traffic)",
  },
  {
    name: "userStats",
    route: "/(userStats)/:statId",
  },
  {
    name: "payoutBalance",
    route: "/(payoutBalance)",
  },
];

export const StatPatterns = StatPaths.map((pattern) =>
  pathToRegexp(pattern.route)
);

export function useBigStat(props: BigStat): BigStatHook {
  const {
    statType,
    flexReverse,
    alignment,
    programId = useProgramId(),
  } = props;

  // triggers a re-render if the label is manually changed
  useChildElements();

  const locale = useLocale();
  const userIdent = useUserIdentity();
  const re = useMemo(
    () => StatPatterns.find((re) => re.exec(statType)),
    [statType]
  );

  if (!re?.exec(statType)) {
    return {
      props: {
        value: 0,
        statvalue: "-",
        flexReverse,
        alignment,
        loading: false,
        statTextColor: props.statTextColor,
        statFontSize: props.statFontSize,
        descriptionTextColor: props.descriptionTextColor,
        descriptionFontSize: props.descriptionFontSize,
        statFontWeight: props.statFontWeight,
      },
      label: "BAD PROP TYPE",
    };
  }

  const result = re.exec(statType);
  const queryName = result[1];

  const statPath = StatPaths.find((pattern) => pattern.name === queryName);

  // Get a list all possible keys in path
  const keys = [];
  const regex = pathToRegexp(statPath?.route, keys, {
    strict: false,
    sensitive: false,
    end: true,
  });

  const allQueryArgs = regex.exec(statType) as RegExpExecArray;

  // Retrieve all key values in order including undefined
  const queryArgs = keys.map((_, i) =>
    allQueryArgs[i + 1] ? decodeURIComponent(allQueryArgs[i + 1]) : undefined
  );
  //  remove query name from list
  queryArgs.shift();

  const label = queries[queryName].label;

  const stat =
    userIdent?.jwt && queries[queryName].query(programId, locale, ...queryArgs);
  debug("stat:", stat);
  return {
    props: {
      value: stat?.value,
      statvalue: stat?.statvalue ?? LOADING,
      loading: stat?.loading,
      flexReverse,
      alignment,
      statTextColor: props.statTextColor,
      statFontSize: props.statFontSize,
      descriptionTextColor: props.descriptionTextColor,
      descriptionFontSize: props.descriptionFontSize,
      statFontWeight: props.statFontWeight,
    },
    label,
  };
}

export type BigStatHook = {
  props: BigStatViewProps;
  label: string;
};
