import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Prop, State } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { useRequestRerender } from "../../tables/re-render";
import { getProps } from "../../utils/utils";
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
   * @uiName Icon
   * @uiType string
   * @uiEnum ["gift", "circle"]
   */
  @Prop() icon: "gift" | "circle";

//   @State() line: boolean = false;

//   @Method() async setLine(value: boolean) {
//     this.line = value;
//   }

  @State() iconState: "gift" | "circle" = "gift";

  @Method() async setIcon(value: "gift" | "circle") {
    this.iconState = value;
  }

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    useRequestRerender([this.reward]);

    return <TimelineEntryView {...getProps(this)} />;
  }
}

function TimelineEntryView(props) {
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
