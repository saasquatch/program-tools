import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { PayoutDetailsCardView } from "./sqm-payout-details-card-view";
import { usePayoutDetailsCard } from "./usePayoutDetailsCard";

/**
 * @uiName Payout Details Card
 * @exampleGroup Tax and Cash Components
 */
@Component({
  tag: "sqm-payout-details-card",
  shadow: true,
})
export class PayoutDetailsCard {
  @Prop()
  statusBadgeText: string =
    "{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} }";
  @Prop() thresholdPayoutText: string = "Next payout occurs when balance is";
  @Prop() accountText: string = "Account";
  @Prop() errorTitleText: string =
    "There was an error with your payout infomation";
  @Prop()
  errorDescriptionText: string =
    "Please ensure your payout information is correct. If this problem continues, contact Support.";

  /**
   * @undocumented
   */
  @Prop() demoData?: DemoData<any>;
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    return {
      statusBadgeText: this.statusBadgeText,
      thresholdPayoutText: this.thresholdPayoutText,
      accountText: this.accountText,
      errorTitleText: this.errorTitleText,
      errorDescriptionText: this.errorDescriptionText,
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
        status: "nextPayout",
        payoutType: "BANK_TRANSFER",
        nextPayoutDate: "March 14, 2024",
        paypalEmailAddress: "joesmith@example.com",
        otherCurrencies: false,
        hasW9Pending: false,
        hasDatePending: true,
        cardNumberPreview: "2381",
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
