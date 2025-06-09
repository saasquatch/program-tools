import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
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
  /**
   * Badge text indicating payout status
   * @uiName Payout badge status text
   */
  @Prop()
  statusBadgeText: string =
    "{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} }";
  /**
   * Display participants' payout preference on the payout information card, indicating the balance at which they want to get paid.
   * @uiName Payout schedule by threshold text
   */
  @Prop() thresholdPayoutText: string =
    "Next payout occurs when balance is {thresholdBalance}";
  /**
   * Shown before the participant’s bank account information.
   * @uiName Bank account field label
   */
  @Prop() accountText: string = "Account";
  /**
   * Text displayed for existing publishers that do not have saved banking information.
   * @uiName Payout missing information subtext
   */
  @Prop() payoutMissingInformationText: string =
    "Missing banking information, go to Impact.com to resolve.";

  /**
   * @componentState { "title": "Loading", "props": { "states": { "loading": true } } }
   */
  @Prop() stateController?: string = "{}";

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
