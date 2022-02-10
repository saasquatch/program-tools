import { Component, h, Prop } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { HeroView } from "./sqm-hero-view";
import { getProps } from "../../utils/utils";

/**
 * The hero container
 *
 * @uiName Hero Layout
 */
@Component({
  tag: "sqm-hero",
  shadow: true,
})
export class Hero {
  /** @uiName Number of columns in the layout */
  @Prop() columns: 1 | 2 = 1;

  /** @uiName Background image or color */
  @Prop() background?: string = "var(--sl-color-gray-50)";

  /** @uiName Padding size */
  @Prop() paddingSize: "none" | "small" | "medium" | "large" = "large";

  /** @uiName Secondary background image or color (for use in right column)*/
  @Prop() secondaryBackground?: string;

  /** @uiName Wrap direction */
  @Prop() wrapDirection: "wrap" | "wrap-reverse" = "wrap";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = {
      states: { ...getProps(this) },
      content: {
        primaryColumn: <slot />,
        secondaryColumn: <slot name="secondary-column" />,
      },
    };

    return <HeroView {...props}></HeroView>;
  }
}
