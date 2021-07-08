import { StepDefinitions } from "jest-cucumber";
import { resetPassword } from "../../src/resolvers/resetPassword";
import {
  oobCodeSpy,
  resetPasswordSpy,
  verifyPasswordResetCodeFailsWith,
} from "../mocks/mockFirebase";

export const resetPasswordSteps: StepDefinitions = ({
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
    verifyPasswordResetCodeFailsWith.code = null;
  });
  const oobCode = "123455555";
  const password = "123456";
  when(
    /^there is a request to reset a users password to the tenant "(.*)" with a valid oobCode$/,
    async (tenantAlias: string) => {
      currentTenantAlias = tenantAlias;
      try {
        currentResponse = await resetPassword(
          undefined,
          { input: { password, oobCode } },
          { tenantAlias }
        );
      } catch (e) {
        currentError = e;
      }
    }
  );
  then("the users password will be reset", () => {
    expect(oobCodeSpy.calledOnceWithExactly(oobCode));
    expect(resetPasswordSpy.calledOnceWithExactly(oobCode, password));
  });
  then("a success response is sent to the portal from resetPassword", () => {
    expect(currentResponse.success).toEqual(true);
  });

  when(
    /^there is a request to reset a users password to the tenant "(.*)"$/,
    (tenantAlias) => {
      currentTenantAlias = tenantAlias;
    }
  );
  and(/^the password reset fails with the (.*)$/, async (errorCode: string) => {
    verifyPasswordResetCodeFailsWith.code = errorCode;
    try {
      currentResponse = await resetPassword(
        undefined,
        { input: { password, oobCode } },
        { tenantAlias: currentTenantAlias }
      );
    } catch (e) {
      currentError = e;
    }
  });

  then(
    /^a (.*) error is sent to the portal from resetPassword$/,
    (errorCode: string) => {
      expect(currentError.extensions.code).toEqual(errorCode);
    }
  );
};
