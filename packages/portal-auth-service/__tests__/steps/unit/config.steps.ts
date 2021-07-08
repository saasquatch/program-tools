import { StepDefinitions } from "jest-cucumber";
import config, { setConfig, Config } from "../../../src/config";

export const configSteps: StepDefinitions = ({ given, when, then }) => {
  const exampleCommonConfig = {
    FIREBASE_DB_URL: "https://example.firebaseio.com",
    FIREBASE_API_KEY: "AIza_XXXX",
    GOOGLE_APPLICATION_CREDENTIALS_JSON: `{
        "type": "service_account",
        "project_id": "example",
        "private_key_id": "1234",
        "private_key": "-----BEGIN PRIVATE KEY-----\nXXXXXXX==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase@example.iam.gserviceaccount.com",
        "client_id": "1234",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase%40example.iam.gserviceaccount.com"
      }`,
  };
  const exampleTenantConfig = {
    ID_PREFIX: "squatchy_",
    FIREBASE_APP_ID: "example",
    FIREBASE_AUTH_DOMAIN: "https://example.firebaseio.com",
    PORTAL_DOMAIN: "https://www.example.com",
    VERIFY_EMAIL_EMAIL_KEY: "verify-email",
    RESET_PASSWORD_EMAIL_KEY: "reset-password",
    FIREBASE_AUTH_TENANT_ID: "TESTING-abcde",
    SQUATCH_API_KEY: "TEST_123456",
    SQUATCH_BASE_URL: "https://staging.referralsaasquatch.com",
    REGISTER_USER_WEBHOOK_URL: "http://localhost:3000/webhook/register/",
    AUTHENTICATE_USER_WEBHOOK_URL:
      "http://localhost:3000/webhook/authenticate/",
  };
  let currentConfig: any;
  let currentError: any;

  const createConfig = (tenantAliases: string[]): Config => {
    return tenantAliases.reduce(
      (cfg: any, tenantAlias: string) => ({
        [tenantAlias]: { ...exampleTenantConfig },
        ...cfg,
      }),
      { default: { ...exampleCommonConfig } }
    ) as Config;
  };

  afterEach(() => {
    currentConfig = null;
    currentError = null;
  });

  given(
    /^there is a configuration for the tenant "(.*)"$/,
    (tenantAlias: string) => {
      setConfig(createConfig([tenantAlias]));
    }
  );

  given(
    /^there are configurations for the tenants "(.*)"$/,
    (tenantAliases: string) => {
      const tenantAliasArr = tenantAliases.split(", ");
      setConfig(createConfig(tenantAliasArr));
    }
  );
  given(
    /^the "(.*)" is configured for the tenant "(.*)"$/,
    (_variable, tenantAlias) => {
      setConfig(createConfig([tenantAlias]));
    }
  );

  given(
    /^the "(.*)" is not configured for the tenant "(.*)"$/,
    (variable, tenantAlias) => {
      const conf = createConfig([tenantAlias]) as any;
      delete conf.default[variable];
      delete conf[tenantAlias][variable];
      setConfig(conf);
    }
  );

  when(
    /^there is a config loaded with the tenant "(.*)"$/,
    (tenantAlias: string) => {
      try {
        currentConfig = config(tenantAlias);
      } catch (e) {
        currentError = e;
      }
    }
  );

  then(
    /^the (.*) will be taken from the default configuration$/,
    (variable: string) => {
      expect(currentConfig[variable]).toEqual(
        (exampleCommonConfig as any)[variable]
      );
    }
  );

  then(
    /^the (.*) will be taken from the "(.*)" configuration$/,
    (variable: string, tenantAlias: string) => {
      // todo
    }
  );
  then(/^an Error will be thrown from the config$/, () => {
    expect(currentError).toBeDefined();
    expect(currentError.message.startsWith(`CONFIG VARIABLE NOT FOUND:`));
  });
  then(
    /^the (.*) will have the default value "(.*)"$/,
    (variable: string, dflt: string) => {
      expect(currentConfig[variable]).toEqual(dflt);
    }
  );
};
