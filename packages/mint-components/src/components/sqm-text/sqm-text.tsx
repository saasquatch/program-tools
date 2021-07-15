import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { TextView } from "./sqm-text-view";
import { getProps } from "../../utils/utils";

/**
 * @uiName Text
 */
@Component({
  tag: "sqm-text",
  shadow: true,
})
export class Text {
  @State()
  ignored = true;

  /**@uiName Text style */
  @Prop() type: "p" | "pLight" | "h1" | "h2" | "h3" = "p";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <TextView {...getProps(this)}>
        <slot />
      </TextView>
    );
  }
}
