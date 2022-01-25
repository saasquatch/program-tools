import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { useRequestRerender } from "../../tables/re-render";
import { Circle, Gift } from "./SVGs";

/**
 * @uiName Timeline Entry
 */
@Component({
  tag: "sqm-timeline-entry",
  shadow: true,
})
export class TimelineReward {
  @State()
  ignored = true;

  /**
   * @uiName Reward Amount
   */
  @Prop() reward: string;

  /**
   * @uiName Reward Unit
   */
  @Prop() unit: string;

  /**
   * @uiName Description
   */
  @Prop() desc: string;

  /**
   * @undocumented
   */
  @Prop() line?: boolean;

  /**
   * @uiName Icon
   * @uiType string
   * @uiEnum ["gift", "circle"]
   */
  @Prop() icon: string = "gift";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const style = {
      TimelineReward: {
        color: "var(--sl-color-neutral-900)",
        lineHeight: "var(--sl-line-height-dense)",
        "& .container": {
          display: "flex",
        },
        "& .line": {
          color: "transparent",
          userSelect: "none",
          background: "var(--sl-color-primary-300)",
          width: "4px",
          borderRadius: "4px",
          margin: "-2px",
          position: "relative",
          left: "12px",
          transform: "scaleY(0.95)",
          top: "16px",
        },
        "& .step": {
          display: "flex",
          minHeight: "100px",
        },
        "& .icon": {
          position: "relative",
          top: "4px",
          zIndex: "1",
          color: "var(--sl-color-primary-300)",
          marginRight: "var(--sl-spacing-large)",
        },
        "& .reward": {
          marginRight: "var(--sl-spacing-x-small)",
          fontSize: "var(--sl-font-size-x-large)",
          fontWeight: "var(--sl-font-weight-semibold)",
        },
        "& .unit": {
          textTransform: "uppercase",
          fontSize: "var(--sl-font-size-medium)",
        },
        "& .description": {
          fontSize: "var(--sl-font-size-large)",
          marginBottom: "var(--sl-spacing-xx-large)",
        },
      },
    };

    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();

    const vanillaStyle = `
	:host{
		display: block;   
	}
	`;

    useRequestRerender([this.reward]);

    return (
      <div class={sheet.classes.TimelineReward}>
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        <div class="container">
          {this.line && <div class="line">.</div>}
          <div class="step">
            {this.icon === "gift" && (
              <div class="icon">
                <Gift />
              </div>
            )}
            {this.icon === "circle" && (
              <div class="icon">
                <Circle />
              </div>
            )}
            <div>
              <div>
                <span class="reward">{this.reward}</span>
                <span class="unit">{this.unit}</span>
              </div>
              <div class="description">{this.desc}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
