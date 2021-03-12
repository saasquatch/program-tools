import { LeaderboardRankView } from '../components/leaderboard-rank/leaderboard-rank-view';

export default {
  title: 'Leaderboard Rank',
};

export const First = () => {
  const props = { pretext: 'You are currently ranked ', rank: '1st', posttext: '!' };
  // return LeaderboardRankView(props);

  return (
    <p>
      Your rank is <LeaderboardRankView /> on the leaderboard
    </p>
  );
};
