import { h } from '@stencil/core';
import { LeaderboardView } from '../components/leaderboard/leaderboard-view';

export default {
  title: 'Leaderboard',
};

export const Empty = () => {
  const props = {
    usersheading: 'TOP REFERRERS',
    statsheading: 'NEW TITANS',
    referrers: [],
  };
  return <LeaderboardView {...props} />;
};

export const One = () => {
  const props = {
    usersheading: 'TOP REFERRERS',
    statsheading: 'NEW TITANS',
    referrers: [{ name: 'Viktor V.', score: '82' }],
  };
  return <LeaderboardView {...props} />;
};

export const Five = () => {
  const props = {
    usersheading: 'TOP REFERRERS',
    statsheading: 'NEW TITANS',
    referrers: [
      { name: 'Viktor V.', score: '82' },
      { name: 'MF D.', score: '73' },
      { name: 'Freddie G.', score: '64' },
      { name: 'Benny B.', score: '55' },
      { name: 'Mos D.', score: '46' },
    ],
  };
  return <LeaderboardView {...props} />;
};
