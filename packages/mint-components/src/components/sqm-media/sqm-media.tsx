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
   * @uiName Overlay Color
   */
  @Prop() overlayColor: string = "var(--sl-color-primary-900)";

  /**
   * @uiName Overlay Opacity
   */
  @Prop() overlayOpacity: string = "0.75";

  /**
   * @uiName Text Color
   */
  @Prop() textColor?: string;

  /**
   * @uiName Background Color
   */
  @Prop() backgroundColor?: string;

  /**
   * @uiName Minimum Image Height
   */
  @Prop() minHeight: string = "300px";

  /**
   * @uiName Image Link
   * @uiType string
   * @uiEnum ["overlay", "columns" ]
   * @uiEnumNames ["Overlay", "Two-column"]
   */
  @Prop() layout: "overlay" | "columns" = "overlay";

  /**
   * @uiName Image Position
   * @uiType string
   * @uiEnum ["left", "right" ]
   * @uiEnumNames ["Left", "Right"]
   */
  @Prop() imagePos: "left" | "right" = "left";

  /**
   * @uiName Image Mobile Position
   * @uiType string
   * @uiEnum ["top", "bottom" ]
   * @uiEnumNames ["Top", "Bottom"]
   */
  @Prop() imageMobilePos: "top" | "bottom" = "top";

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
