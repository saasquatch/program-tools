import pathToRegexp from "path-to-regexp";
import gql from "graphql-tag";
import { ApolloQueryResult } from "apollo-client/core/types";
import { widgetIdent, apolloClient } from "./WidgetHost";

interface _Stat {

  // A graphql partial query string (not really a true GraphQL fragment)
  fragment(variables: any): _GraphQLFragment

  // The level of the fragment
  level?: _FragmentLevel

  // Extracts a value from the GraphQL response
  value(response: ApolloQueryResult<any>, variables: any): number

  // The value to show when a widget is faked
  demoValue(variables: any): number
}

type NumberMap = { [key: string]: number };
type _GraphQLFragment = string;
type _FragmentLevel = "user" | "root";

const ReferralQuery = (name: string, extraFilter?: string) => `
    ${name}: referrals(filter: 
      {
        programId_eq: $programId
        ${extraFilter || ""}
      }) {
      totalCount
    }
  `

const RewardsQuery = (name: string, extraFilter?: string) => `
    ${name}: rewards(filter: 
      {
        programId_eq: $programId
        ${extraFilter || ""}
      }) {
      totalCount
    }
  `

const STATS: {
  [key: string]: _Stat
} = {
  "/rewardBalance/:type/:unit/:valuetype?": {
    fragment: (_) => `rewardBalances(programId: $programId)`,
    value: (resp, { type, unit, valuetype }) => {
      const newUnit = unit.replace(/_/, "/")
      const rewardBalance = resp.data.user.rewardBalances.find((rb: { type: string; unit: string; }) => rb.type === type && rb.unit === newUnit);
      if (!rewardBalance) return 0;
      if (valuetype) return rewardBalance[valuetype];
      return rewardBalance.value;
    },
    demoValue: (_) => 0
  },
  "/customField/:name": {
    fragment: (_) => `customFields`,
    value: (resp, { name }) => resp.data.user.customFields[name],
    demoValue: (_) => 0
  },

  "/programMetric/:name": {
    fragment: (_) => `customFields`,
    value: (resp, { name }) => resp.data.user.customFields[`${widgetIdent().programId}_${name}`],
    demoValue: (_) => 0
  },

  "/programrule/:name": {
    fragment: (_) => `program(programId:$programId){
      rules
    }`,
    value: (resp, { name }) => resp.data.user.customFields[`${widgetIdent().programId}_${name}`],
    level: "root",
    demoValue: (_) => 0
  },

  /**
   *  Referral Stats
   */
  "/referralsCount": {
    fragment: (_) => ReferralQuery("referralsCount"),
    value: (resp) => resp.data.user.referralsCount.totalCount,
    demoValue: (_) => 0
  },
  "/referralsMonth": {
    fragment: (_) => ReferralQuery("referralsMonth", `dateReferralStarted_timeframe: "this_month"`),
    value: (resp) => resp.data.user.referralsMonth.totalCount,
    demoValue: (_) => 0
  },
  "/referralsWeek": {
    fragment: (_) => ReferralQuery("referralsWeek", `dateReferralStarted_timeframe: "this_week"`),
    value: (resp) => resp.data.user.referralsWeek.totalCount,
    demoValue: (_) => 0
  },

  /**
   *  Reward Stats
   */
  "/rewardsCount": {
    fragment: (_) => RewardsQuery("rewardsCount"),
    value: (resp) => resp.data.user.rewardsCount.totalCount,
    demoValue: (_) => 0
  },
  "/rewardsMonth": {
    fragment: (_) => RewardsQuery("rewardsMonth", `dateGiven_timeframe: "this_month"`),
    value: (resp) => resp.data.user.rewardsMonth.totalCount,
    demoValue: (_) => 0
  },
  "/rewardsWeek": {
    fragment: (_) => RewardsQuery("rewardsWeek", `dateGiven_timeframe: "this_week"`),
    value: (resp) => resp.data.user.rewardsWeek.totalCount,
    demoValue: (_) => 0
  }
};

const statPathRegexp = Object.keys(STATS).map(path => {
  const keys = []
  const regexp = pathToRegexp(path, keys)
  const stat = STATS[path];
  return { regexp, keys, path, stat }
})


async function executeRequest(fragments: {
  user: _GraphQLFragment[],
  root: _GraphQLFragment[]
}) {
  const { userId, accountId, programId } = widgetIdent();

  const variables = {
    userId,
    accountId,
    programId
  };

  const res = await apolloClient().query({
    query: gql`
    query(
      $userId: String!,
      $accountId: String!,
      $programId: ID
    ) {
      user(id: $userId, accountId: $accountId) {
        ${fragments.user}
      }
      ${fragments.root}
    }
    `,
    variables
  });

  return res;
}


function matchStat(name: string): {
  stat: _Stat,
  variables: any
} {

  const match = statPathRegexp.find(stat => stat.regexp.test(name));
  if (!match) throw new Error("Invalid stat" + name);

  const { keys, regexp } = match;
  const res = regexp.exec(name);
  const variables = {};
  keys.forEach((k, i) => variables[k.name] = res[i + 1]);

  return { stat: match.stat, variables };
}


/**
 * Looks up a single stat
 * 
 * Prefer to use the batched method instead
 */
export async function getStat(name: string): Promise<number> {
  return (await getStats([name]))[name]
}

/**
 * Look up a group of stats as a batch GraphQL query
 * 
 * @example getStats(["foo","bar"]) returns {foo:0, bar:120}
 */
export async function getStats(names: string[]): Promise<NumberMap> {

  const fragments = names.reduce((acc,name) => {
    const { stat, variables } = matchStat(name);
    const fragment = stat.fragment(variables);
    
    // Add fragment to accumulated list of fragments
    const level = stat.level || "user";
    const currentFragments = acc[level];
    const newFragments = [...currentFragments, fragment];
    return {
      ...acc,
      [level]:newFragments
    };
  },
    // Default empty list of fragments
    {
      user: [],
      root: []
    }
  )

  // Demo data returned here
  if(widgetId["env"] === "demo")

  // Network happens here
  const batchResponse = await executeRequest(fragments);

  const values = names.reduce((prev, name) => {
    const { stat, variables } = matchStat(name);
    const value = stat.value(batchResponse, variables);
    return {
      ...prev,
      [name]: value
    };
  }, {})

  return values;
}