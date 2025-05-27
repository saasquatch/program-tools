import { triggerProgram, types } from "@saasquatch/program-boilerplate";
import deepmerge from "deepmerge";
import { StepDefinitions } from "jest-cucumber";
import {
  getAUCOUTJson,
  getAUEPTJson,
  getIntrospectionJson,
  getProgramTriggerJson,
  getReferralJson,
  getValidationJson,
} from "../faker";
import { getWorld } from "../world";

const triggerSteps: StepDefinitions = ({ when }) => {
  const triggerTypes = [
    "PROGRAM_INTROSPECTION",
    "PROGRAM_VALIDATION",
    "AFTER_USER_CREATED_OR_UPDATED",
    "AFTER_USER_EVENT_PROCESSED",
    "REFERRAL",
    "SCHEDULED",
    "REWARD_SCHEDULED",
  ];

  // prettier-ignore
  const regexString = `^(?:the )?"?(${triggerTypes.join("|")})"?(?: trigger)? runs$`;

  when(new RegExp(regexString), (type: types.rpc.TriggerType) => {
    const currentState = getWorld().state.current ?? {};
    const { template, rules, programRewards } = currentState;

    let body: any;

    switch (type) {
      case "PROGRAM_INTROSPECTION":
        body = getIntrospectionJson(
          template,
          rules,
          programRewards,
          currentState.featureFlags
        );
        break;

      case "PROGRAM_VALIDATION":
        body = getValidationJson(
          getWorld().state.validationReqs,
          template.id,
          rules
        );
        break;

      default:
        body = getProgramTriggerJson(
          {
            type,
            user: getWorld().state.current.user,
            rules: getWorld().state.current.rules,
            time: getWorld().state.current.time,
          },
          getWorld().state.current.flavor ?? "saasquatch"
        );
    }

    switch (type) {
      case "AFTER_USER_CREATED_OR_UPDATED":
        body = deepmerge(
          body,
          getAUCOUTJson(
            getWorld().state.current.previous,
            getWorld().state.current.events
          )
        );
        break;

      case "AFTER_USER_EVENT_PROCESSED":
        body = deepmerge(body, getAUEPTJson(getWorld().state.current.events));
        break;

      case "REFERRAL":
        body = deepmerge(
          body,
          getReferralJson(undefined, getWorld().state.current.referral)
        );
        break;

      default:
        break;
    }

    getWorld().setState({
      programTriggerResult: triggerProgram(body, getWorld().getProgram()).json,
    });
  });
};

export default triggerSteps;
