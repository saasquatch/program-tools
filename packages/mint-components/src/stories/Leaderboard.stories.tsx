import { LeaderboardView } from '../components/leaderboard/leaderboard-view';

export default {
  title: 'Leaderboard',
};

export const Empty = () => {
  const props = { placementtext: "You aren't currently ranked!", referrers: [] };
  return LeaderboardView(props);
};

export const One = () => {
  const props = {
    placementtext: 'You are currently 1st!',
    referrers: [{ name: 'Viktor V.', score: '82' }],
  };
  return LeaderboardView(props);
};

export const Five = () => {
  const props = {
    placementtext: 'You are currently 1st!',
    referrers: [
      { name: 'Viktor V.', score: '82' },
      { name: 'MF D.', score: '73' },
      { name: 'Freddie G.', score: '64' },
      { name: 'Benny B.', score: '55' },
      { name: 'Mos D.', score: '46' },
    ],
  };
  return LeaderboardView(props);
};
