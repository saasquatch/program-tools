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
 * @slot [{"name":"empty", "title":"Empty State"}]
 * @exampleGroup Leaderboards
 * @example Referral Converted Leaderboard - <sqm-leaderboard usersheading="Referrer" statsheading="Referrals" rankheading="Rank" rank-type="rowNumber" leaderboard-type="topConvertedReferrers" show-rank anonymous-user="Anonymous User"> <sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_leaderboard2.png" empty-state-header="View your rank in the leaderboard" empty-state-text="Be the first to refer a friend and reach the top of the leaderboard" > </sqm-empty></sqm-leaderboard>
 * @example Referral Started Leaderboard - <sqm-leaderboard usersheading="Referrer" statsheading="Referrals" rankheading="Rank" rank-type="rowNumber" leaderboard-type="topStartedReferrers" show-rank anonymous-user="Anonymous User"> <sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_leaderboard2.png" empty-state-header="View your rank in the leaderboard" empty-state-text="Be the first to refer a friend and reach the top of the leaderboard" > </sqm-empty></sqm-leaderboard>
 * @example Point Earners Leaderboard - <sqm-leaderboard usersheading="Users" statsheading="Points Earned" rankheading="Rank" rank-type="rowNumber" leaderboard-type="topPointEarners" show-rank anonymous-user="Anonymous User"> <sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_leaderboard2.png" empty-state-header="View your rank in the leaderboard" empty-state-text="Be the first to earn points and reach the top of the leaderboard" ></sqm-empty></sqm-leaderboard>
 */
@Component({
  tag: "sqm-leaderboard",
  shadow: true,
})
export class Leaderboard {
  /**
   * Filters leaderboard to show only data from this program. Defaults to the program context where this leaderboard is.
   * If no program ID is set or provided by context, then a global leaderboard is shown.
   *
   * @uiName Program
   */
  @Prop() programId?: string;

  /**
   * @uiName User Column Heading
   */
  @Prop() usersheading: string;
  /**
   * @uiName Stats Column Heading
   */
  @Prop() statsheading: string;
  /**
   * @uiName Rank Column Heading
   */
  @Prop() rankheading?: string;
  /**
   * @uiName Show Leaderboard Rank
   */
  @Prop() showRank: boolean;

  /**
   * Hide the viewer's leaderboard row if not in the top 10.
   *
   * @uiName Hide Viewing User
   */
  @Prop() hideViewer: boolean = false;

  /**
   * @uiName Rank Type
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   * @uiEnumNames ["Row Number", "Rank", "Dense Rank"]
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";

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
   * Title displayed for users without names
   * @uiName Unknown User Text
   */
  @Prop() anonymousUser: string = "Anonymous User";

  /**
   * @uiName Leaderboard Time Interval
   * @uiWidget DateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() interval: string;

  /**
   * Control the maximum amount of rows displayed on the leaderboard.
   * 
   * @uiName Maximum Rows Number
   */
  @Prop() maxRows: number = 10;

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
      maxRows: this.maxRows,
      programId: this.programId,
      anonymousUser: this.anonymousUser,
      interval: this.interval,
      hideViewer: this.hideViewer,
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
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png"
        empty-state-header="View your rank in the leaderboard"
        empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"
      ></sqm-empty>
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
      textValue: "82",
      rank: 1,
      rowNumber: 1,
    },
    {
      firstName: "MF",
      lastInitial: "D",
      textValue: "73",
      rank: 2,
      rowNumber: 2,
    },
    {
      firstName: "Freddie",
      lastInitial: "G",
      textValue: "64",
      rank: 3,
      rowNumber: 3,
    },
    {
      firstName: "Benny",
      lastInitial: "B",
      textValue: "55",
      rank: 4,
      rowNumber: 4,
    },
    {
      textValue: "46",
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
          hideViewer: props.hideViewer,
        },
      },
      data: {
        rankType: "rowNumber",
        leaderboard: data,
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
