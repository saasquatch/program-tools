import { rewardScheduleQuery } from './queries';

//return new template with reward schedules
export const setRewardSchedule = ({ template, expiryWarningDays, key, emailKey, periodInHours }) => {
    if (expiryWarningDays) {
        const dateExpires_timeframe = `next_${expiryWarningDays}_days`;
        const rewardSchedule = {
            key,
            type: "REWARD",
            filter: {
                dateExpires_timeframe
            },
            query: rewardScheduleQuery(emailKey),
            periodInHours
        };
        const currentSchedules = template.schedules;
        const schedules = currentSchedules ? [...currentSchedules, rewardSchedule] : [rewardSchedule];
        const newTemplate = {
            ...template,
            schedules
        };
        return newTemplate;
    } else {
        return template;
    }
}