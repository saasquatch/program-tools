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
   */
  @Prop() usersheading: string;
  /**
   * @uiName Stats Column Heading
   */
  @Prop() statsheading: string;
  /**
   * @uiName Rank Heading
   */
  @Prop() rankheading?: string;
  /**
   * @uiName Show the ranking numbers
   */
  @Prop() showRank: boolean;

  /**
   * @uiName Show viewing user's rank
   */
  @Prop() showUser: boolean = true;

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
   * @uiName Empty State Image
   */
  @Prop() emptyStateImage: string = "https://i.imgur.com/KPGnPF8.png";

  /**
   * @uiName Empty State Header
   */
  @Prop() emptyStateHeader: string = "View your rank in the leaderboard";

  /**
   * @uiName Empty State Description
   */
  @Prop() emptyStateText: string =
    "Be the first to refer a friend and reach the top of the leaderboard";

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
      empty: (
        <EmptySlot
          emptyStateImage={this.emptyStateImage}
          emptyStateHeader={this.emptyStateHeader}
          emptyStateText={this.emptyStateText}
        />
      ),
      loadingstate: <LoadingSlot />,
      usersheading: this.usersheading,
      statsheading: this.statsheading,
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
    return (
      <LeaderboardView {...viewprops}>
        <slot />
      </LeaderboardView>
    );
  }
}
function EmptySlot({
  emptyStateImage,
  emptyStateHeader,
  emptyStateText,
}: {
  emptyStateImage: string;
  emptyStateHeader: string;
  emptyStateText: string;
}) {
  return (
    <slot name="empty">
      <sqm-portal-container padding="xxxx-large" gap="medium">
        <sqm-image image-url={emptyStateImage} max-width="100px"></sqm-image>
        <sqm-titled-section label-margin="xxx-small" text-align="center">
          <sqm-text slot="label">
            <h3>{emptyStateHeader}</h3>
          </sqm-text>
          <sqm-text slot="content">{emptyStateText}</sqm-text>
        </sqm-titled-section>
      </sqm-portal-container>
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
          statsheading: props.statsheading
            ? props.statsheading
            : "NEW CUSTOMERS",
        },
      },
      data: {
        rankType: "rowNumber",
        leaderboard: [
          { firstName: "Viktor", lastInitial: "V", value: 82, rank: 1 },
          { firstName: "MF", lastInitial: "D", value: 73, rank: 2 },
          { firstName: "Freddie", lastInitial: "G", value: 64, rank: 3 },
          { firstName: "Benny", lastInitial: "B", value: 55, rank: 4 },
          { firstName: "Mos", lastInitial: "D", value: 46, rank: 5 },
        ],
      },
      elements: {
        empty: (
          <EmptySlot
            emptyStateImage={"https://i.imgur.com/KPGnPF8.png"}
            emptyStateHeader={"View your rank in the leaderboard"}
            emptyStateText={
              "Be the first to refer a friend and reach the top of the leaderboard"
            }
          />
        ),
        loadingstate: <LoadingSlot />,
      },
    },
    props.demoProps || {},
    { arrayMerge: (_, a) => a }
  );
}
