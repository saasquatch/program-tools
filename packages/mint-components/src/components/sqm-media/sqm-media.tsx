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
   * @uiName imgUrl
   */
  @Prop() imgUrl?: string;

  /**
   * @uiName width
   */
  @Prop() width?: string;

  /**
   * @uiName height
   */
  @Prop() height?: string;

  /**
   * @uiName objectFit
   */
  @Prop() objectFit?: string;

  /**
   * @uiName header
   */
  @Prop() header?: string;

  /**
   * @uiName description
   */
  @Prop() description?: string;

  /**
   * @uiName imageHeader
   */
  @Prop() imageHeader?: string;

  /**
   * @uiName imageDescription
   */
  @Prop() imageDescription?: string;

  /**
   * @uiName buttonText
   */
  @Prop() buttonText?: string;

  /**
   * @uiName buttonLink
   */
  @Prop() buttonLink?: string;

  /**
   * @uiName buttonNewTab
   */
  @Prop() buttonNewTab?: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <MediaView {...getProps(this)} />;
  }
}
