import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { useBigStat } from "../sqm-big-stat/useBigStat";
import { useDemoBigStat } from "../sqm-big-stat/useDemoBigStat";
import { TaskCardView } from "./sqm-task-card-view";

/**
 * @uiName Task Card
 */
@Component({
  tag: "sqm-task-card",
  shadow: true,
})
export class TaskCard {
  @State()
  ignored = true;

  /**
   * @uiName Reward Amount
   */
  @Prop()
  points: number = 0;

  /**
   * @uiName Reward Unit
   */
  @Prop()
  rewardUnit: string = "Point";

  /**
   * @uiName Title Text
   */
  @Prop()
  cardTitle: string = "Title Text";

  /**
   * @uiName Description Text
   */
  @Prop()
  description: string = "Description Text";

  /**
   * @uiName Goal Repeatable
   */
  @Prop()
  repeatable: boolean = false;

  /**
   * @uiName Show Progress Bar
   */
  @Prop()
  showProgressBar: boolean = false;

  /**
   * @uiName Goal Progress Source
   */
  progressSource: string = "";

  /**
   * @uiName Goal Completion Number
   */
  @Prop()
  goal: number = 1;

  /**
   * @uiName Progress Bar Steps
   */
  @Prop()
  steps: boolean = false;

  /**
   * @uiName Progress Bar Unit
   */
  @Prop()
  progressBarUnit?: string;

  /**
   * @uiName Show Goal Expiry
   */
  @Prop()
  showExpire: boolean = false;

  /**
   * @uiName Date Goal Expires
   */
  @Prop()
  dateExpires?: string;

  /**
   * @uiName CTA Button Text
   */
  @Prop()
  buttonText: string = "Complete Action";

  /**
   * @uiName CTA Button Link
   */
  @Prop()
  buttonLink: string = "https://example.com/";

  /**
   * @undocumented
   */
  @Prop()
  statType: string = "/programGoals/count/Referral-Started%2Freferrals";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props } = isDemo() ? useDemoBigStat(this) : useBigStat(this);
    const { value } = props;
    console.log(props, isDemo());

    return <TaskCardView {...getProps(this)} progress={value}></TaskCardView>;
  }
}
