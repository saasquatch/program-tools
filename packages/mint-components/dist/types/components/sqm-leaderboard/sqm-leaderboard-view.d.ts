import { VNode } from "../../stencil-public-runtime";
export interface LeaderboardViewProps {
  states: {
    loading: boolean;
    hasLeaders: boolean;
    styles: {
      usersheading: string;
      statsheading: string;
      rankheading?: string;
      showRank?: boolean;
    };
  };
  data: {
    rankType: string;
    leaderboard: {
      value: number;
      rank: number;
      firstName: string;
      lastInitial: string;
      rowNumber: number;
    }[];
    showUser?: boolean;
    userRank?: {
      value: number;
      rank: number;
      firstName: string;
      lastInitial: string;
      rowNumber: number;
    };
  };
  elements: {
    empty: VNode;
    loadingstate: VNode;
  };
}
export declare function LeaderboardView(props: LeaderboardViewProps): any;
