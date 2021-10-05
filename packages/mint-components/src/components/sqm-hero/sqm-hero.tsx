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
  /** @uiName Background image or color */
  @Prop() background?: string;

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
        leftColumn: <slot name="left-column" />,
        rightColumn: <slot name="right-column" />,
      },
    };

    return (
      <HeroView {...props}>
        <slot></slot>
      </HeroView>
    );
  }
}
