import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ImageView } from "./sqm-image-view";

/**
 * @uiName Image
 */
@Component({
  tag: "sqm-image",
  shadow: true,
})
export class Image {
  /**
   * @uiWidget ImageUpload
   * @uiName Image Link
   */
  @Prop() imageUrl: string;

  /**
   * @uiName Position Alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  @Prop() alignment: "left" | "center" | "right" = "center";

  /**
   * @uiName Background Color
   * @uiWidget color
   */
  @Prop() backgroundColor: string;

  /**
   * (optional) Helps with constraining minimum size
   * @uiName Minimum Height
   */
  @Prop() minHeight?: string;

  render() {
    return <ImageView {...getProps(this)} />;
  }
}
