import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { PayoutDetailsCardView } from "./sqm-payout-details-card-view";
import { usePayoutDetailsCard } from "./usePayoutDetailsCard";
import { getProps } from "../../../utils/utils";

/**
 * @uiName Payout Details Card
 * @exampleGroup Tax and Cash Components
 */
@Component({
  tag: "sqm-payout-details-card",
  shadow: true,
})
export class PayoutDetailsCard {
  /**
   * Badge text indicating payout status
   * @uiName Payout badge status text
   */
  @Prop()
  statusBadgeText: string =
    "{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} }";
  /**
   * Text shown above current balance indicating required balance for next payout
   * @uiName Threshold payout text
   */
  @Prop() thresholdPayoutText: string =
    "Next payout occurs when balance is {thresholdBalance}";
  /**
   * Text shown before account number
   * @uiName Account text
   */
  @Prop() accountText: string = "Account";
  /**
   * Error alert header shown above payout details card
   * @uiName Error alert header
   */
  @Prop() errorTitleText: string = "Your payout is on hold ";
  /**
   * Error alert description shown above payout details card
   * @uiName Error alert description
   */
  @Prop()
  errorDescriptionText: string =
    "If you’ve recently added your payout information, please wait while we verify your information. If it’s still on hold after a few days, please contact Support or check your inbox for an email from our referral program provider, impact.com.";

  /**
   * @undocumented
   */
  @Prop() demoData?: DemoData<any>;
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);
    return {
      ...props,
      error: {
        errorTitleText: this.errorTitleText,
        errorDescriptionText: this.errorDescriptionText,
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoPayoutDetailsCard(this)
      : usePayoutDetailsCard(this);
    return (
      <Host>
        <PayoutDetailsCardView text={props.text} states={props.states} />
      </Host>
    );
  }
}

function useDemoPayoutDetailsCard(props: PayoutDetailsCard) {
  return deepmerge(
    {
      states: {
        loading: false,
        error: false,
        thresholdBalance: "$50",
        mainCurrency: { currencyText: "USD", amountText: "100.00" },
        badgeStatus: "nextPayout",
        payoutType: "BANK_TRANSFER",
        nextPayoutDate: "March 14, 2024",
        paypalEmailAddress: "joesmith@example.com",
        otherCurrencies: false,
        hasW9Pending: false,
        hasDatePending: true,
        cardNumberPreview: "XX2381",
        balance: "20.00 USD",
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
