import { DemoData } from "../../global/demo";
import { LeaderboardViewProps } from "./sqm-leaderboard-view";
/**
 * @uiName Leaderboard
 */
export declare class Leaderboard {
  /**
   * @uiName User Column Heading
   */
  usersheading: string;
  /**
   * @uiName Stats Column Heading
   */
  statsheading: string;
  /**
   * @uiName Rank Heading
   */
  rankheading?: string;
  /**
   * @uiName Show the ranking numbers
   */
  showRank: boolean;
  /**
   * @uiName Show viewing user's rank
   */
  showUser: boolean;
  /**
   * @uiName Empty State Text
   */
  emptyStateText: string;
  /**
   * @uiName Rank type
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   */
  rankType: "rowNumber" | "rank" | "denseRank";
  /**
   * @uiName Leaderboard type
   * @uiType string
   * @uiEnum ["topStartedReferrers", "topConvertedReferrers"]
   */
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  /**
   * @uiName Title displayed for users without names
   */
  anonymousUser: string;
  /**
   * @uiName Leaderboard time interval
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  interval: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<LeaderboardViewProps>;
  ignored: boolean;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
