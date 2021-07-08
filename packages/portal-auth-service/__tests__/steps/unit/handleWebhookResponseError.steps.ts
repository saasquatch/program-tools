import { StepDefinitions } from "jest-cucumber";
import { Response } from "node-fetch";
import { handleWebhookResponseError } from "../../../src/util/handleWebhookResponseError";

export const handleWebhookResponseErrorSteps: StepDefinitions = ({
  given,
  when,
  then,
}) => {
  let currentResponse: Response | null;
  let currentError: any;
  afterEach(() => {
    currentResponse = null;
    currentError = null;
  });
  given("the response is ok", () => {
    currentResponse = new Response(undefined, { status: 200 });
  });

  given(/^the response has a status of "(.*)"$/, (status) => {
    const code = Number(status);

    currentResponse = new Response(undefined, { status: code });
  });

  when("handleWebhookResponseError is called with the response", () => {
    try {
      handleWebhookResponseError(currentResponse as Response);
    } catch (e) {
      currentError = e;
    }
  });

  then("no error is thrown", () => {
    expect(currentError).toBeNull();
  });

  then(/^a "(.*)" error is thrown$/, (errorCode) => {
    expect(currentError).toBeDefined();
    expect(currentError.extensions.code).toEqual(errorCode);
  });
};
