import { LeaderboardRankViewProps } from "./sqm-leaderboard-rank-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Leaderboard Rank
 */
export declare class LeaderboardRank {
  /**
   * @uiName Default rank
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   */
  rankType: "rowNumber" | "rank" | "denseRank";
  /**
   * @uiName Rank Text
   */
  rankText: string;
  /**
   * @uiName Leaderboard type
   * @uiType string
   * @uiEnum ["topStartedReferrers", "topConvertedReferrers"]
   */
  leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  /**
   * @uiName Unranked Text
   */
  unrankedText: string;
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
  demoData?: DemoData<LeaderboardRankViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
