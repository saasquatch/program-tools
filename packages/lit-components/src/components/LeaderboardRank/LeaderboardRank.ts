import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { LeaderboardRankView } from './LeaderboardRankView';
import { useDemoLeaderboardRank, useLeaderboardRank } from './useLeaderboardRank';

export interface LeaderboardRankProps {
  leaderboardType: string;
  programId?: string;
  rankTextFormat: string;
  unrankedText: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-leaderboard-rank': HTMLElement;
  }
}

export const LeaderboardRank = useComponent<LeaderboardRankProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof LeaderboardRankProps, unknown>>;
    const props: LeaderboardRankProps = {
      leaderboardType:
        typeof rawProps.leaderboardType === 'string'
          ? rawProps.leaderboardType
          : 'topStartedReferrers',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      rankTextFormat:
        typeof rawProps.rankTextFormat === 'string'
          ? rawProps.rankTextFormat
          : 'Your rank: {rank}',
      unrankedText:
        typeof rawProps.unrankedText === 'string'
          ? rawProps.unrankedText
          : 'Complete a referral to get ranked!',
    };

    const hookProps = isDemo() ? useDemoLeaderboardRank(props) : useLeaderboardRank(props);

    return LeaderboardRankView({ ...props, ...hookProps });
  },
  'sql-leaderboard-rank',
  ['leaderboard-type', 'program-id', 'rank-text-format', 'unranked-text'] as const
);
