import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";
import { ReferralCardView } from "./sqm-referral-card-view";

/**
 * @uiName Referral Card
 */
@Component({
  tag: "sqm-referral-card",
  shadow: true,
})
export class ReferralCard {
  @State()
  ignored = true;

  /**
   * @uiName Vertical Aligment
   * @uiType string
   * @uiEnum ["start", "center", "end"]
   * @uiEnumNames ["Start", "Center", "End"]
   */
  @Prop() verticalAlignment: "start" | "center" | "end" = "start";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const slots = {
      left: <slot name="left" />,
      right: <slot name="right" />,
    };

    return (
      <ReferralCardView {...getProps(this)} slots={slots}>
        <slot />
      </ReferralCardView>
    );
  }
}
