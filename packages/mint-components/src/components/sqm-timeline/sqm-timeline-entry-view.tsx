import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { Circle, Gift } from "./SVGs";

export interface TimelineEntryProps {
  reward: string;
  unit: string;
  desc: string;
  icon: string;
  iconState: string;
  textColor?: string;
  lineColor?: string;
}

const vanillaStyle = `
	:host{
		display: block; 
	}

	:host(:not(:last-of-type)) .line {
		display: block; 
	}
	`;

export function TimelineEntryView(props: TimelineEntryProps): VNode {
  const timeline_icon = props.icon ?? props.iconState;

  const style = {
    TimelineReward: {
      color: props.textColor || "var(--sqm-text)",
      lineHeight: "var(--sl-line-height-dense)",
      "& .container": {
        display: "flex",
      },
      "& .line": {
        display: "none",
        color: "transparent",
        userSelect: "none",
        background: props.lineColor || "var(--sl-color-primary-500)",
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
        color: "var(--sl-color-primary-500)",
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

  return (
    <div class={sheet.classes.TimelineReward} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class="container" part="sqm-entry-container">
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
              <span class="reward" part="sqm-reward">
                {props.reward}
              </span>
              <span class="unit" part="sqm-unit">
                {props.unit}
              </span>
            </div>
            <div class="description" part="sqm-description">
              {props.desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
