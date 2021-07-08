import { StepDefinitions } from "jest-cucumber";
import { requestVerificationEmail } from "../../src/resolvers/requestVerificationEmail";
import { validateEmailSpy } from "../mocks/handlers/core";
import {
  existingEmails,
  emailVerificationOobCodeReturned,
} from "../mocks/mockFirebase";

export const requestVerificationEmailSteps: StepDefinitions = ({
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

  when(
    /^there is a request for a verification email to the tenant "(.*)" with the email "(.*)"$/,
    async (tenantAlias: string, email: string) => {
      currentResponse = await requestVerificationEmail(
        undefined,
        { input: { email } },
        { tenantAlias }
      );
    }
  );

  when(
    /^there is a request for a verification email to the tenant "(.*)" and no oobCode is returned$/,
    async (tenantAlias) => {
      emailVerificationOobCodeReturned.oobCode = "";
      try {
        currentResponse = await requestVerificationEmail(
          undefined,
          { input: { email: "test@example.com" } },
          { tenantAlias }
        );
      } catch (e) {
        currentError = e;
      }

      emailVerificationOobCodeReturned.oobCode = "qwerty";
    }
  );

  then(/^a email verification email (.*) be queued$/, (may: string) => {
    if (may === "will") {
      expect(validateEmailSpy.calledOnce);
      const [req] = validateEmailSpy.args[0];
      expect(req.body.variables.key).toEqual("verify-email");
      expect(req.body.variables.validateLinkString).toEqual(
        "https://www.example.com/verifyEmail?oobCode=qwerty"
      );
    } else {
      expect(validateEmailSpy.callCount).toEqual(0);
    }
  });

  then("an error will be returned from requestVerificationEmail", () => {
    expect(currentError).toBeDefined();
  });

  and(
    "a success response is sent to the portal from requestVerificationEmail",
    () => {
      expect(currentResponse).toStrictEqual({ success: true });
    }
  );
};
