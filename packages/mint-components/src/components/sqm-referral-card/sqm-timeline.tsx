import { useHost } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, getElement, h, Prop, State, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { useChildElements } from "../../tables/useChildElements";
import { getProps } from "../../utils/utils";
import { ReferralCardView } from "./sqm-referral-card-view";
import { TimelineReward } from "./sqm-timeline-reward";
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
    //@ts-ignore
    const rewards: TimelineReward[] = useChildElements();

    rewards.forEach((reward) => (reward.gift = this.gift));

    return <slot />;
  }
}
