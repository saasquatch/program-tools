import { StepDefinitions } from "jest-cucumber";
import { verifyEmail } from "../../src/resolvers/verifyEmail";
import { applyActionCodeFailsWith, oobCodeSpy } from "../mocks/mockFirebase";

export const verifyEmailSteps: StepDefinitions = ({
  given,
  when,
  then,
  and,
}) => {
  let currentResponse: any;
  let currentError: any;
  let currentTenantAlias: any;
  afterEach(() => {
    currentResponse = null;
    currentError = null;
    currentTenantAlias = null;
    applyActionCodeFailsWith.code = null;
  });
  const oobCode = "12345";
  when(
    /^there is a request to verify a users email to the tenant "(.*)" with a valid oobCode$/,
    async (tenantAlias: string) => {
      currentTenantAlias = tenantAlias;
      try {
        currentResponse = await verifyEmail(
          undefined,
          { input: { oobCode } },
          { tenantAlias }
        );
      } catch (e) {
        currentError = e;
      }
    }
  );
  then("the users email will be verified", () => {
    expect(oobCodeSpy.calledOnceWithExactly(oobCode));
  });
  and("a success response is sent to the portal from verifyEmail", () => {
    expect(currentResponse.success).toEqual(true);
  });

  when(
    /^there is a request to verify a users email to the tenant "(.*)"$/,
    (tenantAlias) => {
      currentTenantAlias = tenantAlias;
    }
  );
  and(
    /^the email verification fails with the (.*)$/,
    async (errorCode: string) => {
      applyActionCodeFailsWith.code = errorCode;
      try {
        currentResponse = await verifyEmail(
          undefined,
          { input: { oobCode } },
          { tenantAlias: currentTenantAlias }
        );
      } catch (e) {
        currentError = e;
      }
    }
  );

  then(
    /^a (.*) error is sent to the portal from verifyEmail$/,
    (errorCode: string) => {
      expect(currentError.extensions.code).toEqual(errorCode);
    }
  );
};
