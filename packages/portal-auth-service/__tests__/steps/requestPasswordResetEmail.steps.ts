import { StepDefinitions } from "jest-cucumber";
import { requestPasswordResetEmail } from "../../src/resolvers/requestPasswordResetEmail";
import { validateEmailSpy } from "../mocks/handlers/core";
import {
  existingEmails,
  passwordResetOobCodeReturned,
} from "../mocks/mockFirebase";

export const requestPasswordResetEmailSteps: StepDefinitions = ({
  given,
  when,
  then,
  and,
}) => {
  let currentResponse: any;
  let currentError: any;
  afterEach(() => {
    existingEmails.length = 0;
    currentResponse = null;
    currentError = null;
  });

  given(
    /^a user (.*) exist with the email "(.*)"$/,
    (may: string, email: string) => {
      if (may === "does") existingEmails.push(email);
      else existingEmails.length = 0;
    }
  );

  when(
    /^there is a request for a password reset email to the tenant "(.*)" and no oobCode is returned$/,
    async (tenantAlias) => {
      passwordResetOobCodeReturned.oobCode = "";
      try {
        currentResponse = await requestPasswordResetEmail(
          undefined,
          { input: { email: "test@example.com" } },
          { tenantAlias }
        );
      } catch (e) {
        currentError = e;
      }
      passwordResetOobCodeReturned.oobCode = "qwerty";
    }
  );

  when(
    /^there is a request for a password reset email to the tenant "(.*)" with the email "(.*)"$/,
    async (tenantAlias: string, email: string) => {
      currentResponse = await requestPasswordResetEmail(
        undefined,
        { input: { email } },
        { tenantAlias }
      );
    }
  );
  then(/^a password reset email (.*) be queued$/, (may: string) => {
    if (may === "will") {
      expect(validateEmailSpy.calledOnce);
      const [req] = validateEmailSpy.args[0];
      expect(req.body.variables.key).toEqual("reset-password");
      expect(req.body.variables.validateLinkString).toEqual(
        "https://www.example.com/resetPassword?oobCode=qwerty"
      );
    } else {
      expect(validateEmailSpy.callCount).toEqual(0);
    }
  });

  then("an error will be returned from requestPasswordResetEmail", () => {
    expect(currentError).toBeDefined();
  });

  and(
    "a success response is sent to the portal from requestPasswordResetEmail",
    () => {
      expect(currentResponse).toStrictEqual({ success: true });
    }
  );
};
