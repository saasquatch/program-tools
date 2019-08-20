import {rewardScheduleQuery} from './queries';

/**
 * Append a reward schedule to the template and return the new template
 *
 * @param {object} template          The template
 * @param {number} expiryWarningDays The number of warning days
 * @param {string} key               The schedule key
 * @param {string} emailKey          The email key
 * @param {number} periodInHours     The refresh period
 */
export function setRewardSchedule({
  template,
  expiryWarningDays,
  key,
  emailKey,
  periodInHours,
}: {
  template: any;
  expiryWarningDays: number;
  key: string;
  emailKey: string;
  periodInHours: number;
}): any {
  if (expiryWarningDays) {
    const dateExpires_timeframe = `next_${expiryWarningDays}_days`;
    const rewardSchedule = {
      key,
      type: 'REWARD',
      filter: {
        dateExpires_timeframe,
      },
      query: rewardScheduleQuery(emailKey),
      periodInHours,
    };
    const currentSchedules = template.schedules;
    const schedules = currentSchedules
      ? [...currentSchedules, rewardSchedule]
      : [rewardSchedule];
    const newTemplate = {
      ...template,
      schedules,
    };
    return newTemplate;
  } else {
    return template;
  }
}

/**
 * Returns the appropriate timestamp based on the trigger.
 * If the trigger includes a purchase event, the timestamp
 * will be 1 millisecond before the `dateTriggered` field
 * of the event. Otherwise, it will be the trigger time
 *
 * @param {any} trigger The trigger to base the timestamp on
 *
 * @return {number} The timestamp
 */
export function getGoalAnalyticTimestamp(trigger: any): number {
  const purchaseEvent = trigger.events
    ? trigger.events.find((e: any) => e.key === 'purchase')
    : undefined;

  return purchaseEvent ? purchaseEvent.dateTriggered - 1 : trigger.time;
}
