import { Component, h, Prop } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { HeroView } from "./sqm-hero-view";
import { getProps } from "../../utils/utils";


/**
 * The hero container
 *
 * @uiName Hero
 */
@Component({
  tag: "sqm-hero",
  shadow: true,
})
export class Hero {
  /** @uiName Number of columns in the layout */
  @Prop() columns: 1 | 2;

  /** @uiName Hero image */
  @Prop() backgroundImage?: string;

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
    return <HeroView {...props}><slot></slot></HeroView>;
  }
}
