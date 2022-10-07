import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { getProps } from "../../utils/utils";
import { AccountDetailsView } from "./sqp-account-details-view";
import { useAccountDetails } from "./useAccountDetails";

/**
 * @uiName Paypal Account Details
 * @slots [{"name":"","title":"Form Slot"}]
 * @exampleGroup Paypal Components
 * @example Paypal Account Details - <sqp-account-details header-text="PayPal account" account-label="Account" recent-payment-label="Recent payment" next-payment-label="Next payment" edit-text="Edit"></sqp-account-details>
 */
@Component({
  tag: "sqp-account-details",
})
export class PaypalAccountDetails {
  @State()
  ignored = true;

  /**
   * @uiName Header Text
   */
  @Prop() headerText: string = "PayPal account";
  /**
   * @uiName Account Label
   */
  @Prop() accountLabel: string = "Account";
  /**
   * @uiName Recent Payment Label
   */
  @Prop() recentPaymentLabel: string = "Recent payment";
  /**
   * @uiName Next Payment Label
   */
  @Prop() nextPaymentLabel: string = "Next payment";
  /**
   * @uiName Edit Text
   */
  @Prop() editText: string = "Edit";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const props = useAccountDetails(getProps(this));
    // isDemo() ? useAccountDetailsDemo() : useAccountDetails();

    const formSlot = <slot />;

    return (
      <Host>
        <div style={{ display: props.hasAccount ? "none" : "block" }}>{formSlot}</div>

        <AccountDetailsView {...props}></AccountDetailsView>
      </Host>
    );
  }
}

function useAccountDetailsDemo() {
  return {
    hasAccount: true,
  };
}
