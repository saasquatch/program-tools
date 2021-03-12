import { h } from '@stencil/core';
import { LeaderboardView } from '../components/leaderboard/leaderboard-view';

export default {
  title: 'Leaderboard',
};

export const Empty = () => {
  const props = { pretext: 'You are currently ranked ', rank: '1st', posttext: '!', referrers: [] };
  return <LeaderboardView {...props} />;
};

export const One = () => {
  const props = {
    pretext: 'You are currently ranked ',
    rank: '1st',
    posttext: '!',
    referrers: [{ name: 'Viktor V.', score: '82' }],
  };
  return <LeaderboardView {...props} />;
};

export const Five = () => {
  const props = {
    pretext: 'You are currently ranked ',
    rank: '1st',
    posttext: '!',
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

export const MissingRank = () => {
  const props = {
    pretext: 'You are currently ranked ',
    posttext: '!',
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
