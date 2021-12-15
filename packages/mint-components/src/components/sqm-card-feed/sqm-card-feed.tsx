import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { CardFeedView } from "./sqm-card-feed-view";

/**
 * @uiName Program Explainer
 */
@Component({
  tag: "sqm-card-feed",
  shadow: true,
})
export class CardFeed {
  @State()
  ignored = true;

  /**
   * @uiName Header Text
   */
  @Prop() header: string;

  /**
   * @uiName Header Text Color
   * @uiWidget color
   */
  @Prop() headerColor: string;

  /**
   * @uiName Header Background Color
   * @uiWidget color
   */
  @Prop() headerBackground: string;

  /**
   * @uiName Card Title
   */
  @Prop() cardTitle: string;

  /**
   * @uiName Card Description
   */
  @Prop() cardDescription: string;

  /**
   * @uiName Card Text Color
   * @uiWidget color
   */
  @Prop() cardColor: string;

  /**
   * @uiName Card Background Color
   * @uiWidget color
   */
  @Prop() cardBackground: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    // return (
    //   <CardFeedView {...getProps(this)}>
    //     <slot />
    //   </CardFeedView>
    // );
  }
}
