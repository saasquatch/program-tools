/**
 * @module conversion
 */

/**
 * A custom field based conversion rule
 */
type CustomFieldConversionRule = {
  operator: number | string
  fieldName: string,
  value: RuleValue
};

/**
 * An event-based conversion rule
 */
type EventTriggerRule = {
 operator: string
 eventKey: string
 value: string
};

/**
 * A key-value pair
 */
type Event = {
  key: string
  fields: any
};

/**
 * A user object returned from a GraphQL query
 */
type UserQueryResult = {
  customFields: any
};

/**
 * The value of a rule
 */
type RuleValue = string | boolean | number;

//functions
/**
 * Turns a string scalar into a Number, Boolean or String
 *
 * @param {string} value the value of a rule passed in as a string
 * @returns {RuleValue} The parsed value
 */
function parseValue(value: string): RuleValue {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/
    .test(value)) {
    return Number(value);
  }

  if (value.toLowerCase() === "true" || value.toLowerCase() === "yes") {
    return Boolean(true);
  }
  if (value.toLowerCase() === "false" || value.toLowerCase() === "no") {
    return Boolean(false);
  }

  return value;
}

  /**
   * Checks if the customFields of a user meet a certain customField-based conversion rule.
   *
   * @param {UserQueryResult} user
   * @param {CustomFieldConversionRule} customConversionRule
   * @returns {boolean}
   */
  function meetCustomFieldCondition(user: UserQueryResult, customConversionRule: CustomFieldConversionRule): boolean {
    const ruleVal = parseValue(customConversionRule.value.toString());
    const val = user.customFields[customConversionRule.fieldName];

    switch (customConversionRule.operator) {
      case "equal":
        return val == ruleVal;
      case "greater":
        return val > ruleVal;
      case "smaller":
        return val < ruleVal;
      default:
        break;
    }
    return false;
  }


  /**
   * Checks if the events triggered the program meet a certain event-based conversion rule.
   *
   * @param {Event[]} events
   * @param {EventTriggerRule} eventTriggerRule
   * @returns {boolean} Whether or not the events meet the rule
   */
  function meetEventCondition(events: Event[], eventTriggerRule: EventTriggerRule): boolean {
    return events.some(function (event) {
      if (event.key !== eventTriggerRule.eventKey) return false;
      const ruleVal = parseValue(eventTriggerRule.value);
      switch (eventTriggerRule.operator) {
        case "equal":
          return event.fields.value == ruleVal;
        case "greater":
          return event.fields.value > ruleVal;
        case "smaller":
          return event.fields.value < ruleVal;
        default:
          break;
      }
      return false;
    });
  }

/**
 * Checks if the customFields of the user meet every rule that defines customFields-based conversion
 *
 * @param {UserQueryResult} user UserQueryResult passed in context.
 * @param {CustomFieldConversionRule[]} customConversionRules Rules of user-conversion based on customFields.
 * @returns {boolean} True if the customFields of the user meet rules of customFields; False otherwise.
 */
export function meetCustomFieldRules(user: UserQueryResult, customConversionRules: CustomFieldConversionRule[]): boolean {
    if (!user) { return false; }
    if (customConversionRules === undefined || customConversionRules.length === 0) { return true; }
    return customConversionRules.every(rule => meetCustomFieldCondition(user, rule));
}

/**
 * Checks if the events triggering the program meet every rule that defines event-based conversion
 *
 * @param {Event[]} events
 * @param {EventTriggerRule[]} eventTriggerRules
 * @returns {boolean}
 */
export function meetEventTriggerRules(events: Event[], eventTriggerRules: EventTriggerRule[]): boolean {
    if (eventTriggerRules === undefined || eventTriggerRules.length === 0) { return true;}
    if (!events || events.length === 0) { return false; }
    return eventTriggerRules.every(rule => meetEventCondition(events, rule));
}
