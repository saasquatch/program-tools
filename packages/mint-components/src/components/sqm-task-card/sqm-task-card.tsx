import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { useBigStat } from "../sqm-big-stat/useBigStat";
import { useDemoBigStat } from "../sqm-big-stat/useDemoBigStat";
import { TaskCardView } from "./sqm-task-card-view";

/**
 * @uiName Task Card
 * @uiOrder ["reward-amount", "reward-unit", "card-title", "description", "repeatable", "finite", "show-progress-bar", "stat-type", "progress-source", "goal", "steps", "progress-bar-unit", "show-expiry", "reward-duration", "button-text", "button-link", "open-new-tab"]
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
   * @uiName Repeat Amount (0 for no limit)
   */
  @Prop()
  finite: number = 0;

  /**
   * @uiName Show Progress Bar
   */
  @Prop()
  showProgressBar: boolean = false;

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
   * @uiName Reward Duration
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() rewardDuration: string = "/";

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
   * @uiName CTA Button Link Open in New Tab
   */
  @Prop()
  openNewTab: boolean = false;

  /**
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Goal Progress Source
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
        progress={value}
        loading={!isDemo() && value === undefined}
        {...getProps(this)}
      ></TaskCardView>
    );
  }
}
