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
  /**
   * Number of columns in the layout
   *
   * @uiName Columns
   */
  @Prop() columns: 1 | 2 = 1;
  /**
   * Can be an image url, colour or Shoelace variable.
   *
   * @uiName Background
   */
  @Prop() background?: string = "var(--sl-color-gray-50)";

  /** @uiName Padding Size */
  @Prop() paddingSize: "none" | "small" | "medium" | "large" = "large";

  /**
   * Secondary background image or color (for use in the right column)
   *
   * @uiName Secondary Background
   */
  @Prop() secondaryBackground?: string;

  /**
   * Flexbox wrap direction, accepts wrap or wrap-reverse
   *
   * @uiName Wrap Direction
   */
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
