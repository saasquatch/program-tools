import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { d as dist, i as ie, A as An, q as qe, H as He, j as jn } from './index.module-b74a7f69.js';
import { i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { g as getProps } from './utils-48175026.js';
import { u as useDemoBigStat, a as useBigStat } from './useDemoBigStat-604b848c.js';
import { T as TaskCardView } from './sqm-task-card-view-c3bf45cd.js';
import './extends-c31f1eff.js';
import './index-eccbb333.js';
import './luxon-1decee23.js';
import './global-b1f18590.js';
import './insertcss-d82cf6d6.js';
import './JSS-f59933eb.js';

const SEND_EVENT = dist.gql `
  mutation taskCardEvent($userEventInput: UserEventInput!) {
    logUserEvent(userEventInput: $userEventInput) {
      userId
    }
  }
`;
function useTaskCard(props) {
  const user = ie();
  const locale = An();
  const [sendUserEvent, { data, loading: loadingEvent }] = qe(SEND_EVENT);
  const { refresh } = He();
  useEffect(() => {
    if (data) {
      refresh();
      openLink();
    }
  }, [data]);
  function openLink() {
    props.openNewTab
      ? window.open(props.buttonLink)
      : window.open(props.buttonLink, "_parent");
  }
  function sendEvent(eventKey) {
    sendUserEvent({
      userEventInput: {
        userId: user === null || user === void 0 ? void 0 : user.id,
        accountId: user === null || user === void 0 ? void 0 : user.accountId,
        events: [{ key: eventKey, fields: {} }],
      },
    });
  }
  function onClick() {
    props.eventKey ? sendEvent(props.eventKey) : openLink();
  }
  return {
    states: { loadingEvent, locale },
    callbacks: { sendEvent, onClick },
  };
}

let TaskCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Reward Amount
     */
    this.rewardAmount = "0";
    /**
     * @uiName Reward Unit
     */
    this.rewardUnit = "Points";
    /**
     * @uiName Title Text
     */
    this.cardTitle = "Title Text";
    /**
     * @uiName Description Text
     */
    this.description = "";
    /**
     * @uiName Goal Repeatable
     */
    this.repeatable = false;
    /**
     * The number of times a reward can be earned.  Use zero for no limit (the default).
     *
     * @uiName Repeat Amount
     */
    this.finite = 0;
    /**
     * @uiName Show Progress Bar
     */
    this.showProgressBar = false;
    /**
     * @uiName Goal Completion Number
     */
    this.goal = 1;
    /**
     * @uiName Progress Bar Steps
     */
    this.steps = false;
    /**
     * @uiName Progress Bar Unit
     */
    this.progressBarUnit = "";
    /**
     * @uiName Show Goal Expiry
     */
    this.showExpiry = false;
    /**
     * @uiName Expiry Date Message
     */
    this.expiryMessage = "Ends {endDate}";
    /**
     * @uiName Reward Duration
     * @uiWidget DateRange
     * @uiOptions {"allowPastDates":true, "months": 1}
     */
    this.rewardDuration = "/";
    /**
     * Shown to users before the start of the task duration.
     *
     * @uiName Start Date Message
     */
    this.startsOnMessage = "Starts {startDate}";
    /**
     * Shown to users after the end of the task duration.
     *
     * @uiName Ended Date Message
     */
    this.endedMessage = "Ended {endDate}";
    /**
     * Displays the amount of times that a user has completed a repeatable task.
     *
     * @uiName Completed Count Text
     */
    this.completedText = "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}";
    /**
     * @uiName CTA Button Text
     */
    this.buttonText = "Complete Action";
    /**
     * @uiName CTA Button Link
     */
    this.buttonLink = "https://example.com/";
    /**
     * @uiName CTA Button Link Open in New Tab
     */
    this.openNewTab = false;
    /**
     * Select what type of stat to display for the goal. Manual paths are also supported.
     *
     * @uiWidget StatTypeSelectWidget
     * @uiName Goal Progress Source
     * @uiOptions {"version": 1.1}
     */
    this.statType = "/programGoals/count/Referral-Started%2Freferrals";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { props } = jn()
      ? useDemoBigStat(this)
      : useBigStat({ ...getProps(this), programId: this.programId });
    const { value, loading } = props;
    const { states, callbacks } = jn()
      ? useTaskCardDemo(this)
      : useTaskCard(this);
    return (h$1(TaskCardView, { callbacks: callbacks, states: {
        loading,
        loadingEvent: states.loadingEvent,
        progress: value,
        locale: states.locale,
      }, content: { ...getProps(this) } }));
  }
};
function useTaskCardDemo(props) {
  return cjs({
    states: { loadingEvent: false, locale: "en" },
    callbacks: {
      sendEvent: (event) => console.log(event),
      onClick: () => console.log("clicked"),
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { TaskCard as sqm_task_card };
