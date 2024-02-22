import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";

/**
 * @uiName Payout Details Card
 * @exampleGroup Tax and Cash Components
 */
@Component({
  tag: "sqm-payout-details-card",
  shadow: true,
})
export class PayoutDetailsCard {
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    return {};
  }

  render() {
    return <Host></Host>;
  }
}

function useDemoPayoutDetailsCard() {
  return {};
}
