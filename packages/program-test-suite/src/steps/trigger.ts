import { triggerProgram, types } from "@saasquatch/program-boilerplate";
import deepmerge from "deepmerge";
import {
  getAUCOUTJson,
  getAUEPTJson,
  getIntrospectionJson,
  getProgramTriggerJson,
  getReferralJson,
  getValidationJson,
} from "../faker.ts";
import { When } from "../registry.ts";
import { getWorld } from "../world.ts";

const triggerTypes = [
  "PROGRAM_INTROSPECTION",
  "PROGRAM_VALIDATION",
  "AFTER_USER_CREATED_OR_UPDATED",
  "AFTER_USER_EVENT_PROCESSED",
  "REFERRAL",
  "SCHEDULED",
  "REWARD_SCHEDULED",
];

const regexString = `^(?:the )?"?(${triggerTypes.join("|")})"?(?: trigger)? runs$`;

When(new RegExp(regexString), async (triggerType: types.rpc.TriggerType) => {
  const currentState = getWorld().state.current ?? {};
  const { template, rules, programRewards } = currentState;

  let body: any;

  switch (triggerType) {
    case "PROGRAM_INTROSPECTION":
      body = getIntrospectionJson({
        template,
        rules,
        rewards: programRewards,
        featureFlags: currentState.featureFlags,
        timeZone: currentState.tenantTimeZone,
      });
      break;

    case "PROGRAM_VALIDATION":
      body = getValidationJson(
        getWorld().state.validationReqs,
        template.id,
        rules,
      );
      break;

    case "PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST":
      throw new Error(
        "PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST is not implemented in the test library",
      );

    default:
      body = getProgramTriggerJson({
        info: {
          type: triggerType,
          user: getWorld().state.current.user,
          rules: getWorld().state.current.rules,
          time: getWorld().state.current.time,
        },
        flavor: getWorld().state.current.flavor ?? "saasquatch",
        timeZone: getWorld().state.current.tenantTimeZone,
      });
  }

  switch (triggerType) {
    case "AFTER_USER_CREATED_OR_UPDATED":
      body = deepmerge(
        body,
        getAUCOUTJson(
          getWorld().state.current.previous,
          getWorld().state.current.events,
        ),
      );
      break;

    case "AFTER_USER_EVENT_PROCESSED":
      body = deepmerge(body, getAUEPTJson(getWorld().state.current.events));
      break;

    case "REFERRAL":
      body = deepmerge(
        body,
        getReferralJson(getWorld().state.current.referral),
      );
      break;

    default:
      break;
  }

  const liveUrl = process.env["SSQT_TEST_SUITE_LIVE_URL"];
  const programTriggerResult = liveUrl
    ? await triggerLiveProgram(liveUrl, body)
    : triggerProgram(body, getWorld().getProgram()).json;

  getWorld().setState({
    programTriggerResult,
  });
});

async function triggerLiveProgram(
  url: string,
  body: unknown,
): Promise<unknown> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseText = await response.text();
  let responseBody: unknown;

  try {
    responseBody = JSON.parse(responseText);
  } catch {
    responseBody = responseText;
  }

  if (!response.ok) {
    throw new Error(
      `Live program request failed with HTTP ${response.status}: ${responseText}`,
    );
  }

  return responseBody;
}
