import { StepDefinitions } from "jest-cucumber";
import jwt from "jsonwebtoken";
import config from "../../src/config";
import { authenticateUser } from "../../src/resolvers/authenticateUser";
import { authenticateWebhookSpy } from "../mocks/handlers/webhook";
import {
  authenticateSpy,
  authenticationFailsWith,
} from "../mocks/mockFirebase";

export const authenticateUserSteps: StepDefinitions = ({
  given,
  when,
  then,
  and,
}) => {
  let currentUser: any;
  let currentResponse: any;
  let currentError: any;
  let currentTenantAlias: any;
  afterEach(() => {
    currentUser = null;
    currentResponse = null;
    currentError = null;
    currentTenantAlias = null;
    authenticationFailsWith.code = null;
  });
  when(
    /^there is a request to sign in to the tenant "(.*)" with the input$/,
    async (tenantAlias: string, jsonStr: string) => {
      currentUser = JSON.parse(jsonStr);
      currentTenantAlias = tenantAlias;
      currentResponse = await authenticateUser(
        undefined,
        { input: currentUser },
        { tenantAlias }
      );
    }
  );
  then("the user is authenticated with Google", () => {
    expect(authenticateSpy.calledOnceWithExactly(currentUser));
  });

  given(
    /^there was a request to sign in to the tenant "(.*)" with the input$/,
    async (tenantAlias: string, jsonStr: string) => {
      currentUser = JSON.parse(jsonStr);
      currentTenantAlias = tenantAlias;
    }
  );

  when(
    /^the user fails to authenticate with Google with the error (.*)$/,
    async (errorCode: string) => {
      authenticationFailsWith.code = errorCode;
      try {
        currentResponse = await authenticateUser(
          undefined,
          { input: currentUser },
          { tenantAlias: currentTenantAlias }
        );
      } catch (e) {
        currentError = e;
      }
    }
  );
  then(/^a (.*) error is thrown on authentication$/, (errorCode: string) => {
    expect(currentResponse).toBeNull();
    expect(currentError).toBeDefined();
    expect(currentError.extensions.code).toEqual(errorCode);
  });

  then(
    "there is a request made to the AUTHENTICATE_USER_WEBHOOK_URL with the headers and body",
    (jsonStr) => {
      const { headers, body } = JSON.parse(jsonStr);
      expect(authenticateWebhookSpy.calledOnce);
      const [req] = authenticateWebhookSpy.args[0];
      expect(req.body).toStrictEqual(body);
      for (const key of Object.keys(headers)) {
        expect(req.headers.get(key)).toBeDefined();
      }
    }
  );

  then(
    "the sessionData response is returned to the portal from authenticateUser",
    () => {
      expect(currentResponse.sessionData).toStrictEqual({
        something: "important",
      });
    }
  );
  then(
    "the sessionData response is returned to the portal from authenticateUser with the value",
    (jsonStr: string) => {
      expect(currentResponse.sessionData).toStrictEqual(JSON.parse(jsonStr));
    }
  );

  then("a JWT is returned from authenticateUser", () => {
    expect(currentResponse.squatchJWT).toBeDefined();
  });
  and("the JWT from authenticateUser is signed with the tenant API key", () => {
    expect(
      jwt.verify(
        currentResponse.squatchJWT,
        config(currentTenantAlias).SQUATCH_API_KEY
      )
    );
  });
  and("the JWT from authenticateUser payload contains the user", () => {
    const decoded = jwt.verify(
      currentResponse.squatchJWT,
      config(currentTenantAlias).SQUATCH_API_KEY
    ) as any;
    expect(decoded.user).toStrictEqual({
      email: currentUser.email,
      id: "squatchy_123456",
      accountId: "squatchy_123456",
    });
  });
};
