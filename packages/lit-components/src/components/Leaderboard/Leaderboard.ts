import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { LeaderboardView } from './LeaderboardView';
import { useDemoLeaderboard, useLeaderboard } from './useLeaderboard';

export interface LeaderboardRow {
  rank?: number | null;
  firstName?: string | null;
  lastInitial?: string | null;
  value?: number | string | null;
  statValue?: number | string | null;
}

export interface LeaderboardProps {
  leaderboardType: string;
  programId?: string;
  rankType: string;
  showRank: boolean;
  showUser: boolean;
  showStats: boolean;
  header?: string;
  emptyStateText: string;
  maxRows: number;
}

const parseBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-leaderboard': HTMLElement;
  }
}

export const Leaderboard = useComponent<LeaderboardProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof LeaderboardProps, unknown>>;
    const props: LeaderboardProps = {
      leaderboardType:
        typeof rawProps.leaderboardType === 'string'
          ? rawProps.leaderboardType
          : 'topStartedReferrers',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      rankType: typeof rawProps.rankType === 'string' ? rawProps.rankType : 'rowNumber',
      showRank: parseBoolean(rawProps.showRank, true),
      showUser: parseBoolean(rawProps.showUser, true),
      showStats: parseBoolean(rawProps.showStats, true),
      header: typeof rawProps.header === 'string' ? rawProps.header : undefined,
      emptyStateText:
        typeof rawProps.emptyStateText === 'string' ? rawProps.emptyStateText : 'No data available',
      maxRows: parseNumber(rawProps.maxRows, 10),
    };

    const hookProps = isDemo() ? useDemoLeaderboard(props) : useLeaderboard(props);

    return LeaderboardView({ ...props, ...hookProps });
  },
  'sql-leaderboard',
  [
    'leaderboard-type',
    'program-id',
    'rank-type',
    'show-rank',
    'show-user',
    'show-stats',
    'header',
    'empty-state-text',
    'max-rows',
  ] as const
);
