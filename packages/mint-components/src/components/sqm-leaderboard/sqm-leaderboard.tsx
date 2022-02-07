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
  shadow: true,
})
export class Leaderboard {
  /**
   * @uiName User Column Heading
   */
  @Prop() usersheading: string;
  /**
   * @uiName Stats Column Heading
   */
  @Prop() statsheading: string;
  /**
   * @uiName Rank Heading
   */
  @Prop() rankheading: string;
  /**
   * @uiName Show leaderboard rank
   */
  @Prop() showRank: boolean;

  /**
   * Shows the current user's leaderboard information even if they are not in the top 10
   *
   * @uiName Show viewing user
   */
  @Prop() showUser: boolean = false;

  /**
   * @uiName Rank type
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";
  /**
   * @uiName Leaderboard type
   * @uiType string
   * @uiEnum ["topStartedReferrers", "topConvertedReferrers"]
   */
  @Prop() leaderboardType: "topStartedReferrers" | "topConvertedReferrers";

  /**
   * @uiName Title displayed for users without names
   */
  @Prop() anonymousUser: string = "Anonymous User";

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
      empty: <EmptySlot />,
      loadingstate: <LoadingSlot />,
      usersheading: this.usersheading,
      statsheading: this.statsheading,
      rankheading: this.rankheading,
      rankType: this.rankType,
      leaderboardType: this.leaderboardType,
      anonymousUser: this.anonymousUser,
      interval: this.interval,
      showUser: this.showUser,
      showRank: this.showRank,
    };
    const demoProps = { ...props, demoData: this.demoData };
    const viewprops = isDemo()
      ? useLeaderboardDemo(demoProps)
      : useLeaderboard(props);
    return <LeaderboardView {...viewprops} />;
  }
}

function EmptySlot() {
  return (
    <slot name="empty">
      <sqm-empty></sqm-empty>
    </slot>
  );
}

function LoadingSlot() {
  return (
    <slot name="loading">
      <table>
        {[...Array(10)].map(() => {
          return (
            <tr>
              <td>
                <sl-skeleton></sl-skeleton>
              </td>
            </tr>
          );
        })}
      </table>
    </slot>
  );
}

function useLeaderboardDemo(
  props: LeaderboardProps & { demoData: any }
): LeaderboardViewProps {
  const data = props.demoData?.data?.leaderboard || [
    {
      firstName: "Viktor",
      lastInitial: "V",
      value: 82,
      rank: 1,
      rowNumber: 1,
    },
    {
      firstName: "MF",
      lastInitial: "D",
      value: 73,
      rank: 2,
      rowNumber: 2,
    },
    {
      firstName: "Freddie",
      lastInitial: "G",
      value: 64,
      rank: 3,
      rowNumber: 3,
    },
    {
      firstName: "Benny",
      lastInitial: "B",
      value: 55,
      rank: 4,
      rowNumber: 4,
    },
    {
      value: 46,
      rank: 5,
      rowNumber: 5,
    },
  ];

  return deepmerge(
    {
      states: {
        loading: false,
        hasLeaders: true,
        styles: {
          usersheading: props.usersheading
            ? props.usersheading
            : "Top referrers",
          statsheading: props.statsheading
            ? props.statsheading
            : "New customers",
          rankheading: props.rankheading ? props.rankheading : "Rank",
          anonymousUser: props.anonymousUser
            ? props.anonymousUser
            : "Anonymous User",
          showRank: props.showRank,
        },
      },
      data: {
        rankType: "rowNumber",
        leaderboard: data,
        showUser: props.showUser,
      },
      elements: {
        empty: <EmptySlot />,
        loadingstate: <LoadingSlot />,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
