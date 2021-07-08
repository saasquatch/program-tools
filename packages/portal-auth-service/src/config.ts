interface TenantConfigVariables {
  // these should be dynamic
  FIREBASE_AUTH_TENANT_ID: string;
  FIREBASE_AUTH_DOMAIN: string;
  PORTAL_DOMAIN: string;
  VERIFY_EMAIL_EMAIL_KEY: string;
  RESET_PASSWORD_EMAIL_KEY: string;
  FIREBASE_APP_ID: string;
  SQUATCH_API_KEY: string;
  SQUATCH_BASE_URL: string;
  ID_PREFIX?: string;
  AUTHENTICATE_USER_WEBHOOK_URL?: string;
  USER_SESSION_DATA_WEBHOOK_URL?: string;
  USER_UPSERT_JSONATA_TRANSFORMATION?: string;
  REGISTER_USER_WEBHOOK_URL?: string;
}
interface CommonConfigVariables {
  // these are shared by all tenants
  FIREBASE_API_KEY: string;
  FIREBASE_DB_URL: string;
  GOOGLE_APPLICATION_CREDENTIALS_JSON: string;
}

type ConfigVariables = TenantConfigVariables & CommonConfigVariables;

interface DefaultConfig {
  default: CommonConfigVariables;
}
interface TenantConfig {
  [tenant: string]: TenantConfigVariables;
}

export type Config = DefaultConfig & TenantConfig;

class ConfigStore {
  private static _config: Config;
  constructor(config?: Config) {
    try {
      ConfigStore._config =
        config || JSON.parse(process.env.CONFIG_JSON as string);
    } catch (e) {
      if (process.env.NODE_ENV !== "test")
        throw new Error("CONFIG_JSON must be set and be valid JSON");
    }
  }
  static config(squatchTenantAlias: string): ConfigVariables {
    const tenantConfig = ConfigStore._config[squatchTenantAlias];
    const defaultConfig = ConfigStore._config.default;

    const config: ConfigVariables = {
      GOOGLE_APPLICATION_CREDENTIALS_JSON:
        defaultConfig.GOOGLE_APPLICATION_CREDENTIALS_JSON,
      FIREBASE_DB_URL: defaultConfig.FIREBASE_DB_URL,
      FIREBASE_API_KEY: defaultConfig.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: tenantConfig.FIREBASE_AUTH_DOMAIN,
      FIREBASE_APP_ID: tenantConfig.FIREBASE_APP_ID,
      FIREBASE_AUTH_TENANT_ID: tenantConfig.FIREBASE_AUTH_TENANT_ID,
      PORTAL_DOMAIN: tenantConfig.PORTAL_DOMAIN,
      VERIFY_EMAIL_EMAIL_KEY: tenantConfig.VERIFY_EMAIL_EMAIL_KEY,
      RESET_PASSWORD_EMAIL_KEY: tenantConfig.RESET_PASSWORD_EMAIL_KEY,
      SQUATCH_API_KEY: tenantConfig.SQUATCH_API_KEY,
      SQUATCH_BASE_URL: tenantConfig.SQUATCH_BASE_URL,
      REGISTER_USER_WEBHOOK_URL: tenantConfig.REGISTER_USER_WEBHOOK_URL || "",
      AUTHENTICATE_USER_WEBHOOK_URL:
        tenantConfig.AUTHENTICATE_USER_WEBHOOK_URL || "",
      USER_SESSION_DATA_WEBHOOK_URL:
        tenantConfig.USER_SESSION_DATA_WEBHOOK_URL || "",
      USER_UPSERT_JSONATA_TRANSFORMATION:
        tenantConfig.USER_UPSERT_JSONATA_TRANSFORMATION || "",
      ID_PREFIX: tenantConfig.ID_PREFIX || "squatch_",
    };

    return (Object.keys(config) as Array<keyof ConfigVariables>).reduce(
      (conf, key) => {
        if (config[key] === undefined)
          throw new Error(`CONFIG VARIABLE NOT FOUND: ${key}`);
        return { ...conf, [key]: config[key] };
      },
      {}
    ) as ConfigVariables;
  }

  // for mocking
  static setConfig(config: Config) {
    ConfigStore._config = config;
  }
}
new ConfigStore();

export const setConfig = ConfigStore.setConfig;
export default ConfigStore.config;
