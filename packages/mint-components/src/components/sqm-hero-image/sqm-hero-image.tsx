import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { getProps } from "../../utils/utils";
import { HeroImageView } from "./sqm-hero-image-view";

/**
 * @uiName Hero Image
 * @validParents ["sqm-portal-container","sqm-brand", "div"]
 * @exampleGroup Common Components
 * @example Two Column Hero Image - <sqm-hero-image image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png" header="MyCompany Rewards" description="Refer a friend and earn up to $1200 in rewards" layout="columns" image-pos="right" background-color="#F9F9F9"></sqm-hero-image>
 * @example Overlay Hero Image - <sqm-hero-image image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png" header="MyCompany Rewards" description="Refer a friend and earn up to $1200 in rewards" layout="overlay" image-pos="center" background-color="#F9F9F9" button-link="https://www.example.com" button-new-tab button-text="Earn!" image-percentage="45" overlay-opacity=".5" padding-image="small" padding-text="xxxx-large"></sqm-hero-image>
 */
@Component({
  tag: "sqm-hero-image",
  shadow: true,
})
export class HeroImage {
  /**
   * @uiWidget ImageUpload
   * @format url
   * @uiName Image
   */
  @Prop() imageUrl: string;

  /**
   * @uiName Overlay color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() overlayColor?: string;

  /**
   * @uiName Overlay opacity
   * @uiGroup Style
   */
  @Prop() overlayOpacity: string = "0.75";

  /**
   * @uiName Text color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() textColor?: string;

  /**
   * @uiName Background color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() backgroundColor?: string;

  /**
   * @uiName Image layout
   * @uiType string
   * @uiEnum ["overlay", "columns"]
   * @uiEnumNames ["Overlay", "Two-column"]
   * @uiGroup Style
   */
  @Prop() layout: "overlay" | "columns" = "overlay";

  /**
   * @uiName Image percentage
   * @uiType number
   * @uiGroup Style
   */
  @Prop() imagePercentage: number = 50;

  /**
   * @uiName Image position
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   * @uiGroup Style
   */
  @Prop() imagePos: "left" | "center" | "right" = "center";

  /**
   * @uiName Image mobile position
   * @uiType string
   * @uiEnum ["top", "bottom"]
   * @uiEnumNames ["Top", "Bottom"]
   * @uiGroup Style
   */
  @Prop() imageMobilePos: "top" | "bottom" = "top";

  /**
   * @uiName Title
   */
  @Prop() header?: string;

  /**
   * @uiName Description
   * @uiWidget textArea
   */
  @Prop() description?: string;

  /**
   * @uiName Button text
   */
  @Prop() buttonText?: string;

  /**
   * @uiName Button link
   */
  @Prop() buttonLink?: string;

  /**
   * @uiName Open link in new tab
   * @default
   */
  @Prop() buttonNewTab?: boolean = false;

  /**
   * @uiName Text padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   * @uiGroup Style
   */
  @Prop() paddingText: Spacing = "xxxx-large";

  /**
   * @uiName Image padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   * @uiGroup Style
   */
  @Prop() paddingImage: Spacing = "none";

  /**
   * The type of the button (primary or secondary) that will be used to copy the link.
   * @uiName Button Type
   * @uiType string
   * @uiEnum ["primary", "secondary"]
   * @uiEnumNames ["Primary", "Secondary"]
   * @uiGroup Style
   */
  @Prop()
  buttonType?: "primary" | "secondary" = "primary";

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
