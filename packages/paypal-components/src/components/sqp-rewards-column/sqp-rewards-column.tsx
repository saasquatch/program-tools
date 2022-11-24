import { useTenantAlias, useToken } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop, State } from "@stencil/core";
import { gql, GraphQLClient } from "graphql-request";
import { useRequestRerender } from "../../tables/re-render";
import { memoizedGraphQLClient } from "../sqp-graphql-client-provider/useGraphQLClient";
import { ReferralTableColumn } from "./ReferralTableColumn";

const GET_INTEGRATION_STATUS = gql`
  query userPaymentPreview {
    tenantConfig {
      baseUnits
    }
  }
`;

/**
 * @uiName PayPal Referral Table Rewards Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup PayPal Components
 * @example Referral Table Rewards Column - <sqp-rewards-column></sqp-rewards-column>
 */
@Component({
  tag: "sqp-rewards-column",
  shadow: true,
})
export class ReferralTableRewardsColumn implements ReferralTableColumn {
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string = "Rewards";

  /**
   * Define the text shown in the reward status badge.
   *
   * @uiName Reward status text
   * @uiWidget textArea
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} EXPIRED {Expired} REDEEMED {Redeemed} PENDING {Pending} SUCCESS {Paid out} FAILED {Failed} PAYPAL_PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} W9_PENDING {Pending} DENIED {Denied} other {Not available}  }";

  /**
   * Additional status text shown in the details drop down.
   *
   * @uiName Reward status long text
   * @uiWidget textArea
   */
  @Prop()
  statusLongText: string =
    "{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} REDEEMED {Redeemed on} PENDING {Available on} EXPIRED {Reward expired on} SUCCESS {Paid out on} FAILED {This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on} PAYPAL_PENDING {Payout process started on} UNCLAIMED {The email you provided does not link to an existing PayPal account. Payout expires on} ONHOLD {Payout on hold and in review since} REFUNDED {Payout refunded on} RETURNED {Payout returned on} REVERSED {Payout reversed on} BLOCKED {Payout blocked on} W9_PENDING {W-9 required} DENIED {Payout denied by PayPal on} other {Not available} }";

  /**
   * Shown in the dropdown details when a reward has an associated fuel tank code.
   *
   * @uiName Fuel tank code text
   */
  @Prop() fuelTankText: string = "Your code is";

  /**
   * Shown in the dropdown details when a reward has been received.
   *
   * @uiName Reward received text
   */
  @Prop() rewardReceivedText: string = "Reward received on";

  /**
   * Shown in the dropdown details when a reward has been paid out.
   *
   * @uiName Reward paid out text
   */
  @Prop() rewardPaidOutText: string = "Paid out on {date}.";

  /**
   * Shown in the dropdown details when a reward is being paid out.
   *
   * @uiName Reward payout in progress text
   */
  @Prop() rewardPayoutInProgressText: string =
    "Payout processing started on {date}.";

  /**
   * Shown in the dropdown details when a reward payout has failed.
   *
   * @uiName Reward payout failed text
   */
  @Prop() rewardPayoutFailedText: string =
    "This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on {date}.";

  /**
   * Shown in the dropdown details when a reward was paid out but is unclaimed.
   *
   * @uiName Reward unclaimed text
   */
  @Prop() rewardUnclaimedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expires on {date}.";

  /**
   * Shown in the dropdown details when a reward was placed on hold during payout.
   *
   * @uiName Reward on hold text
   */
  @Prop() rewardOnHoldText: string =
    "Payout on hold and in review since {date}.";

  /**
   * Shown in the dropdown details when a reward was refunded after payout.
   *
   * @uiName Reward refunded text
   */
  @Prop() rewardRefundedText: string = "Payout refunded on {date}.";

  /**
   * Shown in the dropdown details when a reward was returned after payout.
   *
   * @uiName Reward returned text
   */
  @Prop() rewardReturnedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expired on {date}.";

  /**
   * Shown in the dropdown details when a rewards payout was reversed.
   *
   * @uiName Reward reversed text
   */
  @Prop() rewardReversedText: string = "Payout reversed on {date}.";

  /**
   * Shown in the dropdown details when a reward was blocked during payout.
   *
   * @uiName Reward blocked text
   */
  @Prop() rewardBlockedText: string = "Payout blocked on {date}.";

  /**
   * Shown in the dropdown details when a reward was denied during payout.
   *
   * @uiName Reward denied text
   */
  @Prop() rewardDeniedText: string = "Payout denied by PayPal on {date}.";

  /**
   * Shown in the dropdown details when a reward has an expiry date.
   *
   * @uiName Reward expiring text
   */
  @Prop() expiringText: string = "Expiring in";

  /**
   * Shown in the dropdown details when a reward is pending.
   *
   * @uiName Reward pending text
   */
  @Prop() pendingForText: string = "{status} for {date}";

  /**
   * @uiName Hide dropdown details of reward
   * @default
   */
  @Prop() hideDetails: boolean = false;

  /**
   * @undocumented
   */
  @Prop() integrationDomain: string =
    "https://paypal-payouts-staging.herokuapp.com/graphql";

  @State() integrationBaseUnits: string[] | undefined = undefined;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral, locale: string, mintRenderer) {
    if (mintRenderer) {
      return mintRenderer("sqp-rewards-cell", {
        rewards: data.rewards,
        statusText: this.statusText,
        statusLongText: this.statusLongText,
        fuelTankText: this.fuelTankText,
        rewardReceivedText: this.rewardReceivedText,
        expiringText: this.expiringText,
        pendingForText: this.pendingForText,
        hideDetails: this.hideDetails,
        locale: locale,
        rewardPaidOutText: this.rewardPaidOutText,
        rewardPayoutInProgressText: this.rewardPayoutInProgressText,
        rewardPayoutFailedText: this.rewardPayoutFailedText,
        rewardDeniedText: this.rewardDeniedText,
      });
    }
    return (
      <sqp-rewards-cell
        rewards={data.rewards}
        statusText={this.statusText}
        statusLongText={this.statusLongText}
        fuelTankText={this.fuelTankText}
        rewardReceivedText={this.rewardReceivedText}
        expiringText={this.expiringText}
        pendingForText={this.pendingForText}
        hideDetails={this.hideDetails}
        locale={locale}
        rewardPaidOutText={this.rewardPaidOutText}
        rewardPayoutInProgressText={this.rewardPayoutInProgressText}
        rewardPayoutFailedText={this.rewardPayoutFailedText}
        rewardDeniedText={this.rewardDeniedText}
      ></sqp-rewards-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer, mintRenderer) {
    if (mintRenderer) {
      return mintRenderer("sqp-rewards-cell", {
        rewards: data.rewards,
        statusText: this.statusText,
        statusLongText: this.statusLongText,
        fuelTankText: this.fuelTankText,
        rewardReceivedText: this.rewardReceivedText,
        expiringText: this.expiringText,
        pendingForText: this.pendingForText,
        hideDetails: this.hideDetails,
        rewardPaidOutText: this.rewardPaidOutText,
        rewardPayoutInProgressText: this.rewardPayoutInProgressText,
        rewardPayoutFailedText: this.rewardPayoutFailedText,
        rewardDeniedText: this.rewardDeniedText,
      });
    }

    return (
      <sqp-rewards-cell
        rewards={data.rewards}
        statusText={this.statusText}
        statusLongText={this.statusLongText}
        fuelTankText={this.fuelTankText}
        rewardReceivedText={this.rewardReceivedText}
        expiringText={this.expiringText}
        pendingForText={this.pendingForText}
        hideDetails={this.hideDetails}
        rewardPaidOutText={this.rewardPaidOutText}
        rewardPayoutInProgressText={this.rewardPayoutInProgressText}
        rewardPayoutFailedText={this.rewardPayoutFailedText}
        rewardDeniedText={this.rewardDeniedText}
      ></sqp-rewards-cell>
    );
  }

  async setIntegrationBaseUnits() {
    const tenantAlias = useTenantAlias();
    const token = useToken();
    const managedIdentityClient: GraphQLClient = memoizedGraphQLClient(
      this.integrationDomain,
      tenantAlias,
      token
    );
    const res = await managedIdentityClient.request(GET_INTEGRATION_STATUS);
    this.integrationBaseUnits = res?.tenantConfig?.baseUnits || [];
  }

  render() {
    if (!this.integrationBaseUnits) this.setIntegrationBaseUnits();
    useRequestRerender([
      this.columnTitle,
      this.statusText,
      this.statusLongText,
      this.fuelTankText,
      this.rewardReceivedText,
      this.expiringText,
      this.pendingForText,
      this.hideDetails,
      this.rewardPaidOutText,
      this.rewardPayoutInProgressText,
      this.rewardPayoutFailedText,
      this.rewardDeniedText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
