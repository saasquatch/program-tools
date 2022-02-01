import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { getProps } from "../../utils/utils";
import { HeroImageView } from "./sqm-hero-image-view";

/**
 * @uiName Hero Image
 */
@Component({
  tag: "sqm-hero-image",
  shadow: true,
})
export class HeroImage {
  /**
   * @uiName Image Link
   */
  @Prop() imageUrl: string;

  /**
   * @uiName Minimum Image Height
   */
  @Prop() minHeight?: string;

  /**
   * @uiName Maximum Image Height
   */
  @Prop() maxHeight?: string;

  /**
   * @uiName Maximum Image Width
   */
  @Prop() maxWidth: string = "100%";

  /**
   * @uiName Overlay Color
   * @uiWidget color
   */
  @Prop() overlayColor: string = "var(--sl-color-primary-900)";

  /**
   * @uiName Overlay Opacity
   */
  @Prop() overlayOpacity: string = "0.75";

  /**
   * @uiName Text Color
   * @uiWidget color
   */
  @Prop() textColor?: string;

  /**
   * @uiName Background Color
   * @uiWidget color
   */
  @Prop() backgroundColor?: string;

  /**
   * @uiName Image Link
   * @uiType string
   * @uiEnum ["overlay", "columns"]
   */
  @Prop() layout: "overlay" | "columns" = "overlay";

  /**
   * @uiName Image Percentage
   * @uiType number
   */
  @Prop() imagePercentage: number = 50;

  /**
   * @uiName Image Position
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  @Prop() imagePos: "left" | "center" | "right" = "center";

  /**
   * @uiName Image Mobile Position
   * @uiType string
   * @uiEnum ["top", "bottom"]
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

  /**
   * @uiName Padding Text
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() paddingText: Spacing = "xxxx-large";

  /**
   * @uiName Padding Image
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() paddingImage: Spacing = "none";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <HeroImageView {...getProps(this)}>
        <slot />
      </HeroImageView>
    );
  }
}
