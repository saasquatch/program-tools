import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { PayoutDetailsCardView } from "./sqm-payout-details-card-view";
import { DemoData } from "../../../global/demo";
import deepmerge from "deepmerge";
import { usePayoutDetailsCard } from "./usePayoutDetailsCard";
import { isDemo } from "@saasquatch/component-boilerplate";
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
  @Prop()
  statusBadgeText: "{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} }";
  @Prop() thresholdPayoutText: "Next payout occurs when balance is";
  @Prop() otherCurrenciesText: "other currencies";
  @Prop() w9PendingText: "Awaiting W-9 tax form";
  @Prop() accountText: "Account";
  @Prop() errorTitleText: "There was an error with your payout infomation";
  @Prop()
  errorDescriptionText: "Please ensure your payout information is correct. If this problem continues, contact Support.";

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
    console.log(props);
    return {
      statusBadgeText: props.statusBadgeText,
      thresholdPayoutText: props.thresholdPayoutText,
      otherCurrenciesText: props.otherCurrenciesText,
      w9PendingText: props.w9PendingText,
      accountText: props.accountText,
      errorTitleText: props.errorTitleText,
      errorDescriptionText: props.errorDescriptionText,
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
