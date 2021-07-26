import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { withShadowView } from "../../ShadowViewAddon";
import { LeaderboardView, LeaderboardViewProps } from "./sqm-leaderboard-view";
import { LeaderboardProps, useLeaderboard } from "./useLeaderboard";

/**
 * @uiName Leaderboard
 */
@Component({
  tag: "sqm-leaderboard",
  styleUrl: "sqm-leaderboard.scss",
  shadow: true,
})
export class Leaderboard {
  /**
   * @uiName User Column Heading
   * */
  @Prop() usersheading: string;
  /**
   * @uiName Stats Column Heading
   * */
  @Prop() statsheading: string;
  /**
   * @uiName Rank type
   * @uiType string
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";
  /**
   * @uiName Leaderboard type
   * @uiType string
   */
  @Prop() leaderboardType: "topStartedReferrers" | "topConvertedReferrers";
  /**
   * @uiName Leaderboard time interval
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() interval: string;

  /** @undocumented */
  @Prop() demoData?: DemoData<LeaderboardViewProps>;

  @State()
  ignored = true;

  constructor() {
    withHooks(this);
    withShadowView(this);
  }
  disconnectedCallback() {}

  render() {
    const props = {
      empty: <slot name="empty" />,
      loadingstate: <slot name="loading" />,
      usersheading: this.usersheading,
      statsheading: this.statsheading,
      rankType: this.rankType,
      leaderboardType: this.leaderboardType,
      interval: this.interval,
    };
    const demoProps = { ...props, demoData: this.demoData };
    const viewprops = isDemo()
      ? useLeaderboardDemo(demoProps)
      : useLeaderboard(props);
    return <LeaderboardView {...viewprops} />;
  }
}

function useLeaderboardDemo(props: LeaderboardProps): LeaderboardViewProps {
  return deepmerge(
    {
      states: {
        loading: false,
        hasLeaders: true,
        styles: {
          usersheading: props.usersheading
            ? props.usersheading
            : "TOP REFERRERS",
          statsheading: props.statsheading ? props.statsheading : "NEW TITANS",
        },
      },
      data: {
        rankType: "rowNumber",
        leaderboard: [
          { firstName: "Viktor", lastInitial: "V", value: 82, rank: "1" },
          { firstName: "MF", lastInitial: "D", value: 73, rank: "2" },
          { firstName: "Freddie", lastInitial: "G", value: 64, rank: "3" },
          { firstName: "Benny", lastInitial: "B", value: 55, rank: "4" },
          { firstName: "Mos", lastInitial: "D", value: 46, rank: "5" },
        ],
      },
      elements: {
        empty: props.empty ? props.empty : <div>Empty</div>,
        loadingstate: props.loadingstate ? (
          props.loadingstate
        ) : (
          <div>Loading</div>
        ),
      },
    },
    props.demoProps|| {},
    { arrayMerge: (_, a) => a }
  );
}
