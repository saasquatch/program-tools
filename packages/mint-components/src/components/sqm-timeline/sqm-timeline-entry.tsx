import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Prop, State } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { getProps } from "../../utils/utils";
import { TimelineEntryView } from "./sqm-timeline-entry-view";

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
    useRequestRerender([this.reward]);

    return <TimelineEntryView {...getProps(this)} />;
  }
}
