import { createIntl } from "@formatjs/intl";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import {
  LeaderboardRankView,
  LeaderboardRankViewProps,
} from "./sqm-leaderboard-rank-view";
import { useLeaderboardRank } from "./useLeaderboardRank";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";
import { intl } from "../../global/global";

/**
 * @uiName Leaderboard Rank
 * @exampleGroup Leaderboards
 * @example Referral Converted Leaderboard - <sqm-leaderboard-rank leaderboard-type="topConvertedReferrers" rank-type="rowNumber" rank-text="You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!" unranked-text="You are currently unranked, refer a friend!"></sqm-leaderboard-rank>
 * @example Referral Started Leaderboard - <sqm-leaderboard-rank leaderboard-type="topStartedReferrers" rank-type="rowNumber" rank-text="You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!" unranked-text="You are currently unranked, refer a friend!"></sqm-leaderboard-rank>
 * @example Point Earners Leaderboard - <sqm-leaderboard-rank rleaderboard-type="topPointEarners" ank-type="rowNumber" rank-text="You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!" unranked-text="You are currently unranked, earn points!"></sqm-leaderboard-rank>
 */
@Component({
  tag: "sqm-leaderboard-rank",
  styleUrl: "sqm-leaderboard-rank.scss",
  shadow: true,
})
export class LeaderboardRank {
  //Todo: Give this component a proper loading state


  /**
   * @uiName Default Rank
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   * @uiEnumNames ["Row Number", "Rank", "Dense Rank"]
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";

  /**
   * @uiName Rank Text
   */
  @Prop() rankText: string =
    "You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!";

  /**
   * @uiName Leaderboard Type
   * @uiType string
   * @uiEnum ["topStartedReferrers", "topConvertedReferrers", "topPointEarners"]
   * @uiEnumNames ["Top Started Referrers", "Top Converted Referrers", "Top Point Earners"]
   */
  @Prop() leaderboardType:
    | "topStartedReferrers"
    | "topConvertedReferrers"
    | "topPointEarners";

  /**
   * @uiName Unranked Text
   */
  @Prop() unrankedText: string;

  /**
   * @uiName Leaderboard Time Interval
   * @uiWidget DateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() interval: string;

  /**
   * Filters leaderboard to show only data from this program. Defaults to the program context where this leaderboard is.
   * If no program ID is set or provided by context, then a global leaderboard is shown.
   *
   * @uiName Program
   */
  @Prop() programId?: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<LeaderboardRankViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useLeaderboardRankDemo(this)
      : useLeaderboardRank(this);
    return <LeaderboardRankView {...props} />;
  }
}

function useLeaderboardRankDemo(
  props: LeaderboardRank
): LeaderboardRankViewProps {
  const rank =
    intl.formatMessage(
      { id: "rankText", defaultMessage: props.rankText },
      {
        rank: 1,
      }
    ) || "1st";
  return deepmerge(
    {
      data: {
        rank,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
