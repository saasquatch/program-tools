import { VNode } from "../../stencil-public-runtime";
import { LeaderboardViewProps } from "./sqm-leaderboard-view";
export interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
  rankheading?: string;
  showRank?: boolean;
  showUser?: boolean;
  rankType: "rowNumber" | "rank" | "denseRank";
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  anonymousUser: string;
  interval: string;
  empty: VNode;
  loadingstate: VNode;
  demoProps?: LeaderboardViewProps;
}
export declare type Rank = {
  rank: number;
  denseRank: number;
  rowNumber: number;
};
export declare type Leaderboard = {
  value: number;
  rank: number;
  firstName: string;
  lastInitial: string;
  rowNumber: number;
};
export declare function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps;
