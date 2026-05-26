import { isDemo, useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { BigStatProps } from './BigStat';

export interface BigStatHookResult {
  value: number;
  statvalue: string;
  loading: boolean;
  label: string;
}

type BigStatRoute =
  | { name: 'referralsCount'; label: string; status?: string }
  | { name: 'referralsMonth'; label: string; status?: string }
  | { name: 'referralsWeek'; label: string; status?: string }
  | { name: 'rewardsCount'; label: string; filter?: string }
  | { name: 'rewardsMonth'; label: string; filter?: string }
  | { name: 'rewardsWeek'; label: string; filter?: string }
  | {
      name: 'rewardsCountFiltered';
      label: string;
      rewardType?: string;
      rewardUnit?: string;
      rewardStatus?: string;
      filter?: string;
    }
  | {
      name: 'integrationRewardsCountFiltered';
      label: string;
      rewardStatus?: string;
      filter?: string;
    }
  | {
      name: 'rewardBalance';
      label: string;
      rewardType?: string;
      rewardUnit?: string;
      valueFormat?: 'prettyValue' | 'value';
      filter?: string;
    }
  | { name: 'customFields'; label: string; fieldName: string }
  | { name: 'programGoals'; label: string; metricType: string; goalId: string };

interface BigStatQueryResult {
  viewer?: {
    referrals?: { totalCount?: number | null } | null;
    rewards?: { totalCount?: number | null } | null;
    customFields?: Record<string, string | number | null> | null;
    programGoals?: Array<{
      goalId?: string | null;
      programId?: string | null;
      count?: number | null;
      conversionCount?: number | null;
    } | null> | null;
    rewardBalanceDetails?: Array<{
      prettyAvailableValue?: string | null;
    } | null> | null;
  } | null;
}

const BIG_STAT_QUERY = gql`
  query bigStat(
    $programId: ID
    $referralFilter: ReferralFilterInput
    $rewardFilter: RewardFilterInput
    $rewardType: RewardType
    $rewardUnit: String
    $rewardValueFormat: RewardValueFormatType!
  ) {
    viewer {
      ... on User {
        referrals(filter: $referralFilter) {
          totalCount
        }
        rewards(filter: $rewardFilter) {
          totalCount
        }
        customFields
        programGoals {
          goalId
          programId
          count
          conversionCount
        }
        rewardBalanceDetails(
          programId: $programId
          filter: { type_eq: $rewardType, unit_eq: $rewardUnit }
        ) {
          ... on CreditRewardBalance {
            prettyAvailableValue(formatType: $rewardValueFormat)
          }
        }
      }
    }
  }
`;

const DEFAULT_RESULT: BigStatHookResult = {
  value: 0,
  statvalue: '-',
  loading: false,
  label: 'BAD PROP TYPE',
};

function parseStatType(statType?: string): BigStatRoute | null {
  const value = statType?.trim();
  if (!value) return null;

  let match = value.match(/^\/referralsCount(?:\/(started|converted))?$/);
  if (match) return { name: 'referralsCount', label: 'Referrals - Count', status: match[1] };

  match = value.match(/^\/referralsMonth(?:\/(started|converted))?$/);
  if (match) return { name: 'referralsMonth', label: 'Referrals - This Month', status: match[1] };

  match = value.match(/^\/referralsWeek(?:\/(started|converted))?$/);
  if (match) return { name: 'referralsWeek', label: 'Referrals - This Week', status: match[1] };

  match = value.match(/^\/rewardsCount(?:\/(global))?$/);
  if (match) return { name: 'rewardsCount', label: 'Rewards', filter: match[1] };

  match = value.match(/^\/rewardsMonth(?:\/(global))?$/);
  if (match) return { name: 'rewardsMonth', label: 'Rewards - This Month', filter: match[1] };

  match = value.match(/^\/rewardsWeek(?:\/(global))?$/);
  if (match) return { name: 'rewardsWeek', label: 'Rewards - This Week', filter: match[1] };

  match = value.match(
    /^\/rewardsCountFiltered(?:\/([^/]+))?(?:\/([^/]+))?(?:\/(PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE))?(?:\/(global))?$/
  );
  if (match) {
    return {
      name: 'rewardsCountFiltered',
      label: 'Rewards',
      rewardType: match[1],
      rewardUnit: match[2],
      rewardStatus: match[3],
      filter: match[4],
    };
  }

  match = value.match(
    /^\/integrationRewardsCountFiltered(?:\/(PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE))?(?:\/(global))?$/
  );
  if (match) {
    return {
      name: 'integrationRewardsCountFiltered',
      label: 'Rewards',
      rewardStatus: match[1],
      filter: match[2],
    };
  }

  match = value.match(/^\/rewardBalance\/([^/]+)\/([^/]+)(?:\/(prettyValue|value))?(?:\/(global))?$/);
  if (match) {
    return {
      name: 'rewardBalance',
      label: 'Reward Balance',
      rewardType: match[1],
      rewardUnit: match[2],
      valueFormat: (match[3] as 'prettyValue' | 'value' | undefined) || 'prettyValue',
      filter: match[4],
    };
  }

  match = value.match(/^\/customFields\/([^/]+)$/);
  if (match) return { name: 'customFields', label: 'Custom Fields', fieldName: decodeURIComponent(match[1]) };

  match = value.match(/^\/programGoals\/([^/]+)\/([^/]+)$/);
  if (match) {
    return {
      name: 'programGoals',
      label: 'Program Goals',
      metricType: decodeURIComponent(match[1]),
      goalId: decodeURIComponent(match[2]),
    };
  }

  return null;
}

function getScopedProgramId(programId?: string, filter?: string) {
  if (!programId || filter === 'global' || programId === 'classic') return null;
  return programId;
}

function getReferralFilter(route: BigStatRoute | null, programId?: string) {
  if (
    !route ||
    (route.name !== 'referralsCount' && route.name !== 'referralsMonth' && route.name !== 'referralsWeek')
  ) {
    return undefined;
  }

  return {
    ...(programId && programId !== 'classic' ? { programId_eq: programId } : {}),
    ...(route.status === 'converted'
      ? { dateConverted_exists: true }
      : route.status === 'started'
        ? { dateConverted_exists: false }
        : {}),
    ...(route.name === 'referralsMonth'
      ? { dateReferralStarted_timeframe: 'this_month' }
      : route.name === 'referralsWeek'
        ? { dateReferralStarted_timeframe: 'this_week' }
        : {}),
  };
}

function getRewardFilter(route: BigStatRoute | null, programId?: string) {
  if (!route) return undefined;

  if (route.name === 'integrationRewardsCountFiltered') {
    return {
      ...(getScopedProgramId(programId, route.filter) ? { programId_eq: getScopedProgramId(programId, route.filter) } : {}),
      type_eq: 'INTEGRATION',
      ...(route.rewardStatus ? { statuses_eq: { status: route.rewardStatus } } : {}),
    };
  }

  if (route.name === 'rewardsCount' || route.name === 'rewardsMonth' || route.name === 'rewardsWeek') {
    return {
      ...(getScopedProgramId(programId, route.filter) ? { programId_eq: getScopedProgramId(programId, route.filter) } : {}),
      ...(route.name === 'rewardsMonth'
        ? { dateGiven_timeframe: 'this_month' }
        : route.name === 'rewardsWeek'
          ? { dateGiven_timeframe: 'this_week' }
          : {}),
    };
  }

  if (route.name === 'rewardsCountFiltered') {
    return {
      ...(getScopedProgramId(programId, route.filter) ? { programId_eq: getScopedProgramId(programId, route.filter) } : {}),
      ...(route.rewardType ? { type_eq: route.rewardType } : {}),
      ...(route.rewardUnit ? { unit_eq: route.rewardUnit } : {}),
      ...(route.rewardStatus ? { statuses_eq: { status: route.rewardStatus } } : {}),
    };
  }

  return undefined;
}

function getFormattedStat(
  route: BigStatRoute,
  data?: BigStatQueryResult,
  programId?: string
): Pick<BigStatHookResult, 'value' | 'statvalue'> {
  if (route.name === 'customFields') {
    const fieldValue = data?.viewer?.customFields?.[route.fieldName];
    return { value: Number(fieldValue) || 0, statvalue: fieldValue?.toString() || '0' };
  }

  if (route.name === 'programGoals') {
    const goal = data?.viewer?.programGoals?.find(
      (entry) =>
        entry?.goalId === route.goalId && (!programId || programId === 'classic' || entry?.programId === programId)
    );
    const goalValue = route.metricType === 'conversionCount' ? goal?.conversionCount : goal?.count;
    return { value: goalValue || 0, statvalue: goalValue?.toString() || '0' };
  }

  if (route.name === 'rewardBalance') {
    const balanceText = data?.viewer?.rewardBalanceDetails?.[0]?.prettyAvailableValue || '0';
    const balanceValue = Number(balanceText.replace(/[^0-9.-]/g, '')) || 0;
    return { value: balanceValue, statvalue: balanceText };
  }

  if (
    route.name === 'rewardsCount' ||
    route.name === 'rewardsMonth' ||
    route.name === 'rewardsWeek' ||
    route.name === 'rewardsCountFiltered' ||
    route.name === 'integrationRewardsCountFiltered'
  ) {
    const rewardCount = data?.viewer?.rewards?.totalCount || 0;
    return { value: rewardCount, statvalue: rewardCount.toString() };
  }

  const referralCount = data?.viewer?.referrals?.totalCount || 0;
  return { value: referralCount, statvalue: referralCount.toString() };
}

export function useBigStat(props: BigStatProps): BigStatHookResult {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const parsedRoute = parseStatType(props.statType);

  const { data, loading } = useQuery<BigStatQueryResult>(
    BIG_STAT_QUERY,
    {
      programId: getScopedProgramId(programId, parsedRoute && 'filter' in parsedRoute ? parsedRoute.filter : undefined),
      referralFilter: getReferralFilter(parsedRoute, programId),
      rewardFilter: getRewardFilter(parsedRoute, programId),
      rewardType:
        parsedRoute && 'rewardType' in parsedRoute && parsedRoute.rewardType ? parsedRoute.rewardType : 'CREDIT',
      rewardUnit:
        parsedRoute && 'rewardUnit' in parsedRoute && parsedRoute.rewardUnit ? parsedRoute.rewardUnit : 'POINT',
      rewardValueFormat:
        parsedRoute?.name === 'rewardBalance' && parsedRoute.valueFormat === 'value'
          ? 'NUMBER_UNFORMATTED'
          : 'UNIT_FORMATTED',
    },
    !user?.jwt || !parsedRoute || isDemo()
  );

  if (!parsedRoute) return DEFAULT_RESULT;

  const stat = getFormattedStat(parsedRoute, data, programId);

  return {
    value: stat.value,
    statvalue: loading ? '...' : stat.statvalue,
    loading,
    label: parsedRoute.label,
  };
}

export function useDemoBigStat(props: BigStatProps): BigStatHookResult {
  const [demoValues] = useState({
    empty: 'Remember to...',
    filled: 'Remember t...',
  });
  const parsedRoute = parseStatType(props.statType);

  return {
    value: 0,
    statvalue: props.statType?.trim() ? demoValues.filled : demoValues.empty,
    loading: false,
    label: parsedRoute?.label || 'Demo Label',
  };
}
