import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import {
  autoColorScaleCss,
  autoColorScaleStyleObject,
} from "../sqm-stencilbook/AutoColor";

/**
 *
 * @uiName Big Stat
 * @slot the description of the component
 */
@Component({
  tag: "sqm-brand",
  shadow: true,
})
export class BrandComponent {
  /**
   * Controls the primary brand color used in the Mint Components library. Note that this
   * does not affect vanilla components or other component libraries.
   *
   * @uiName Brand Color
   */
  @Prop() brandColor: string = "#0000FF";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const css = autoColorScaleCss(this.brandColor);
    return (
      <Host>
        <style>{`
          :host{
            display: contents;
          }
          /* Selects any element placed inside a slot */
          ::slotted(*) {
            ${css}
          }`}</style>
        <slot />
      </Host>
    );
  }
}
