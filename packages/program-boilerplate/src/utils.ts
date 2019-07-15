import {rewardScheduleQuery} from './queries';

//return new template with reward schedules
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
 * Returns the appropriate timestamp based on the trigger
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

/**
 * A passthru template literal function to get GraphQL
 * syntax in program requirement files
 *
 * @param {TemplateStringsArray} literals The literals portion of the template
 * @param {any[]} placeholders The placeholders
 *
 * @return {string} The compiled string
 */
export function templateLiteralPassthrough(
  literals: TemplateStringsArray,
  ...placeholders: any[]
): string {
  let result = '';

  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i];
    result += placeholders[i].toString();
  }

  // add the last literal
  result += literals[literals.length - 1];
  return result;
}
