import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ImageView } from "./sqm-image-view";

/**
 * @uiName Image
 * @exampleGroup Common Components
 * @example Image - <sqm-image image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png" alignment="center"></sqm-image>
 */
@Component({
  tag: "sqm-image",
  shadow: true,
})
export class Image {
  /**
   * @uiWidget ImageUpload
   * @format url
   * @required
   * @uiName Image link
   */
  @Prop() imageUrl: string;

  /**
   * @uiName Position alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() alignment: "left" | "center" | "right" = "center";

  /**
   * @uiName Background color
   * @uiWidget color
   * @format color
   */
  @Prop() backgroundColor: string;

  /**
   * (Optional) Helps with constraining the minimum image size. Can be a pixel value or a percentage i.e. "500px", "33%", etc.
   * @uiName Minimum height
   */
  @Prop() minHeight?: string;

  /**
   * (Optional) Constrains the width of the image. Can be a pixel value or a percentage i.e. "500px", "33%", etc.
   * @uiName Width
   */
  @Prop() width?: string;

  render() {
    return <ImageView {...getProps(this)} />;
  }
}
