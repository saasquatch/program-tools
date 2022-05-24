import { LeaderboardRankViewProps } from "./sqm-leaderboard-rank-view";
export interface LeaderboardRankProps {
  rankType: "rowNumber" | "rank" | "denseRank";
  rankText: string;
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  unrankedText: string;
  interval: string;
}
export declare function useLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankViewProps;
