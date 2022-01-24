import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ImageView } from "./sqm-image-view";

/**
 * @uiName Card Feed
 */
@Component({
  tag: "sqm-image",
  shadow: true,
})
export class Image {
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
