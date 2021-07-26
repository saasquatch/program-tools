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
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";
  @Prop() rankText: string;
  /**
   * @uiName Leaderboard type
   * @uiType string
   */
  @Prop() leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  @Prop() unrankedText: string;
  /**
   * @uiName Leaderboard time interval
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() interval: string;

  /** @undocumented */
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
    props.demoData,
    { arrayMerge: (_, a) => a }
  );
}
