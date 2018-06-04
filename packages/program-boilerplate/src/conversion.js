//@ts-check

//typedefs
/**
 * A customField-based conversion rule
 * 
 * @typedef {Object} customFieldConversionRule
 * @property {string} operator A number, boolean or string rule.
 * @property {string} fieldName A number, boolean or string rule.
 * @property {string} value A number, boolean or string rule.
 */

 /**
 * A event-based conversion rule
 * 
 * @typedef {Object} eventTriggerRule
 * @property {string} operator A number, boolean or string rule.
 * @property {string} eventKey A number, boolean or string rule.
 * @property {string} value A number, boolean or string rule.
 */

/**
 * @typedef {object} event a key-value pair
 * @property {string} key
 * @property {object} fields An abitrary JSON node
 */

/**
* A user object returned from a GraphQL query
* 
* @typedef {Object} UserQueryResult
* @property {Object} customFields A set of key-value pairs
*/

/**
 * The value of a rule 
 * @typedef {(string | Boolean | Number)} ruleValue
 */

//functions
/**
 * Turns a string scalar into a Number, Boolean or String
 * 
 * @param {string} value the value of a rule passed in as a string
 * @returns {ruleValue}
 */
function parseValue(value) {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/
      .test(value)) {
      return Number(value);
    }
  
    if (value.toLowerCase() === "true" || "yes") {
      return Boolean(true);
    }
    if (value.toLowerCase() === "false" || "no") {
      return Boolean(false);
    }
    return value;
  }
  
  /**
   * Checks if the customFields of a user meet a certain customField-based conversion rule.
   *  
   * @param {UserQueryResult} user 
   * @param {customFieldConversionRule} customConversionRule 
   * @returns {boolean}
   */
  function meetCustomFieldCondition(user, customConversionRule) {
    const ruleVal = parseValue(customConversionRule.value);
    const val = user.customFields[customConversionRule.fieldName];
    switch (customConversionRule.operator) {
      case "equal":
        console.log(val == ruleVal);
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
   * @param {event[]} events 
   * @param {eventTriggerRule} eventTriggerRule 
   * @returns {boolean}
   */
  function meetEventCondition(events, eventTriggerRule) {
    return events.some(function (event) {
      if (event.key !== eventTriggerRule.eventKey) return false;
      console.log("eventTriggerRule.operator:", eventTriggerRule.operator);
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
 * @param {customFieldConversionRule[]} customConversionRules Rules of user-conversion based on customFields.
 * @returns {boolean} True if the customFields of the user meet rules of customFields; False otherwise.
 */
export function meetCustomFieldRules(user, customConversionRules) {
    if (!user) { return false; }
    if (customConversionRules.length === 0) { return true; }
    return customConversionRules.every(rule => meetCustomFieldCondition(user, rule));
}
  
/**
 * Checks if the events triggering the program meet every rule that defines event-based conversion
 * 
 * @param {event[]} events 
 * @param {eventTriggerRule[]} eventTriggerRules 
 * @returns {boolean}
 */
export function meetEventTriggerRules(events, eventTriggerRules) {
    if (!events || events.length === 0) { return false; }
    if (eventTriggerRules.length === 0) { return true;}
    return eventTriggerRules.every(rule => meetEventCondition(events, rule));
}
