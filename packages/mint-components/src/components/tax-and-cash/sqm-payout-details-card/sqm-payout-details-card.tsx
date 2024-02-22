import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { PayoutDetailsCardView } from "./sqm-payout-details-card-view";
import { DemoData } from "../../../global/demo";
import deepmerge from "deepmerge";

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
   * @undocumented
   */
  @Prop() demoData?: DemoData<any>;
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    return {
      //TODO: Add props for this text once designs are more fleshed out
      pendingStatusBadgeText: "Pending",
      upcomingStatusBadgeText: "Upcoming",
      nextPayoutStatusBadgeText: "Next payout",
      pendingDetailedStatusText: "Check rewards table for available date",
      upcomingDetailedStatusText: "November 1, 2022",
      nextPayoutDetailedStatusText: "November 1, 2022",
      otherCurrenciesText: "other currencies",
      w9PendingText: "Awaiting W-9 tax form",
    };
  }

  render() {
    const props = useDemoPayoutDetailsCard(this);
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
        empty: false,
        mainCurrency: { currencyText: "USD", amountText: "100.00" },
        status: "upcoming",
        payoutType: "bank",
        otherCurrencies: false,
        hasW9Pending: false,
        hasDatePending: true,
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
