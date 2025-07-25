import { Component, h, Prop } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { HeroView } from "./sqm-hero-view";
import { getProps } from "../../utils/utils";

/**
 * @uiName Hero Layout
 * @validParents ["sqm-portal-container","sqm-brand","div", "template", "sqb-auth-template-switch", "div","sqm-divided-layout","template","sqm-tab","sqb-program-section","sqb-conditional-section"]
 * @slots [{"name":"","title":"Primary Column Content"},{"name":"secondary-column","title":"Secondary Column Content"}]
 * @example Two Column Hero Layout - <sqm-hero background="https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1939&amp;q=80" min-height="0" columns="2" padding-size="large" wrap-direction="wrap" secondary-background="lightgrey"><h1>Primary Column Content</h1><h1 slot="secondary-column">Secondary Column Content</h1></sqm-hero>
 * @exampleGroup Layout
 */
@Component({
  tag: "sqm-hero",
  shadow: true,
})
export class Hero {
  /**
   *
   * @uiName Columns
   * @uiEnum [1, 2]
   * @uiEnumNames ["One", "Two"]
   */
  @Prop() columns: 1 | 2 = 1;

  /**
   * Minimum height of each column including when they are stacked on mobile
   *
   * @uiName Minimum height (in px)
   */
  @Prop() minHeight: number = 200;

  /**
   * Can be an image url, colour or Shoelace variable.
   *
   * @uiName Background
   * @uiWidget Background
   */
  @Prop() background?: string = "var(--sl-color-gray-50)";

  /**
   * @uiName Padding size
   * @uiEnum ["none", "small", "medium","large"]
   * @uiEnumNames ["None", "Small", "Medium", "Large"]
   */
  @Prop() paddingSize: "none" | "small" | "medium" | "large" = "large";

  /**
   * Secondary background image or color (for use in the right column)
   *
   * @uiName Secondary background
   * @uiWidget Background
   */
  @Prop() secondaryBackground?: string;

  /**
   * Flexbox wrap direction, accepts wrap or wrap-reverse
   *
   * @uiName Wrap direction
   * @uiEnum ["wrap", "wrap-reverse"]
   * @uiEnumNames ["Wrap", "Wrap Reverse"]
   */
  @Prop() wrapDirection: "wrap" | "wrap-reverse" = "wrap";

  /**
   * @uiName Hide the column in mobile view (can only be used when two columns are present)
   */
  @Prop() columnToHideInMobile?: "primary" | "secondary" | null = null;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  // TODO: Improve empty slot behavior with useChildElements to check for empty slot

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
