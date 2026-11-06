import {
  type ConfigProvider,
  setting,
  loadConfiguration,
  asNumber,
  asBoolean,
} from "./settings.ts";

class EnvironmentConfigProvider implements ConfigProvider {
  get(key: string): string {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable - ${key}`);
    }
    return process.env[key] as string;
  }

  has(key: string): boolean {
    return !!process.env[key];
  }
}

export class BaseConfig {
  port = setting("PORT", { transform: asNumber, default: 10000 });

  serverLogLevel = setting("SERVER_LOG_LEVEL", { default: "info" });

  serverLogFile = setting("SERVER_LOG_FILE", { default: "" });

  enforceHttps = setting("ENFORCE_HTTPS", { transform: asBoolean, default: true });

  proxyFrontend = setting("PROXY_FRONTEND", { default: "" });

  serviceName = setting("SERVICE_NAME");

  saasquatchAppDomain = setting("SAASQUATCH_APP_DOMAIN", {
    default: "app.referralsaasquatch.com",
  });

  saasquatchAuth0ClientId = setting("SAASQUATCH_AUTH0_CLIENT_ID");

  saasquatchAuth0Domain = setting("SAASQUATCH_AUTH0_DOMAIN");

  saasquatchAuth0Secret = setting("SAASQUATCH_AUTH0_SECRET");

  staticFrontendPath = setting("STATIC_FRONTEND_PATH", {
    default: "../../frontend/build",
  });

  staticFrontendIndex = setting("STATIC_FRONTEND_INDEX", {
    default: "index.html",
  });

  introspectionEndpointPath = setting("INTROSPECTION_ENDPOINT_PATH", {
    default: "/introspection",
  });

  metricsEnabled = setting("METRICS_ENABLED", {
    transform: asBoolean,
    default: false,
  });

  googleWorkloadIdentityProjectId = setting(
    "GOOGLE_WORKLOAD_IDENTITY_PROJECT_ID",
    { default: "" },
  );

  googleWorkloadIdentityPool = setting("GOOGLE_WORKLOAD_IDENTITY_POOL", {
    default: "",
  });

  googleWorkloadIdentityProvider = setting("GOOGLE_WORKLOAD_IDENTITY_PROVIDER", {
    default: "",
  });

  googleWorkloadIdentityServiceAccountEmail = setting(
    "GOOGLE_WORKLOAD_IDENTITY_SERVICE_ACCOUNT_EMAIL",
    { default: "" },
  );
}

export async function loadConfig<T extends BaseConfig>(
  Config?: new () => T,
): Promise<T> {
  const config = Config ? new Config() : new BaseConfig();
  await loadConfiguration(config, new EnvironmentConfigProvider());
  return config as T;
}
