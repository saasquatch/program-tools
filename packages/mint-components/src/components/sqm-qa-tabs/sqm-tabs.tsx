import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { TabsView } from "./sqm-tabs-view";
import { useTabs } from "./useTabs";

/**
 * @uiName Tab Group
 * @slots [{"name":"", "title":"Tabs","validChildren":["sqm-tab"]}]
 * @canvasRenderer always-replace
 * @exampleGroup Layout
 * @example Generic Tab Group - <sqm-tabs><sqm-tab header="Tab 1">This is the first tab</sqm-tab><sqm-tab header="Tab 2">This is the second tab</sqm-tab><sqm-tab header="Tab 3">This is the third tab</sqm-tab></sqm-tabs>
 * @example Referral Tab Group - <sqm-tabs><sqm-tab header="Leaderboard"><sqm-leaderboard usersheading="Referrer" statsheading="Referrals" rankheading="Rank" rank-type="rowNumber" leaderboard-type="topStartedReferrers" show-rank anonymous-user="Anonymous User"><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_leaderboard2.png" empty-state-header="View your rank in the leaderboard" empty-state-text="Be the first to refer a friend and reach the top of the leaderboard"></sqm-empty></sqm-leaderboard></sqm-tab><sqm-tab header="Referral history"><sqm-referral-table><sqm-referral-table-user-column column-title="User" anonymous-user="Anonymous User" deleted-user="Deleted User"></sqm-referral-table-user-column><sqm-referral-table-status-column column-title="Referral status" converted-status-text="Converted" in-progress-status-text="In Progress"></sqm-referral-table-status-column><sqm-referral-table-rewards-column column-title="Rewards" expiring-text="Expiring in" fuel-tank-text="Your code is" pending-for-text="{status} for {date}" reward-received-text="Reward received on" status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }" status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"></sqm-referral-table-rewards-column><sqm-referral-table-date-column column-title="Date referred" date-shown="dateReferralStarted"></sqm-referral-table-date-column><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png" empty-state-header="View your referral details" empty-state-text="Refer a friend to view the status of your referrals and rewards earned"></sqm-empty></sqm-referral-table></sqm-tab></sqm-tabs> 
 * @example Loyalty Tab Group - <sqm-tabs placement="top"> <sqm-tab header="Leaderboard"> <sqm-leaderboard usersheading="Users" statsheading="Points Earned" rankheading="Rank" rank-type="rowNumber" leaderboard-type="topPointEarners" show-rank anonymous-user="Anonymous User" > <sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_leaderboard2.png" empty-state-header="View your rank in the leaderboard" empty-state-text="Be the first to earn points and reach the top of the leaderboard" ></sqm-empty ></sqm-leaderboard> </sqm-tab> <sqm-tab header="Reward history"> <sqm-rewards-table ><sqm-rewards-table-reward-column available-text="{availableAmount} remaining" column-title="Reward" copy-text="Copied!" redeemed-text="{redeemedAmount} redeemed" > </sqm-rewards-table-reward-column> <sqm-rewards-table-source-column anonymous-user="Anonymous User" column-title="Source" deleted-user="Deleted User" referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}" reward-exchange-text="Reward Exchange" reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}" > </sqm-rewards-table-source-column><sqm-rewards-table-status-column column-title="Status" expiry-text="Expires on " status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"></sqm-rewards-table-status-column><sqm-rewards-table-date-column column-title="Date received" date-shown="dateGiven"></sqm-rewards-table-date-column><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png" empty-state-header="View your rewards" empty-state-text="Refer friends and complete tasks to view the details of your rewards"></sqm-empty></sqm-rewards-table></sqm-tab><sqm-tab header="Redeem"><sqm-reward-exchange-list back-text="Back" button-text="Exchange Rewards" cancel-text="Cancel" choose-amount-title="Select" choose-reward-title="Rewards" confirmation-title="Confirm" continue-text="Continue" continue-to-confirmation-text="Continue to confirmation" done-text="Done" reward-title="Choose a reward" not-available-error="{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} AVAILABILITY_PREDICATE {Not available} other {{unavailableReasonCode}} }" not-enough-error="Not enough {sourceUnit} to redeem for this reward" query-error="Unable to load reward exchange list. Please try again" redeem-text="Redeem" redeem-title="Confirm and redeem" redemption-error="An error occured trying to redeem this reward. Please try again" redemption-success-text="Redeemed {sourceValue} for {destinationValue}" select-text="Select amount to receive" source-amount-message="{ruleType, select, FIXED_GLOBAL_REWARD {{sourceValue}} other {{sourceMinValue} to {sourceMaxValue}}}" tooltiptext="Copied" reward-name-title="Reward" reward-amount-title="Reward Amount" cost-title="Cost to Redeem" reward-redeemed-text="Reward redeemed" skeleton-card-num="8" promo-code="Promo Code" tooltip-text="Copied!"><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_exchange2.png" empty-state-header="Redeem rewards" empty-state-text="Use your points to redeem rewards once they become available"></sqm-empty></sqm-reward-exchange-list></sqm-tab></sqm-tabs>
 */
@Component({
  tag: "sqm-qa-tabs",
  shadow: true,
})
export class Tabs {
  /**
   * Used to specify the placement of the tabs
   *
   * @uiName Tabs Placement
   * @uiType string
   * @uiEnum ["left", "right", "bottom", "top"]
   * @uiEnumNames ["Left", "Right", "Bottom", "Top"]
   */
  @Prop() placement?: "left" | "right" | "bottom" | "top";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { content } = useTabs();
    const { placement } = getProps(this);

    return (
      <TabsView placement={placement} content={content}>
        <slot />
      </TabsView>
    );
  }
}
