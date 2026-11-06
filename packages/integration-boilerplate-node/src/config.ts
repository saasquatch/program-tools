import {
  type ConfigProvider,
  key,
  optional,
  loadConfiguration,
  asNumber,
  asBoolean,
} from "./typed-config.ts";

// Re-export the full config API so consumers no longer need to depend on the
// (vendored, previously external) typed-config package to extend BaseConfig.
export {
  key,
  optional,
  nested,
  asNumber,
  asBoolean,
  split,
  map,
  trim,
  loadConfiguration,
  type ConfigProvider,
  type ValueTransform,
  type OptionalPredicate,
} from "./typed-config.ts";

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
  @key("PORT", asNumber)
  @optional(10000)
  public port!: number;

  @key("SERVER_LOG_LEVEL")
  @optional("info")
  public serverLogLevel!: string;

  @key("SERVER_LOG_FILE")
  @optional("")
  public serverLogFile!: string;

  @key("ENFORCE_HTTPS", asBoolean)
  @optional(true)
  public enforceHttps!: boolean;

  @key("PROXY_FRONTEND")
  @optional("")
  public proxyFrontend!: string;

  @key("SERVICE_NAME")
  public serviceName!: string;

  @key("SAASQUATCH_APP_DOMAIN")
  @optional("app.referralsaasquatch.com")
  public saasquatchAppDomain!: string;

  @key("SAASQUATCH_AUTH0_CLIENT_ID")
  public saasquatchAuth0ClientId!: string;

  @key("SAASQUATCH_AUTH0_DOMAIN")
  public saasquatchAuth0Domain!: string;

  @key("SAASQUATCH_AUTH0_SECRET")
  public saasquatchAuth0Secret!: string;

  @key("STATIC_FRONTEND_PATH")
  @optional("../../frontend/build")
  public staticFrontendPath!: string;

  @key("STATIC_FRONTEND_INDEX")
  @optional("index.html")
  public staticFrontendIndex!: string;

  @key("INTROSPECTION_ENDPOINT_PATH")
  @optional("/introspection")
  public introspectionEndpointPath!: string;

  @key("METRICS_ENABLED")
  @optional(false)
  public metricsEnabled!: boolean;

  @key("GOOGLE_WORKLOAD_IDENTITY_PROJECT_ID")
  @optional("")
  public googleWorkloadIdentityProjectId!: string;

  @key("GOOGLE_WORKLOAD_IDENTITY_POOL")
  @optional("")
  public googleWorkloadIdentityPool!: string;

  @key("GOOGLE_WORKLOAD_IDENTITY_PROVIDER")
  @optional("")
  public googleWorkloadIdentityProvider!: string;

  @key("GOOGLE_WORKLOAD_IDENTITY_SERVICE_ACCOUNT_EMAIL")
  @optional("")
  public googleWorkloadIdentityServiceAccountEmail!: string;
}

export async function loadConfig<T extends BaseConfig>(
  Config?: new () => T
): Promise<T> {
  const config = Config ? new Config() : new BaseConfig();
  await loadConfiguration(config, new EnvironmentConfigProvider());
  return config as T;
}
