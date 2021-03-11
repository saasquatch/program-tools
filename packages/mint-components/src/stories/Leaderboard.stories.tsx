import { h } from '@stencil/core';
import { LeaderboardView } from '../components/leaderboard/leaderboard-view';
import { First } from './LeaderBoardRank.stories';

export default {
  title: 'Leaderboard',
};

export const Empty = () => {
  const props = { referrers: [] };
  return (
    <LeaderboardView {...props}>
      <First slot="rank" />
    </LeaderboardView>
  );
};

export const One = () => {
  const props = {
    referrers: [{ name: 'Viktor V.', score: '82' }],
  };
  return (
    <LeaderboardView {...props}>
      <First slot="rank" />
    </LeaderboardView>
  );
};

export const Five = () => {
  const props = {
    referrers: [
      { name: 'Viktor V.', score: '82' },
      { name: 'MF D.', score: '73' },
      { name: 'Freddie G.', score: '64' },
      { name: 'Benny B.', score: '55' },
      { name: 'Mos D.', score: '46' },
    ],
  };
  return (
    <LeaderboardView {...props}>
      <First slot="rank" />
    </LeaderboardView>
  );
};
