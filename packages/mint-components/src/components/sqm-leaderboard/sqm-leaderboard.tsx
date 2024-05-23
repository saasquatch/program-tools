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
 * @slots [{"name":"empty", "title":"Empty State"}]
 * @requiredFeatures ["LEADERBOARDS"]
 * @exampleGroup Leaderboard
 * @example Leaderboard - <sqm-leaderboard usersheading="Referrer" statsheading="Referrals" rank-type="rank" leaderboard-type="topStartedReferrers" rankheading="Rank" show-rank="true"><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png" empty-state-header="View your rank in the leaderboard" empty-state-text="Be the first to refer a friend and reach the top of the leaderboard" ></sqm-empty></sqm-leaderboard>
 * @featureTooltip <div>Motivate your participants by gamifying your program. Contact <a href={`mailto:saasquatch-support@impact.com?subject=Next steps for Leaderboards feature&body=Hi Support Team, %0D%0A%0D%0A I am interested to learn more about the Leaderboards feature. Please let me know the next steps to access this feature, including any necessary plan upgrades.%0D%0A%0D%0A - Feature Interested In: Leaderboards%0D%0A - Company Name: [Please fill out your company name here]%0D%0A%0D%0AThank you`}>Support</a> to upgrade your plan and add a leaderboard.</div>
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
   * @uiWidget programSelector
   */
  @Prop() programId?: string;

  /**
   * @uiName User column heading
   */
  @Prop() usersheading: string;
  /**
   * @uiName Stats column heading
   */
  @Prop() statsheading: string;
  /**
   * @uiName Rank column heading
   */
  @Prop() rankheading?: string;
  /**
   * @uiName Show leaderboard rank
   */
  @Prop() showRank: boolean;

  /**
   * Hide the viewer's leaderboard row if not in the top results.
   *
   * @uiName Hide viewing user
   * @default
   */
  @Prop() hideViewer: boolean = false;

  /**
   * Hides the leaderboard if user is on Essentials plan
   *
   * @uiName Hide viewing user
   * @default
   */
  @Prop() isEssentials?: boolean = false;

  /**
   * @uiName Rank type
   * @uiType string
   * @uiEnum ["rowNumber", "rank", "denseRank"]
   * @uiEnumNames ["Row Number", "Rank", "Dense Rank"]
   */
  @Prop() rankType: "rowNumber" | "rank" | "denseRank";

  /**
   * @uiName Leaderboard type
   * @uiType string
   * @required
   * @uiEnum ["topStartedReferrers", "topConvertedReferrers", "topPointEarners"]
   * @uiEnumNames ["Top Started Referrers", "Top Converted Referrers", "Top Point Earners"]
   */
  @Prop() leaderboardType:
    | "topStartedReferrers"
    | "topConvertedReferrers"
    | "topPointEarners";

  /**
   * Title displayed for users without names
   * @uiName Unknown user text
   */
  @Prop() anonymousUser: string = "Anonymous User";

  /**
   * @uiName Leaderboard time interval
   * @uiWidget dateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() interval: string;

  /**
   * Control the maximum amount of rows displayed on the leaderboard.
   *
   * @uiName Maximum rows number
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
      essentials: <EssentialsSlot />,
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
      isEssentials: this.isEssentials,
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

function EssentialsSlot() {
  return (
    <slot name="essentials">
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1715360191/squatch-assets/Leaderboard_Not_Available.svg"
        empty-state-header="Leaderboards aren’t available on your plan"
        empty-state-text="Contact {supportText} to upgrade your plan and start leveraging gamification in your program."
        support-text="Support"
        missing-feature="Leaderboards"
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
        isEssentials: false,
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
        essentials: <EssentialsSlot />,
        loadingstate: <LoadingSlot />,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
