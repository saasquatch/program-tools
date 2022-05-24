import { DemoData } from "../../global/demo";
import { BigStatViewProps } from "../sqm-big-stat/sqm-big-stat-view";
import { TaskCardViewProps } from "./sqm-task-card-view";
/**
 * @uiName Task Card
 * @uiOrder ["reward-amount", "reward-unit", "card-title", "description", "repeatable", "finite", "show-progress-bar", "stat-type", "progress-source", "goal", "steps", "progress-bar-unit", "show-expiry", "reward-duration", "button-text", "button-link", "open-new-tab", "ended-message", "expiry-message", "starts-on-message", "event-key", "*"]
 */
export declare class TaskCard {
  ignored: boolean;
  /**
   * @uiName Reward Amount
   */
  rewardAmount: string;
  /**
   * @uiName Reward Unit
   */
  rewardUnit: string;
  /**
   * @uiName Title Text
   */
  cardTitle: string;
  /**
   * @uiName Description Text
   */
  description: string;
  /**
   * @uiName Goal Repeatable
   */
  repeatable: boolean;
  /**
   * The number of times a reward can be earned.  Use zero for no limit (the default).
   *
   * @uiName Repeat Amount
   */
  finite: number;
  /**
   * @uiName Show Progress Bar
   */
  showProgressBar: boolean;
  /**
   * @uiName Goal Completion Number
   */
  goal: number;
  /**
   * @uiName Progress Bar Steps
   */
  steps: boolean;
  /**
   * @uiName Progress Bar Unit
   */
  progressBarUnit: string;
  /**
   * @uiName Show Goal Expiry
   */
  showExpiry: boolean;
  /**
   * @uiName Expiry Date Message
   */
  expiryMessage: string;
  /**
   * @uiName Reward Duration
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  rewardDuration: string;
  /**
   * Shown to users before the start of the task duration.
   *
   * @uiName Start Date Message
   */
  startsOnMessage: string;
  /**
   * Timeframe that the task card will be shown
   *
   * @uiName Display Duration
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  displayDuration: string;
  /**
   * Shown to users after the end of the task duration.
   *
   * @uiName Ended Date Message
   */
  endedMessage: string;
  /**
   * Displays the amount of times that a user has completed a repeatable task.
   *
   * @uiName Completed Count Text
   */
  completedText: string;
  /**
   * @uiName CTA Button Text
   */
  buttonText: string;
  /**
   * @uiName CTA Button Link
   */
  buttonLink: string;
  /**
   * @uiName CTA Button Link Open in New Tab
   */
  openNewTab: boolean;
  /**
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Goal Progress Source
   * @uiOptions {"version": 1.1}
   */
  statType: string;
  /**
   * @uiName Event key of task card button
   */
  eventKey?: string;
  /**
   * @uiName Program ID override
   */
  programId?: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<TaskCardViewProps | BigStatViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
