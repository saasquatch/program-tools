import { LeaderboardRankViewProps } from './leaderboard-rank-view';

interface LeaderboardRankProps {
  pretext: string;
  posttext: string;
  rank?: string;
}

export function useLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankViewProps {
  console.log("RANK", props)
  return { rank: '{default rank}', ...props };
}
