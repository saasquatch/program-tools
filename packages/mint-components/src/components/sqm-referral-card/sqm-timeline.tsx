import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { useChildElements } from "../../tables/useChildElements";
import { getProps } from "../../utils/utils";
import { ReferralCardView } from "./sqm-referral-card-view";
import { Gift, Dot, Line } from "./SVGs";

/**
 * @uiName Timeline
 */
@Component({
  tag: "sqm-timeline",
  shadow: true,
})
export class Timeline {
  @State()
  ignored = true;

  /**
   * @uiName Gift Icon
   */
  @Prop() gift: boolean = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <TimelineView gift={true}>
        <slot />
      </TimelineView>
    );
  }
}

function TimelineView(props, children: VNode) {
  console.log("Here are my children");
  console.log(useChildElements());

  return <div>{useChildElements()[0]}</div>;
}
