import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ImageView } from "./sqm-image-view";

/**
 * @uiName Image Component
 */
@Component({
  tag: "sqm-image",
  shadow: true,
})
export class Image {
  /**
   * @uiName Image Link
   */
  @Prop() imageUrl: string;

  /**
   * @uiName Left Margin
   */
  @Prop() left: string;

  /**
   * @uiName Right Margin
   */
  @Prop() right: string;

  /**
   * @uiName Position Alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  @Prop() align: "left" | "center" | "right" = "center";

  /**
   * @uiName Background Color
   */
  @Prop() backgroundColor: string;

  /**
   * (optional) Helps with constraining minimum size
   * @uiName Min Height
   */
  @Prop() minHeight?: string;

  /**
   * (optional) Helps with constraining maximum size
   * @uiName Max Width
   */
  @Prop() maxWidth?: string;

  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <ImageView {...getProps(this)} />;
  }
}
