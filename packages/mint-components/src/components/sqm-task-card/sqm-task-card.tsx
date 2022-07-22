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
 * @exampleGroup Rewards
 * @example One Time Task Card - <sqm-task-card reward-amount="1" reward-unit="Free Month" goal="1" card-title="Upgrade Your Plan" description="Receive one free month for being a committed customer when you upgrade your plan." button-text="Upgrade" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" open-new-tab="false" finite="0" starts-on-message="Starts {startDate}"></sqm-task-card>
 * @example Repeatable Task Card - <sqm-task-card reward-amount="250" goal="500" show-progress-bar card-title="Spend $500" description="Earn 250 points when you spend $500 or more." button-text="See plans" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" progress-bar-unit="$" finite="0" repeatable="" reward-unit="Points" starts-on-message="Starts {startDate}"></sqm-task-card>
 * @example Event Sending Task Card - <sqm-task-card goal="1" reward-amount="50" card-title="Follow Us on Twitter" description="Earn 50 points when you follow us on Twitter!" button-text="Follow" button-link="https://twitter.com/" open-new-tab="true" event-key="socialFollow" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" finite="0" reward-unit="Points" starts-on-message="Starts {startDate}"></sqm-task-card>
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
   * @uiName Title
   * @uiGroup Task
   */
  @Prop()
  cardTitle: string = "Title Text";

  /**
   * @uiName Description
   * @uiGroup Task
   */
  @Prop()
  description: string = "";

  /**
   * @uiName Goal Repeatable
   * @uiGroup Goal
   * @default
   */
  @Prop()
  repeatable: boolean = false;

  /**
   * The number of times a task can be completed when repeatable.  Use zero for no limit (the default).
   *
   * @uiName Repeat Amount
   * @uiGroup Reward
   */
  @Prop()
  finite: number = 0;

  /**
   * @uiName Show Progress Bar
   * @uiGroup Goal
   * @default
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
   * @default
   */
  @Prop()
  steps: boolean = false;

  /**
   * The unit displayed to the right of steps and progress numbers on the progress bar. Ex: $ for dollars
   *
   * @uiName Progress Bar Unit
   * @uiGroup Goal
   */
  @Prop()
  progressBarUnit: string = "";

  /**
   * Displayed when a user views a task card after the reward duration interval.
   *
   * @uiName Expiry Date Message
   * @uiGroup Task
   */
  @Prop() expiryMessage: string = "Ends {endDate}";

  /**
   * Task cards are disabled to users outside of the duration. They are not disabled if no duration is configured.
   *
   * @uiName Reward Duration
   * @uiWidget dateRange
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
   * Task cards are hidden from users outside of the duration. They are always displayed if no duration is configured.
   *
   * @uiName Display Duration
   * @uiWidget dateRange
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
   * @uiWidget textArea
   */
  @Prop() completedText: string =
    "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}";

  /**
   * @uiName Button Text
   * @uiGroup Button
   */
  @Prop()
  buttonText: string = "Complete Action";

  /**
   * @uiName Button Link
   * @uiGroup Button
   */
  @Prop()
  buttonLink: string;

  /**
   * Button Link Opens in New Tab
   * @uiName Open In New Tab
   * @uiGroup Button
   * @default
   */
  @Prop()
  openNewTab: boolean = false;

  /**
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiName Goal Progress Source
   * @required
   * @minLength 1
   * @uiWidget statTypeSelectWidget
   * @uiWidgetOptions {"version": 1.1}
   * @uiGroup Goal
   */
  @Prop()
  statType: string;

  /**
   * Optionally send an event to SaaSquatch when a user clicks the button. Enter your event key into this field.
   *
   * @uiName Task Card Button Event Key
   * @uiGroup Button
   */
  @Prop() eventKey?: string;

  /**
   * The ID of the program that is used to scope the task card. When no ID is specified, it defaults to the program context in which the component is rendered.
   *
   * @uiName Program ID Override
   * @uiWidget programSelector
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
