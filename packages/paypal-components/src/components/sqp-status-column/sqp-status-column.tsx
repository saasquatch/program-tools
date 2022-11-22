import {
  useQuery,
  useTenantAlias,
  useToken,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop, State } from "@stencil/core";
import { gql, GraphQLClient } from "graphql-request";
import { useRequestRerender } from "../../tables/re-render";
import { memoizedGraphQLClient } from "../sqp-graphql-client-provider/useGraphQLClient";
import { RewardTableColumn } from "./RewardTableColumn";

const GET_INTEGRATION_STATUS = gql`
  query userPaymentPreview {
    tenantConfig {
      baseUnits
    }
  }
`;

/**
 * @uiName PayPal Reward Table Status Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup PayPal Components
 * @example Reward Table Status Column - <sqp-status-column></sqp-status-column>
 */
@Component({
  tag: "sqp-status-column",
  shadow: true,
})
export class RewardTablePayPalStatusColumn implements RewardTableColumn {
  /**
   * @uiName Column Title
   */
  @Prop() columnTitle: string = "Status";

  /**
   * @uiName Reward Status Text
   * @uiWidget textArea
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} EXPIRED {Expired} REDEEMED {Redeemed} PENDING {Pending} SUCCESS {Paid out} FAILED {Failed} PAYPAL_PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} DENIED {Denied} other {Not available}  }";

  /**
   * Displayed below the status pill when a reward has been paid out.
   *
   * @uiName Reward Paid Out Text
   */
  @Prop() rewardPaidOutText: string = "Paid out on";

  /**
   * Displayed below the status pill when a reward is being paid out.
   *
   * @uiName Reward Payout In Progress Text
   */
  @Prop() rewardPayoutInProgressText: string = "Payout process started on";

  /**
   * Displayed below the status pill when a reward payout has failed.
   *
   * @uiName Reward Payout Failed Text
   */
  @Prop() rewardPayoutFailedText: string =
    "This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on";

  /**
   * Displayed below the status pill when a reward was paid out but is unclaimed.
   *
   * @uiName Reward Unclaimed Text
   */
  @Prop() rewardUnclaimedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expires on";

  /**
   * Displayed below the status pill when a reward was placed on hold during payout.
   *
   * @uiName Reward On Hold Text
   */
  @Prop() rewardOnHoldText: string = "Payout on hold and in review since";

  /**
   * Displayed below the status pill when a reward was refunded after payout.
   *
   * @uiName Reward Refunded Text
   */
  @Prop() rewardRefundedText: string = "Payout refunded on";

  /**
   * Displayed below the status pill when a reward was returned after payout.
   *
   * @uiName Reward Returned Text
   */
  @Prop() rewardReturnedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expired on";

  /**
   * Displayed below the status pill when a rewards payout was reserved.
   *
   * @uiName Reward Reversed Text
   */
  @Prop() rewardReversedText: string = "Payout reversed on";

  /**
   * Displayed below the status pill when a reward was blocked during payout.
   *
   * @uiName Reward Blocked Text
   */
  @Prop() rewardBlockedText: string = "Payout blocked on";

  /**
   * Displayed below the status pill when a reward was denied during payout.
   *
   * @uiName Reward Denied Text
   */
  @Prop() rewardDeniedText: string = "Payout denied by PayPal on";
  /**
   * Text shown before the date of an expiring reward.
   *
   * @uiName Expiry Date Prefix
   */
  @Prop() expiryText: string = "Expires on ";
  /**
   * Displayed when a reward is pending due to W9 compliance.
   *
   * @uiName W9 Pending Text
   */
  @Prop() pendingUsTax: string = "W-9 required";

  /**
   * Text shown before the available date of a pending reward.
   *
   * @uiName Pending Date Prefix
   */
  @Prop() pendingScheduled: string = "Until";

  /**
   * Displayed when fulfillment error occured when creating a reward.
   *
   * @uiName Unhandled Error Text
   */
  @Prop() pendingUnhandled: string = "Fulfillment error";

  /**
   * @uiName Integration Domain
   */
  @Prop() integrationDomain: string =
    "https://paypal-payouts-staging.herokuapp.com/graphql";

  @State() integrationBaseUnits: string[] | undefined = undefined;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, locale: string, mintRenderer) {
    if (mintRenderer) {
      return mintRenderer("sqp-status-cell", {
        statusText: this.statusText,
        reward: data,
        expiryText: this.expiryText,
        pendingScheduled: this.pendingScheduled,
        pendingUsTax: this.pendingUsTax,
        pendingUnhandled: this.pendingUnhandled,
        locale: locale,
        rewardPaidOutText: this.rewardPaidOutText,
        rewardPayoutInProgressText: this.rewardPayoutInProgressText,
        rewardPayoutFailedText: this.rewardPayoutFailedText,
        rewardUnclaimedText: this.rewardUnclaimedText,
        rewardDeniedText: this.rewardDeniedText,
        baseUnits: this.integrationBaseUnits,
      });
    } else {
      return (
        <sqp-status-cell
          statusText={this.statusText}
          reward={data}
          expiryText={this.expiryText}
          pendingScheduled={this.pendingScheduled}
          pendingUsTax={this.pendingUsTax}
          pendingUnhandled={this.pendingUnhandled}
          locale={locale}
          rewardPaidOutText={this.rewardPaidOutText}
          rewardPayoutInProgressText={this.rewardPayoutInProgressText}
          rewardPayoutFailedText={this.rewardPayoutFailedText}
          rewardUnclaimedText={this.rewardUnclaimedText}
          rewardDeniedText={this.rewardDeniedText}
          baseUnits={this.integrationBaseUnits}
        ></sqp-status-cell>
      );
    }
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
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
      this.expiryText,
      this.pendingScheduled,
      this.pendingUsTax,
      this.pendingUnhandled,
      this.rewardPaidOutText,
      this.rewardPayoutInProgressText,
      this.rewardPayoutFailedText,
      this.rewardDeniedText,
      this.integrationBaseUnits,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}