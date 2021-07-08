import jwt from "jsonwebtoken";
import { StepDefinitions } from "jest-cucumber";
import config from "../../src/config";
import { registerUser } from "../../src/resolvers/registerUser";
import { registerWebhookSpy } from "../mocks/handlers/webhook";
import { createUserSpy, registrationFailsWith } from "../mocks/mockFirebase";
import { upsertSpy } from "../mocks/handlers/core";

export const registerUserSteps: StepDefinitions = ({
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
    registrationFailsWith.code = null;
  });

  given(/^A user with the email "(.*)" does not exist$/, (arg0) => {
    // no op
  });
  given(/^A user with the email "(.*)" already exists$/, (arg0) => {
    registrationFailsWith.code = "auth/email-already-exists";
  });

  when(
    /^there is a request to sign up to the tenant "(.*)" with the input$/,
    async (tenantAlias, input) => {
      const registerInput = JSON.parse(input);
      currentTenantAlias = tenantAlias;
      currentUser = {
        email: registerInput.email,
        password: registerInput.password,
      };
      try {
        currentResponse = await registerUser(
          undefined,
          { input: registerInput },
          { tenantAlias }
        );
      } catch (e) {
        currentError = e;
      }
    }
  );

  then("the user is registered with Google", () => {
    expect(
      createUserSpy.calledOnceWithExactly(
        currentUser.email,
        currentUser.password
      )
    );
  });

  then(/^a "(.*)" error is thrown on registration$/, (errorCode) => {
    expect(currentResponse).toBeNull();
    expect(currentError).toBeDefined();
    expect(currentError.extensions.code).toEqual(errorCode);
  });

  then(
    "there is a request made to the REGISTER_USER_WEBHOOK_URL with the headers and body",
    (jsonStr) => {
      const { headers, body } = JSON.parse(jsonStr);
      expect(registerWebhookSpy.calledOnce);
      const [req] = registerWebhookSpy.args[0];
      expect(req.body).toStrictEqual(body);
      for (const key of Object.keys(headers)) {
        expect(req.headers.get(key)).toBeDefined();
      }
    }
  );
  and("the userUpsert response is sent to Saasqutach core", () => {
    expect(upsertSpy.calledOnce);
    const [req] = upsertSpy.args[0];
    expect(req.body.query).toEqual(`
    mutation upsert($userInput: UserInput!) {
      upsertUser(userInput: $userInput) {
        id
      }
    }
  `);
    expect(req.body.variables).toStrictEqual({
      userInput: {
        email: "test@example.com",
        id: "squatchy_123456",
        accountId: "squatchy_123456",
        tenantAlias: "test_1234",
        firstName: "Bob",
        lastName: "Test",
        customFields: {
          accountNumber: "1234555",
        },
      },
    });
  });
  and(
    "the sessionData response is returned to the portal from registerUser",
    () => {
      expect(currentResponse.sessionData).toStrictEqual({
        accountNumber: "1234555",
      });
    }
  );
  and(
    "the sessionData response is returned to the portal from registerUser with the value",
    (jsonStr) => {
      expect(currentResponse.sessionData).toStrictEqual(JSON.parse(jsonStr));
    }
  );

  then("a JWT is returned from registerUser", () => {
    expect(currentResponse.squatchJWT).toBeDefined();
  });
  and("the JWT from registerUser is signed with the tenant API key", () => {
    expect(
      jwt.verify(
        currentResponse.squatchJWT,
        config(currentTenantAlias).SQUATCH_API_KEY
      )
    );
  });
  and("the JWT from registerUser payload contains the user", () => {
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
