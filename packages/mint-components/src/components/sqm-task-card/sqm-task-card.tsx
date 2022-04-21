import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { BigStatViewProps } from "../sqm-big-stat/sqm-big-stat-view";
import { useBigStat } from "../sqm-big-stat/useBigStat";
import { useDemoBigStat } from "../sqm-big-stat/useDemoBigStat";
import { TaskCardView, TaskCardViewProps } from "./sqm-task-card-view";
import { useTaskCard } from "./useTaskCard";

/**
 * @uiName Task Card
 * @uiOrder ["reward-amount", "reward-unit", "card-title", "description", "repeatable", "finite", "show-progress-bar", "stat-type", "progress-source", "goal", "steps", "progress-bar-unit", "show-expiry", "reward-duration", "button-text", "button-link", "open-new-tab", "ended-message", "expiry-message", "starts-on-message", "event-key", "*"]
 * @validParents ["sqm-card-feed"]
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
   * @uiGroup Reward
   */
  @Prop()
  rewardAmount: string = "0";

  /**
   * @uiName Reward Unit
   * @uiGroup Reward
   */
  @Prop()
  rewardUnit: string = "Points";

  /**
   * @uiName Title Text
   * @uiGroup Task
   */
  @Prop()
  cardTitle: string = "Title Text";

  /**
   * @uiName Description Text
   * @uiGroup Task
   */
  @Prop()
  description: string = "";

  /**
   * @uiName Goal Repeatable
   * @uiGroup Goal
   */
  @Prop()
  repeatable: boolean = false;

  /**
   * The number of times a reward can be earned.  Use zero for no limit (the default).
   *
   * @uiName Repeat Amount
   * @uiGroup Reward
   */
  @Prop()
  finite: number = 0;

  /**
   * @uiName Show Progress Bar
   * @uiGroup Goal
   */
  @Prop()
  showProgressBar: boolean = false;

  /**
   * Sets the goal for users progress to know when a task has been completed. If repeatable is checked, repeatable goals is an increment of this.
   *
   * @uiName Goal Completion Number
   * @uiGroup Goal
   */
  @Prop()
  goal: number = 1;

  /**
   * @uiName Progress Bar Steps
   * @uiGroup Goal
   */
  @Prop()
  steps: boolean = false;

  /**
   * @uiName Progress Bar Unit
   * @uiGroup Goal
   */
  @Prop()
  progressBarUnit: string = "";

  /**
   * @uiName Expiry Date Message
   * @uiGroup Task
   */
  @Prop() expiryMessage: string = "Ends {endDate}";

  /**
   * @uiName Reward Duration
   * @uiWidget DateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @uiGroup Reward
   */
  @Prop() rewardDuration: string;

  /**
   * Shown to users before the start of the task duration.
   *
   * @uiName Start Date Message
   * @uiGroup Task
   */
  @Prop() startsOnMessage: string = "Starts {startDate}";

  /**
   * Timeframe that the task card will be shown
   *
   * @uiName Display Duration
   * @uiWidget DateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @uiGroup Task
   */
  @Prop() displayDuration: string;

  /**
   * Shown to users after the end of the task duration.
   *
   * @uiName Ended Date Message
   * @uiGroup Task
   */
  @Prop() endedMessage: string = "Ended {endDate}";

  /**
   * Displays the amount of times that a user has completed a repeatable task.
   *
   * @uiName Completed Count Text
   * @uiGroup Task
   */
  @Prop() completedText: string =
    "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}";

  /**
   * @uiName CTA Button Text
   * @uiGroup CTA Button
   */
  @Prop()
  buttonText: string = "Complete Action";

  /**
   * @uiName CTA Button Link
   * @uiGroup CTA Button
   */
  @Prop()
  buttonLink: string;

  /**
   * CTA Button Link Opens in New Tab
   * @uiName Open In New Tab
   * @uiGroup CTA Button
   * @default undefined
   */
  @Prop()
  openNewTab: boolean = false;

  /**
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Goal Progress Source
   * @uiWidgetOptions {"version": 1.1}
   * @uiGroup Goal
   */
  @Prop()
  statType: string;

  /**
   * Optionally send an event to SaaSquatch when a user clicks the CTA. This field configured what key of the event sent is.
   *
   * @uiName Task Card Button Event Key
   * @uiGroup CTA Button
   */
  @Prop() eventKey?: string;

  /**
   * The ID of the program that is used to scope the task card. Defaults to the program context when no ID is specified.
   *
   * @uiName Program ID Override
   * @uiGroup Goal
   */
  @Prop() programId?: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<TaskCardViewProps | BigStatViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props } = isDemo()
      ? useDemoBigStat(this)
      : useBigStat({ ...getProps(this), programId: this.programId });
    const { value, loading } = props;

    const { states, callbacks } = isDemo()
      ? useTaskCardDemo(this)
      : useTaskCard(this);

    return (
      <TaskCardView
        callbacks={callbacks}
        states={{
          loading,
          loadingEvent: states.loadingEvent,
          progress: value,
          locale: states.locale,
        }}
        content={{ ...getProps(this) }}
      ></TaskCardView>
    );
  }
}

function useTaskCardDemo(props: TaskCard) {
  return deepmerge(
    {
      states: { loadingEvent: false, locale: "en" },
      callbacks: {
        sendEvent: (event: string) => console.log(event),
        onClick: () => console.log("clicked"),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
