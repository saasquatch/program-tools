import { rewardScheduleQuery } from "./queries";
import { ProgramTriggerBody, TriggerType } from "./types/rpc";
import { User } from "./types/saasquatch";
import { loggers } from "winston";

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
			type: "REWARD",
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
		? trigger.events.find((e: any) => e.key === "purchase")
		: undefined;

	return purchaseEvent ? purchaseEvent.dateTriggered - 1 : trigger.time;
}

/**
 * Translates a string type into its proper JavaScript type.
 * Supports conversion to number, boolean, null and undefined values.
 * Objects and Arrays will be converted, if an input looks like an object or array,
 * but is not valid (ex. [[] or {"""}) undefined will be returned.
 *
 * @example
 * "29" => 29 (number)
 * @example
 * "3.1415" => 3.1415 (number)
 * @example
 * "true" => true (boolean)
 * @example
 * "asdf" => "asdf" (string)
 * @example
 * NaN => NaN (number)
 * @example
 * undefined => undefined
 * @example
 * "[true, false]" => [true, false] (object)
 * @example
 * "{"key1":true,"key2":false}" => {"key1":true,"key2":false} (object)
 * @example
 *
 * @param {string} val The value to test
 * @return {any} the computed value
 */
export function inferType(val: string): any {
	if (/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(val)) {
		const asNum = Number(val);

		if (!isNaN(asNum)) {
			return asNum;
		}
	}

	if (/(^[\[].*[\]]$)|(^[\{].*[\}]$)/.test(val)) {
		try {
			const asObject = JSON.parse(val);
			if (asObject instanceof Object) {
				return asObject;
			}
		} catch (e) {
			return undefined;
		}
	}

	switch (val) {
		case "undefined":
			return undefined;
		case "null":
			return null;
		case "NaN":
			return NaN;
		case "Infinity":
			return Infinity;
		case "-Infinity":
			return -Infinity;
		case "true":
			return true;
		case "false":
			return false;
		default:
			return val;
	}
}

/**
 * Converts a number representation of a conversion operator set in program
 * rules to a string that can be user in a graphQL query
 * @param num the conversion criteria set in a program
 * @return {string} the string representation of the conversion operator
 */
export function numToEquality(num: number): string {
	switch (num) {
		case 0:
			return "eq";
		case 1:
			return "gte";
		case 2:
			return "lte";
		default:
			return "eq";
	}
}

/**
 * Converts a trigger context into the relavent information for the specified trigger type.
 * @param body the body of the trigger
 * @return object[] The tranformed data that is relavent for the trigger type
 */
export function getTriggerSchema(body: ProgramTriggerBody): object[] {
	const activeTrigger = body.activeTrigger;
	const triggerType = activeTrigger.type as TriggerType;
	const standardData = {
		type: activeTrigger.type,
		time: activeTrigger.time,
		user: activeTrigger.user,
	};
	switch (triggerType) {
		case "AFTER_USER_CREATED_OR_UPDATED":
			return [
				{
					...standardData,
					previous: activeTrigger.previous,
				},
			];
		case "REFERRAL":
			return [
				{
					...standardData,
					referral: activeTrigger.referral,
				},
			];
		case "AFTER_USER_EVENT_PROCESSED":
			let contexts: object[] = [];
			activeTrigger.events.forEach((event: any) => {
				contexts.push({
					...standardData,
					event: {
						key: event.key,
						id: event.id,
						dateTriggered: event.dateTriggered,
						fields: event.fields,
					},
				});
			});
			return contexts;
		case "SCHEDULED":
			return [
				{
					...standardData,
				},
			];
		case "REWARD_SCHEDULED":
			return [
				{
					...standardData,
				},
			];
		default:
			throw new Error("Trigger type did not match expected options");
	}
}
