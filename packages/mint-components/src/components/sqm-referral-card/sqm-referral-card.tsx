import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ReferralCardView } from "./sqm-referral-card-view";

/**
 * @uiName Card Feed
 */
@Component({
  tag: "sqm-referral-card",
  shadow: true,
})
export class CardFeed {
  @State()
  ignored = true;

  /**
   * @uiName Card Width
   */
  @Prop()
  width: number = 347;

  /**
   * @uiName Column Gap
   * @uiType number
   */
  @Prop() gap: number = 24;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <div> Hello World!</div>;
  }
}
