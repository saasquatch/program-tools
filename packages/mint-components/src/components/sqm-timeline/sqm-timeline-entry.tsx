import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Prop, State } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { getProps } from "../../utils/utils";
import { TimelineEntryView } from "./sqm-timeline-entry-view";

/**
 * @uiName Program Timeline Entry
 * @validParents ["sqm-timeline"]
 * @exampleGroup Common Components
 * @example Timeline Entry - <sqm-timeline-entry reward="$50" unit="visa giftcard" desc="You refer a friend" icon="circle" > </sqm-timeline-entry>
 */
@Component({
  tag: "sqm-timeline-entry",
  shadow: true,
})
export class TimelineReward {
  @State()
  ignored = true;

  /**
   * Color of the text and copy icon
   * @uiName Text color
   * @uiWidget color
   * @format color
   */
  @Prop() textColor?: string;

  /**
   * Color of timeline
   * @uiName Line color
   * @uiWidget color
   * @format color
   */
  @Prop() lineColor?: string;

  /**
   * @uiName Reward amount
   */
  @Prop() reward: string;

  /**
   * @uiName Reward unit
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
   * @uiEnumNames ["Gift", "Circle"]
   */
  @Prop() icon: "gift" | "circle";

  @State() iconState: "gift" | "circle" = "gift";

  @Method() async setIcon(value: "gift" | "circle") {
    this.iconState = value;
  }

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    console.log({ ...getProps(this) });
    useRequestRerender([this.reward]);

    return <TimelineEntryView {...getProps(this)} />;
  }
}
