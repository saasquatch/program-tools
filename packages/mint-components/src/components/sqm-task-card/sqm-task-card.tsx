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
  rewardAmount: number = 0;

  /**
   * @uiName Reward Unit
   */
  @Prop()
  rewardUnit: string = "Points";

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
  showExpiry: boolean = false;

  /**
   * @uiName Date Goal Expires
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
   @Prop() dateExpires?: string;

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
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Stat Type
   * @uiOptions {"version": 1.1}
   */
  @Prop()
  statType: string = "/programGoals/count/Referral-Started%2Freferrals";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props } = isDemo() ? useDemoBigStat(this) : useBigStat(this);
    const { value, statvalue } = props;
    console.log(props, isDemo());

    return (
      <TaskCardView
        {...getProps(this)}
        progress={value}
        loading={value === undefined}
      ></TaskCardView>
    );
  }
}
