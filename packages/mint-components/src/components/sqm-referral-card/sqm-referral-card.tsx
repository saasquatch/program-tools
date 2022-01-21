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
   * @uiName Header Text
   */
  @Prop() header: string;

  /**
   * @uiName Description Text
   */
  @Prop() description: string;

  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() padding: Spacing = "large";
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["start", "center", "end"]
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
