import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { Circle, Gift } from "./SVGs";

export interface TimelineEntryProps {
  reward: string;
  unit: string;
  desc: string;
  icon: string;
  iconState: string;
}

const style = {
  TimelineReward: {
    color: "var(--sl-color-neutral-900)",
    lineHeight: "var(--sl-line-height-dense)",
    "& .container": {
      display: "flex",
    },
    "& .line": {
      display: "none",
      color: "transparent",
      userSelect: "none",
      background: "var(--sl-color-primary-300)",
      width: "4px",
      borderRadius: "4px",
      margin: "-2px",
      position: "relative",
      left: "12px",
      top: "34px",
    },
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
      fontSize: "var(--sl-font-size-small)",
    },
    "& .description": {
      fontSize: "var(--sl-font-size-medium)",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
	:host{
		display: block;   
	}

	:host(:not(:last-child)) .line {
		display: block;
	}
	`;

export function TimelineEntryView(props: TimelineEntryProps): VNode {
  const timeline_icon = props.icon ?? props.iconState;

  return (
    <div class={sheet.classes.TimelineReward}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class="container">
        <div class="line">/</div>
        <div class="step">
          {timeline_icon === "gift" && (
            <div class="icon">
              <Gift />
            </div>
          )}
          {timeline_icon === "circle" && (
            <div class="icon">
              <Circle />
            </div>
          )}
          <div>
            <div>
              <span class="reward">{props.reward}</span>
              <span class="unit">{props.unit}</span>
            </div>
            <div class="description">{props.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
