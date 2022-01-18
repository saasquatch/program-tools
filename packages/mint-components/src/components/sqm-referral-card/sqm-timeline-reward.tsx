import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { useRequestRerender } from "../../tables/re-render";
import { getProps } from "../../utils/utils";
import { ReferralCardView } from "./sqm-referral-card-view";
import { Gift, Dot, Line } from "./SVGs";

/**
 * @uiName Timeline Reward
 */
@Component({
  tag: "sqm-timeline-reward",
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
   * @uiName Gift Icon
   */
  @Prop() gift: boolean = true;

  /**
   * @uiName Line
   */
  @Prop() line: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const style = {
      TimelineReward: {
        color: "var(--sl-color-neutral-900)",
        lineHeight: "var(--sl-line-height-dense)",
        "& .step": {
          display: "flex",
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
        },

        "& .line": {
          height: "50px",
          position: "relative",
          left: "10px",
          top: "-32px",
          color: "var(--sl-color-primary-300)",
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
        {console.log(this)}
        {this.line ? line() : step({ ...getProps(this) })}
      </div>
    );

    function line() {
      return (
        <div class="line">
          <Line />
        </div>
      );
    }

    function step(props) {
      return (
        <div class="step">
          <div class="icon">{props.gift ? <Gift /> : <Dot />}</div>
          <div>
            <div>
              <span class="reward">{props.reward}</span>
              <span class="unit">{props.unit}</span>
            </div>
            <div class="description">{props.desc}</div>
          </div>
        </div>
      );
    }
  }
}
