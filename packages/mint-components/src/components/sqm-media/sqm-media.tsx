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
   * @uiName Title
   */
  @Prop() imgUrl: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <MediaView {...getProps(this)} />;
  }
}
