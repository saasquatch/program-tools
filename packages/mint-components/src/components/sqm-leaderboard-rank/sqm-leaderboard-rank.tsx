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

/**
 * @uiName Leaderboard Rank
 */
@Component({
  tag: "sqm-leaderboard-rank",
  styleUrl: "sqm-leaderboard-rank.scss",
  shadow: true,
})
export class LeaderboardRank {
  /**
   * @uiName Default rank
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";

  /**
   * @uiName Rank Text
   */
  @Prop() rankText: string =
    "You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!";
  /**
   * @uiName Leaderboard type
   * @uiType string
   * @uiEnum ["topStartedReferrers", "topConvertedReferrers"]
   */
  @Prop() leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  /**
   * @uiName Rank Text
   */
  @Prop() unrankedText: string;
  /**
   * @uiName Leaderboard time interval
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() interval: string;

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
  const intl = createIntl({
    locale: "en",
  });

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
