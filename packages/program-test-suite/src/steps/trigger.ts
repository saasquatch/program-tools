import { StepDefinitions } from "jest-cucumber";
import { triggerProgram, types } from "@saasquatch/program-boilerplate";
import deepmerge from "deepmerge";

import { World, getWorld } from "../world";
import {
  getIntrospectionJson,
  getAUCOUTJson,
  getAUEPTJson,
  getReferralJson,
  getProgramTriggerJson,
  getValidationJson,
} from "../faker";

const triggerSteps: StepDefinitions = ({ when }) => {
  when(
    /^(?:the )?(PROGRAM_INTROSPECTION|PROGRAM_VALIDATION|AFTER_USER_CREATED_OR_UPDATED|AFTER_USER_EVENT_PROCESSED|REFERRAL)(?: trigger)? runs$/,
    (type: types.rpc.TriggerType) => {
      const currentState = getWorld().state.current || {};
      const { template, rules, programRewards } = currentState;

      let body: any;

      switch (type) {
        case "PROGRAM_INTROSPECTION":
          body = getIntrospectionJson(template, rules, programRewards);
          break;

        case "PROGRAM_VALIDATION":
          body = getValidationJson(
            getWorld().state.validationReqs,
            template.id,
            rules
          );
          break;
        default:
          body = getProgramTriggerJson({
            type,
            user: getWorld().state.current.user,
            rules: getWorld().state.current.rules,
            time: getWorld().state.current.time,
          });
      }

      switch (type) {
        case "AFTER_USER_CREATED_OR_UPDATED":
          body = deepmerge(
            body,
            getAUCOUTJson(undefined, getWorld().state.current.events)
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
        programTriggerResult: triggerProgram(body, World.getProgram()).json,
      });
    }
  );
};

export default triggerSteps;
