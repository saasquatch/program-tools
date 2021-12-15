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
   * @uiName Horizontal Gap
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() gap: string = "xx-large";

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
