import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { LinkButtonView } from "./sqm-link-button-view";

/**
 * @uiName Image
 * @exampleGroup Common Components
 * @example Image - <sqm-image image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png" alignment="center"></sqm-image>
 */
@Component({
  tag: "sqm-link-button",
  shadow: true,
})
export class Image {
  /**
   * @required
   * @uiName User Identification Text
   */
  @Prop() link: string;
  /**
   * @uiName User Identification Text
   */
  @Prop() openInNewTab: boolean = false;

  render() {
    return <LinkButtonView {...getProps(this)} />;
  }
}

//TODO: Write a hook to resolve ICU strings
