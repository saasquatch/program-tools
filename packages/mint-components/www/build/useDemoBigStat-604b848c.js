import { d as browser, k as useMemo } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { a as sn, d as dist, M, A as An, i as ie } from './index.module-b74a7f69.js';
import { p as pathToRegexp } from './index-eccbb333.js';

const debug = browser("sq:useBigStat");
const LOADING = "...";
const debugQuery = (query, variables, getStat) => {
  const res = sn(query, variables);
  if (!(res === null || res === void 0 ? void 0 : res.data) && !res.loading) {
    console.error("issue getting stat:", res);
  }
  const stat = getStat(res);
  return { ...stat, loading: res.loading };
};
const referralsCountQuery = (programId, 
// locale
_, status) => {
  const programFilter = programId === "classic"
    ? { programId_exists: false }
    : { programId_eq: programId };
  const convertedFilter = status && status == "converted"
    ? { dateConverted_exists: true }
    : status && status == "started"
      ? { dateConverted_exists: false }
      : {};
  const queryFilter = { ...programFilter, ...convertedFilter };
  return debugQuery(dist.gql `
      query ($queryFilter: ReferralFilterInput) {
        viewer {
          ... on User {
            referrals(filter: $queryFilter) {
              totalCount
            }
          }
        }
      }
    `, { queryFilter }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.referrals) === null || _c === void 0 ? void 0 : _c.totalCount,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.referrals) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const programGoalsQuery = (programId, locale, metricType, goalId) => {
  // Confirm this behaviour
  if (programId === "classic")
    return null;
  return debugQuery(dist.gql `
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
    `, { programId, metricType, goalId, locale }, (res) => {
    var _a, _b, _c, _d, _e, _f;
    const goal = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.programGoals) === null || _c === void 0 ? void 0 : _c.filter((goal) => goal.goalId === goalId && goal.programId === programId);
    return {
      value: ((_d = goal === null || goal === void 0 ? void 0 : goal[0]) === null || _d === void 0 ? void 0 : _d[metricType]) || 0,
      statvalue: ((_f = (_e = goal === null || goal === void 0 ? void 0 : goal[0]) === null || _e === void 0 ? void 0 : _e[metricType]) === null || _f === void 0 ? void 0 : _f.toString()) || 0,
    };
  });
};
const customFieldsQuery = (programId, locale, fieldName, goalId) => {
  // Confirm this behaviour
  if (programId === "classic")
    return null;
  return debugQuery(dist.gql `
      query {
        viewer {
          ... on User {
            customFields
          }
        }
      }
    `, { programId, fieldName, goalId, locale }, (res) => {
    var _a, _b, _c;
    const customField = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.customFields) === null || _c === void 0 ? void 0 : _c[fieldName];
    return {
      value: customField || 0,
      statvalue: (customField === null || customField === void 0 ? void 0 : customField.toString()) || "0",
    };
  });
};
const referralsMonthQuery = (programId) => {
  const programFilter = programId === "classic"
    ? { programId_exists: false }
    : { programId_eq: programId };
  const filter = {
    ...programFilter,
    dateReferralStarted_timeframe: "this_month",
  };
  return debugQuery(dist.gql `
      query ($filter: ReferralFilterInput) {
        viewer {
          ... on User {
            referrals(filter: $filter) {
              totalCount
            }
          }
        }
      }
    `, { filter }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.referrals) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.referrals) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const referralsWeekQuery = (programId) => {
  const programFilter = programId === "classic"
    ? { programId_exists: false }
    : { programId_eq: programId };
  const filter = {
    ...programFilter,
    dateReferralStarted_timeframe: "this_month",
  };
  return debugQuery(dist.gql `
      query ($filter: ReferralFilterInput) {
        viewer {
          ... on User {
            referrals(filter: $filter) {
              totalCount
            }
          }
        }
      }
    `, { filter }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.referrals) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.referrals) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const rewardsCountQuery = (programId, 
// locale
_, global = "") => {
  return debugQuery(dist.gql `
      query ($programId: ID) {
        viewer {
          ... on User {
            rewards(filter: { programId_eq: $programId }) {
              totalCount
            }
          }
        }
      }
    `, {
    programId: !global && programId !== "classic" ? programId : null,
  }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewards) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.rewards) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const rewardsCountFilteredQuery = (programId, 
// locale
_, type, unit, status, global = "") => {
  const statusFilter = status ? { status } : null;
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
    unit,
    type,
    statusFilter,
  }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewards) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.rewards) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const integrationRewardsCountFilteredQuery = (programId, 
// locale
_, status, global = "") => {
  const statusFilter = status ? { status } : null;
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
    statusFilter,
  }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewards) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.rewards) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const rewardsMonthQuery = (programId, 
// locale
_, global = "") => {
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
  }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewards) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.rewards) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const rewardsWeekQuery = (programId, 
// locale
_, global = "") => {
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
  }, (res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
      value: ((_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewards) === null || _c === void 0 ? void 0 : _c.totalCount) || 0,
      statvalue: (_g = (_f = (_e = (_d = res.data) === null || _d === void 0 ? void 0 : _d.viewer) === null || _e === void 0 ? void 0 : _e.rewards) === null || _f === void 0 ? void 0 : _f.totalCount) === null || _g === void 0 ? void 0 : _g.toString(),
    });
  });
};
const rewardsRedeemedQuery = (programId, locale, type, unit, global = "") => {
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
    type,
    unit,
    locale,
  }, (res) => {
    var _a, _b, _c, _d, _e;
    const arr = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewardBalanceDetails;
    const fallback = (_c = res.data) === null || _c === void 0 ? void 0 : _c.fallback;
    return {
      value: ((_d = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _d === void 0 ? void 0 : _d.prettyRedeemedCredit) || 0,
      statvalue: ((_e = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _e === void 0 ? void 0 : _e.prettyRedeemedCredit) || fallback,
    };
  });
};
const rewardsAssignedQuery = (programId, locale, type, unit, global = "") => {
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
    type,
    unit,
    locale,
  }, (res) => {
    var _a, _b, _c, _d, _e;
    const arr = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewardBalanceDetails;
    const fallback = (_c = res.data) === null || _c === void 0 ? void 0 : _c.fallback;
    return {
      value: ((_d = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _d === void 0 ? void 0 : _d.prettyAssignedCredit) || 0,
      statvalue: ((_e = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _e === void 0 ? void 0 : _e.prettyAssignedCredit) || fallback,
    };
  });
};
const rewardsAvailableQuery = (programId, locale, type, unit, global = "") => {
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
    type,
    unit,
    locale,
  }, (res) => {
    var _a, _b, _c, _d, _e;
    const arr = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewardBalanceDetails;
    const fallback = (_c = res.data) === null || _c === void 0 ? void 0 : _c.fallback;
    return {
      value: ((_d = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _d === void 0 ? void 0 : _d.prettyAvailableValue) || 0,
      statvalue: ((_e = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _e === void 0 ? void 0 : _e.prettyAvailableValue) || fallback,
    };
  });
};
const parseRewardValueFormat = {
  prettyValue: "UNIT_FORMATTED",
  value: "NUMBER_UNFORMATTED",
};
const rewardsBalanceQuery = (programId, locale, type, unit, format = "prettyValue", global = "") => {
  var _a;
  return debugQuery(dist.gql `
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
    `, {
    programId: !global && programId !== "classic" ? programId : null,
    type,
    unit,
    format: (_a = parseRewardValueFormat[format]) !== null && _a !== void 0 ? _a : "UNIT_FORMATTED",
    locale,
  }, (res) => {
    var _a, _b, _c, _d, _e;
    const arr = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.rewardBalanceDetails;
    const fallback = (_c = res.data) === null || _c === void 0 ? void 0 : _c.fallback;
    return {
      value: ((_d = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _d === void 0 ? void 0 : _d.prettyAvailableValue) || 0,
      statvalue: ((_e = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _e === void 0 ? void 0 : _e.prettyAvailableValue) || fallback,
    };
  });
};
// functions are of the form (programId: string, ...args: string) => string
const queries = {
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
};
// this should be exposed in documentation somehow
const StatPaths = [
  { name: "programGoals", route: "/(programGoals)/:metricType/:goalId" },
  { name: "customFields", route: "/(customFields)/:customField" },
  { name: "referralsCount", route: "/(referralsCount)/:status?" },
  { name: "referralsMonth", route: "/(referralsMonth)" },
  { name: "referralsWeek", route: "/(referralsWeek)" },
  { name: "rewardsCount", route: "/(rewardsCount)/:global?" },
  { name: "rewardsMonth", route: "/(rewardsMonth)/:global?" },
  { name: "rewardsWeek", route: "/(rewardsWeek)/:global?" },
  {
    name: "rewardsCountFiltered",
    route: "/(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?",
  },
  {
    name: "integrationRewardsCountFiltered",
    route: "/(integrationRewardsCountFiltered)/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?",
  },
  {
    name: "rewardsAssigned",
    route: "/(rewardsAssigned)/:statType/:unit/:global?",
  },
  {
    name: "rewardsRedeemed",
    route: "/(rewardsRedeemed)/:statType/:unit/:global?",
  },
  {
    name: "rewardsAvailable",
    route: "/(rewardsAvailable)/:statType/:unit/:global?",
  },
  {
    name: "rewardBalance",
    route: "/(rewardBalance)/:statType/:unit/:format([prettyValue|value]*)?/:global?",
  },
];
const StatPatterns = StatPaths.map((pattern) => pathToRegexp(pattern.route));
function useBigStat(props) {
  var _a;
  const { statType, flexReverse, alignment, programId = M(), } = props;
  const locale = An();
  const userIdent = ie();
  const re = useMemo(() => StatPatterns.find((re) => re.exec(statType)), [statType]);
  if (!(re === null || re === void 0 ? void 0 : re.exec(statType))) {
    return {
      props: {
        value: 0,
        statvalue: "!!!",
        flexReverse,
        alignment,
        loading: false,
      },
      label: "BAD PROP TYPE",
    };
  }
  const result = re.exec(statType);
  const queryName = result[1];
  const statPath = StatPaths.find((pattern) => pattern.name === queryName);
  // Get a list all possible keys in path
  const keys = [];
  const regex = pathToRegexp(statPath === null || statPath === void 0 ? void 0 : statPath.route, keys, {
    strict: false,
    sensitive: false,
    end: true,
  });
  const allQueryArgs = regex.exec(statType);
  // Retrieve all key values in order including undefined
  const queryArgs = keys.map((_, i) => allQueryArgs[i + 1] ? decodeURIComponent(allQueryArgs[i + 1]) : undefined);
  //  remove query name from list
  queryArgs.shift();
  const label = queries[queryName].label;
  const stat = (userIdent === null || userIdent === void 0 ? void 0 : userIdent.jwt) && queries[queryName].query(programId, locale, ...queryArgs);
  debug("stat:", stat);
  return {
    props: {
      value: stat === null || stat === void 0 ? void 0 : stat.value,
      statvalue: (_a = stat === null || stat === void 0 ? void 0 : stat.statvalue) !== null && _a !== void 0 ? _a : LOADING,
      loading: stat === null || stat === void 0 ? void 0 : stat.loading,
      flexReverse,
      alignment,
    },
    label,
  };
}

function useDemoBigStat(props) {
  const { statType } = props;
  const re = useMemo(() => StatPatterns.find((re) => re.exec(statType)), [statType]);
  if (!(re === null || re === void 0 ? void 0 : re.exec(statType))) {
    return {
      props: {
        value: 0,
        statvalue: "!!!",
        loading: false,
        flexReverse: false,
        alignment: "center",
      },
      label: "BAD PROP TYPE",
    };
  }
  const result = re.exec(statType);
  const queryName = result[1];
  const label = queries[queryName].label;
  return {
    props: cjs({
      statvalue: "12345",
      flexReverse: false,
      alignment: "center",
    }, props.demoData || {}, { arrayMerge: (_, a) => a }),
    label: label !== null && label !== void 0 ? label : "Demo Label",
  };
}

export { useBigStat as a, useDemoBigStat as u };
