import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";
import { useScroll } from "./useScroll";
import { createStyleSheet } from "../../styling/JSS";

@Component({
  tag: "sqm-scroll",
  shadow: true,
})
export class Scroll {
  @State()
  ignored = true;

  @Prop() buttonType:
    | "default"
    | "primary"
    | "success"
    | "neutral"
    | "warning"
    | "danger"
    | "text" = "default";
  @Prop() buttonText: string;
  @Prop() scrollTagName?: string;
  @Prop() scrollId?: string;
  @Prop() scrollAnimation: "smooth" | "auto" = "smooth";
  @Prop() mobileFriendly?: boolean;

  // SL Default Props
  //   @Prop() variant: string; // our version of SL uses 'type' in sl-button
  @Prop() size: string;
  @Prop() outline: boolean;
  @Prop() pill: boolean;
  @Prop() href: string;
  @Prop() circle: boolean;
  @Prop() name: string;
  @Prop() target: string;
  @Prop() download: string;
  @Prop() disabled: boolean;
  @Prop() caret: boolean;
  @Prop() loading: boolean;
  @Prop() iconSlot: string;
  @Prop() iconName: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { callbacks } = useScroll(this);

    const style = {
      Button: {
        "& .outline": {
          "&::part(base)": {
            color: "var(--sl-color-primary-500)",
            borderColor: "var(--sl-color-primary-500)",
            backgroundColor: "transparent",
            "&:hover": {
              color: "var(--sl-color-primary-text)",
              backgroundColor: "var(--sl-color-primary-500)",
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
			display: block;
		}
		${
      this.mobileFriendly &&
      `
		@media only screen and (max-width: 499px) {
			:host {
				width: 100%;
			}
		}
	  `
    }
	`;

    let classStack = "";
    if (this.outline) classStack += "outline ";
    if (this.mobileFriendly) classStack += "mobile ";

    return (
      <div class={sheet.classes.Button}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        <sl-button
          type={this.outline ? "primary" : this.buttonType}
          onClick={callbacks.scroll}
          size={this.size}
          pill={this.pill}
          href={this.href}
          circle={this.circle}
          name={this.name}
          target={this.target}
          download={this.download}
          disabled={this.disabled}
          caret={this.caret}
          loading={this.loading}
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
