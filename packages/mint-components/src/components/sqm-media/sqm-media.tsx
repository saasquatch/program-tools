import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { MediaView } from "./sqm-media-view";

/**
 * @uiName Program Explainer Step
 */
@Component({
  tag: "sqm-media",
  shadow: true,
})
export class Media {
  /**
   * @uiName Image Link
   */
  @Prop() imageUrl: string;

  /**
   * @uiName Image Link
   */
  @Prop() overlayColor: string = "var(--sl-color-primary-900)";

  /**
   * @uiName Image Link
   */
  @Prop() overlayOpacity: string = "0.75";

  /**
   * @uiName Image Link
   */
  @Prop() textColor?: string;

  /**
   * @uiName Image Link
   */
  @Prop() minHeight: string = "300px";

  /**
   * @uiName Image Link
   */
  @Prop() layout: "overlay" | "columns" = "overlay";

  /**
   * @uiName Image Link
   */
  @Prop() imagePos: "left" | "right" = "left";

  /**
   * @uiName Image Link
   */
  @Prop() imageMobilePos: "top" | "bottom" = "top";

  /**
   * @uiName Image Link
   */
  @Prop() backgroundColor?: string;

  /**
   * @uiName Title Text
   */
  @Prop() header?: string;

  /**
   * @uiName Description Text
   */
  @Prop() description?: string;

  /**
   * @uiName CTA Button Text
   */
  @Prop() buttonText?: string;

  /**
   * @uiName CTA Button Link
   */
  @Prop() buttonLink?: string;

  /**
   * @uiName CTA Button Link Open in New Tab
   */
  @Prop() buttonNewTab?: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <MediaView {...getProps(this)} />;
  }
}
