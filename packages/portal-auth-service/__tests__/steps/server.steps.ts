import { StepDefinitions } from "jest-cucumber";
import { startServer } from "../../src";
import { silenceLogger } from "../../src/logger";
import { authenticateUser } from "../../src/resolvers/authenticateUser";
import { registerUser } from "../../src/resolvers/registerUser";
import { requestPasswordResetEmail } from "../../src/resolvers/requestPasswordResetEmail";
import { requestVerificationEmail } from "../../src/resolvers/requestVerificationEmail";
import { resetPassword } from "../../src/resolvers/resetPassword";
import { verifyEmail } from "../../src/resolvers/verifyEmail";
import request from "supertest";

export const serverSteps: StepDefinitions = ({ given, when, then, and }) => {
  let _server: any;
  let _app: any;
  let _exit: any;
  const mutations: any = {
    registerUser: registerUser,
    authenticateUser: authenticateUser,
    requestVerificationEmail: requestVerificationEmail,
    requestPasswordResetEmail: requestPasswordResetEmail,
    resetPassword: resetPassword,
    verifyEmail: verifyEmail,
  };
  afterEach(async () => {
    if (_exit) await _exit();
  });

  when(/^the server is started$/, async () => {
    silenceLogger();
    const s = await startServer();
    _server = s.server;
    _app = s.app;
    _exit = s.exit;
  });

  then(
    /^the graphql server has a resolver configured for the (.*)$/,
    (mutation) => {
      expect(_server.config.resolvers.Mutation[mutation]).toEqual(
        mutations[mutation]
      );
    }
  );
  then(
    /^the graphql route is configured for the tenant "(.*)"$/,
    async (tenantAlias: string) => {
      expect(_server.graphqlPath).toEqual("/tenant/:tenant/graphql");
      const query = `
        mutation authenticate($input: AuthenticateUserInput!) {
          authenticateUser(input: $input) {
            squatchJWT
            sessionData
          }
        }
      `;
      const variables = {
        input: {
          email: "test@exmaple.com",
          password: "password",
        },
      };
      const response = await request(_app)
        .post(`/tenant/${tenantAlias}/graphql`)
        .send({
          query,
          variables,
        });
      expect(response.body.data.authenticateUser).toBeDefined();
    }
  );

  then("the well-known jwks route is configured", async () => {
    const response = await request(_app).get("/.well-known/jwks.json");
    expect(response.body).toHaveProperty("keys");
    const keys = response.body.keys;
    expect(keys.length).toEqual(1);
    const key = keys[0];
    expect(key).toHaveProperty("kty");
    expect(key.kty).toEqual("RSA");
    expect(key).toHaveProperty("kid");
    expect(key).toHaveProperty("use");
    expect(key.use).toEqual("sig");
    expect(key).toHaveProperty("alg");
    expect(key.alg).toEqual("RS256");
    expect(key).toHaveProperty("e");
    expect(key.e).toEqual("AQAB");
    expect(key).toHaveProperty("n");
  });
};
