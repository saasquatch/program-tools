import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";
import { useScroll } from "./useScroll";
import { createStyleSheet } from "../../styling/JSS";

/**
 * @uiName Scroll Button
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero","sqm-tab","sqb-program-section","sqb-conditional-section"]
 * @slots [{"name":"", "title":"Button Content"}]
 * @slotEditor richText
 */
@Component({
  tag: "sqm-scroll",
  shadow: true,
})
export class Scroll {
  @State()
  ignored = true;

  /**
   * @uiName Button text
   */
  @Prop() buttonText: string;

  /**
   * The name of the HTML tag you would like to scroll to. E.g referral-table
   *
   * @uiName Scroll tag name
   */
  @Prop() scrollTagName?: string;

  /**
   * ID applied to the HTML tag you would like to scroll to. E.g tab-1
   *
   * @uiName Scroll ID
   */
  @Prop() scrollId?: string;

  /**
   * @uiName Scroll animation style
   * @uiType string
   * @uiEnum ["smooth", "auto"]
   * @uiEnumNames ["Smooth", "Auto"]
   */
  @Prop() scrollAnimation: "smooth" | "auto" = "smooth";

  /**
   * @uiName Size
   * @uiType string
   * @uiEnum ["small", "medium", "large"]
   * @uiEnumNames ["Small", "Medium", "Large"]
   */
  @Prop() size: string;

  /**
   * Draws an outlined button.
   *
   * @uiName Outline
   */
  @Prop() outline: boolean;

  /**
   * Draws a pill-style button with rounded edges.
   *
   * @uiName Pill
   */
  @Prop() pill: boolean;

  /**
   * Draws a circle button.
   *
   * @uiName Circle
   */
  @Prop() circle: boolean;

  /**
   * @uiName Icon slot
   * @uiType string
   * @uiEnum ["prefix", "suffix"]
   * @uiEnumNames ["Prefix", "Suffix"]
   */
  @Prop() iconSlot: string;

  /**
   * Full list of valid icon names available in the [Shoelace Icon Library](https://shoelace.style/components/icon). This value is case sensitive.
   * @uiName Icon
   */
  @Prop() iconName: string;

  /**
   * The button becomes full width if the screen size is smaller than 500px
   *
   * @uiName Full width on mobile
   */
  @Prop() mobile?: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { callbacks } = useScroll(this);
    const vanillaStyleString = `
    *::part(secondarybutton-base),
    sl-button[type="secondary"]::part(base) {
      font-family: var(--sqm-primary-font);
      background-color: var(--sqm-secondary-button-background);
      color: var(--sqm-secondary-button-color);
      border-color: var(--sqm-secondary-button-color-border);
      border-radius: var(--sqm-secondary-button-radius);
    }

    *::part(secondarybutton-base):hover,
    sl-button[type="secondary"]::part(base):hover {
      background-color: var(--sqm-secondary-button-background-hover);
      color: var(--sqm-secondary-button-color-hover);
      border-color: var(--sqm-secondary-button-border-color-hover);
    }
  `;
    return (
      <sl-button
        type="secondary"
        exportparts="base: secondarybutton-base"
        onClick={callbacks.scroll}
        size={this.size}
        pill={this.pill}
        circle={this.circle}
      >
        <style type="text/css">{vanillaStyleString}</style>
        {(this.iconSlot || this.iconName) && (
          <sl-icon
            slot={this.iconSlot || "prefix"}
            name={this.iconName}
          ></sl-icon>
        )}
        {this.buttonText}
        <slot />
      </sl-button>
    );
  }
}
