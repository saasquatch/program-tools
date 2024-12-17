import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  PayoutButtonScrollView,
  PayoutButtonScrollViewProps,
} from "./sqm-payout-button-scroll-view";
import deepmerge from "deepmerge";

/**
 * @uiName Payout Button Scroll
 */
@Component({
  tag: "sqm-payout-button-scroll",
  shadow: true,
})
export class PayoutButtonScroll {
  /**
   * @uiName Payout button text
   */
  @Prop() payoutButtonText: string = "Payouts & Tax Settings";
  /**
   * Description text under payout button
   * @uiName Payout button description text
   */
  @Prop() payoutButtonDescription: string =
    "Check your payout settings to see when you’ll get paid out next";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PayoutButtonScrollViewProps>;

  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  getTextProps() {
    return getProps(this);
  }

  render() {
    const props = useDemoPayoutButtonScroll(this);

    return <PayoutButtonScrollView {...props} />;
  }
}

function useDemoPayoutButtonScroll(
  props: PayoutButtonScroll
): PayoutButtonScrollViewProps {
  return deepmerge(
    {
      states: {
        payoutSettingsComplete: false,
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
