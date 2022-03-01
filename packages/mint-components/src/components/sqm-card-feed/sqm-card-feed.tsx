import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { CardFeedView } from "./sqm-card-feed-view";

/**
 * @uiName Card Feed
 */
@Component({
  tag: "sqm-card-feed",
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
    return (
      <CardFeedView {...getProps(this)}>
        <slot />
      </CardFeedView>
    );
  }
}
