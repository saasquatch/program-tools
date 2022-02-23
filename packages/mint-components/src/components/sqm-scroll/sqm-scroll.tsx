import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";
import { useScroll } from "./useScroll";
import { createStyleSheet } from "../../styling/JSS";

/**
 * @uiName Scroll
 */
@Component({
  tag: "sqm-scroll",
  shadow: true,
})
export class Scroll {
  @State()
  ignored = true;

  /**
   * @uiName Button Type
   * @uiType string
   * @uiEnum ["default", "primary", "success", "neutral", "warning", "danger", "text"]
   * @uiEnumNames ["Default", "Primary", "Success", "Neutral", "Warning", "Danger", "Text"]

   */
  @Prop() buttonType:
    | "default"
    | "primary"
    | "success"
    | "neutral"
    | "warning"
    | "danger"
    | "text" = "default";

  /**
   * @uiName Button Text
   */
  @Prop() buttonText: string;

  /**
   * @uiName Scroll Tag Name
   */
  @Prop() scrollTagName?: string;

  /**
   * @uiName Scroll Id
   */
  @Prop() scrollId?: string;

  /**
   * @uiName Scroll Animation Style
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
   * @uiName Icon Slot
   * @uiType string
   * @uiEnum ["prefix", "suffix"]
   * @uiEnumNames ["Prefix", "Suffix"]
   */
  @Prop() iconSlot: string;

  /**
   * @uiName Icon Name
   */
  @Prop() iconName: string;

  /**
   * The button becomes full width if the screen size is smaller than 500px
   *
   * @uiName Full Width on Mobile
   */
  @Prop() mobile?: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { callbacks } = useScroll(this);
    const outlineColor = this.buttonType ?? "primary";
    const style = {
      Button: {
        "& .outline": {
          "&::part(base)": {
            color: "var(--sl-color-" + outlineColor + "-500)",
            borderColor: "var(--sl-color-" + outlineColor + "-500)",
            backgroundColor: "transparent",
            "&:hover": {
              color: "var(--sl-color-primary-text)",
              backgroundColor: "var(--sl-color-" + outlineColor + "-500)",
            },
          },
        },
        "& .neutral": {
          "&::part(base)": {
            color: "var(--sl-color-primary-text)",
            background: "var(--sl-color-neutral-500)",
            "&:hover": {
              opacity:"0.8"
            },
          },
        },
        "& .mobile": {
          "@media (max-width: 499px)": {
            width: "100%",
          },
        },
      },
    };

    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();

    const vanillaStyle = `
		:host{
			display: contents;
		}
		${
      this.mobile &&
      `
		@media only screen and (max-width: 499px) {
			:host {
				display: block;
				width: 100%;
			}
		}
	  `
    }
	`;

    let classStack = "";
    if (this.outline && this.buttonType != "default") classStack += "outline ";
    if (this.buttonType === "neutral") classStack += "neutral ";
    if (this.mobile) classStack += "mobile ";

    return (
      <div class={sheet.classes.Button}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        <sl-button
          type={this.buttonType}
          onClick={callbacks.scroll}
          size={this.size}
          pill={this.pill}
          circle={this.circle}
          class={classStack}
        >
          {(this.iconSlot || this.iconName) && (
            <sl-icon
              slot={this.iconSlot || "prefix"}
              name={this.iconName}
            ></sl-icon>
          )}
          {this.buttonText}
          <slot />
        </sl-button>
      </div>
    );
  }
}
