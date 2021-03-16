import { BigStat } from './big-stat';
import { pathToRegexp } from 'path-to-regexp';
import { useMemo } from '@saasquatch/universal-hooks';
import { useQuery } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { QueryData } from '@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery';

const LOADING = '...';

const debugQuery = (query: Parameters<typeof useQuery>[0], variables: unknown, getStat: (res: QueryData<any>) => string) => {
  const res = useQuery(query, variables);
  if (!res?.data && !res.loading) {
    console.log('issue getting stat:', res?.data);
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
            referrals(limit: 1, offset: 0, filter: { programId_eq: $programId }) {
              totalCount
            }
          }
        }
      }
    `,
    { programId },
    res => res.data?.viewer?.referrals?.totalCount?.toString(),
  );

const rewardsRedeemedQuery = (programId: string, type: string, unit: string) =>
  debugQuery(
    gql`
      query($programId: ID!, $type: RewardType, $unit: String!) {
        viewer {
          ... on User {
            rewardBalanceDetails(programId: $programId, filter: { type_eq: $type, unit_eq: $unit }) {
              ... on CreditRewardBalance {
                prettyRedeemedCredit
              }
            }
          }
        }
      }
    `,
    { programId, type, unit },
    res => res.data?.viewer?.rewardBalanceDetails?.[0]?.prettyRedeemedCredit,
  );

const rewardsAssignedQuery = (programId: string, type: string, unit: string) =>
  debugQuery(
    gql`
      query($programId: ID!, $type: RewardType, $unit: String!) {
        viewer {
          ... on User {
            rewardBalanceDetails(programId: $programId, filter: { type_eq: $type, unit_eq: $unit }) {
              ... on CreditRewardBalance {
                prettyAssignedCredit
              }
            }
          }
        }
      }
    `,
    { programId, type, unit },
    res => res.data?.viewer?.rewardBalanceDetails?.[0]?.prettyAssignedCredit,
  );

const rewardsAvailableQuery = (programId: string, type: string, unit: string) =>
  debugQuery(
    gql`
      query($programId: ID!, $type: RewardType, $unit: String!) {
        viewer {
          ... on User {
            rewardBalanceDetails(programId: $programId, filter: { type_eq: $type, unit_eq: $unit }) {
              ... on CreditRewardBalance {
                prettyAvailableValue
              }
            }
          }
        }
      }
    `,
    { programId, type, unit },
    res => res.data?.viewer?.rewardBalanceDetails?.[0]?.prettyAvailableValue,
  );

// functions are of the form (programId: string, ...args: string) => string
const queries: {
  [key: string]: {
    label: string;
    query: (programId: string, ...args: string[]) => string;
  };
} = {
  referralsCount: {
    label: 'Referrals Submitted',
    query: referralsCountQuery,
  },
  rewardsAssigned: {
    label: 'Rewards Earned',
    query: rewardsAssignedQuery,
  },
  rewardsRedeemed: {
    label: 'Rewards Paid',
    query: rewardsRedeemedQuery,
  },
  rewardsAvailable: {
    label: 'Rewards Available',
    query: rewardsAvailableQuery,
  },
};

// this should be exposed in documentation somehow
const patterns = [
  '/(referralsCount)', 
  '/(rewardsAssigned)/:type/:unit', 
  '/(rewardsRedeemed)/:type/:unit',
  '/(rewardsAvailable)/:type/:unit'
].map(pattern => pathToRegexp(pattern));

export function useBigStat({ type, programId }: BigStat & { programId?: string }) {
  const re = useMemo(() => patterns.find(re => re.test(type)), [type]);
  if (re === undefined) {
    return { label: 'BAD TYPE PROP', props: { statvalue: '!!!' } };
  }
  const [queryName, ...queryArgs] = re.exec(type).slice(1);

  const label = queries[queryName].label;
  const stat = queries[queryName].query(programId, ...queryArgs);

  return { label, props: { statvalue: stat ?? LOADING } };
}
