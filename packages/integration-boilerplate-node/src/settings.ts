/*
 * Environment-driven configuration settings.
 *
 * Successor to the decorator-based typed-config API (typed-config@1.0.0, MIT,
 * https://github.com/christav/typed-config). Settings are now
 * declared as class field initializers:
 *
 *   class MyConfig extends BaseConfig {
 *     myApiUrl = setting("MY_API_URL", { default: "" });
 *     myLimit = setting("MY_LIMIT", { transform: asNumber, default: 10 });
 *   }
 *
 * `setting()` is typed as returning the resolved value but actually returns a
 * descriptor; `loadConfiguration()` replaces every descriptor with its
 * resolved value before the config object is returned to callers. Reading a
 * config field before loadConfiguration() has run is a programming error.
 */

export interface ConfigProvider {
  get(key: string): string;
  has(key: string): boolean;
}

/** Converts the raw string value of a config key to its typed value. */
export type ValueTransform<T> = (value: string, key: string) => T;

const SettingBrand = Symbol("configsetting");
const NestedBrand = Symbol("confignested");

interface SettingDescriptor {
  [SettingBrand]: true;
  key: string;
  transform?: ValueTransform<unknown>;
  hasDefault: boolean;
  defaultValue?: unknown;
  optional: boolean;
}

interface NestedDescriptor {
  [NestedBrand]: true;
  Nested: new () => object;
}

function isSetting(value: unknown): value is SettingDescriptor {
  return typeof value === "object" && value !== null && SettingBrand in value;
}

function isNested(value: unknown): value is NestedDescriptor {
  return typeof value === "object" && value !== null && NestedBrand in value;
}

/** Required string setting. Loading throws if the key is absent. */
export function setting(key: string): string;
/** Transformed setting with a default used when the key is absent. */
export function setting<T>(
  key: string,
  options: { transform: ValueTransform<T>; default: T },
): T;
/** Optional transformed setting; undefined when the key is absent. */
export function setting<T>(
  key: string,
  options: { transform: ValueTransform<T>; optional: true },
): T | undefined;
/** Required transformed setting; optional must be false or absent. Loading throws if the key is absent. */
export function setting<T>(
  key: string,
  options: { transform: ValueTransform<T>; optional?: false },
): T;
/** String setting with a default used when the key is absent. */
export function setting(key: string, options: { default: string }): string;
/** Optional string setting; undefined when the key is absent. */
export function setting(
  key: string,
  options: { optional: true },
): string | undefined;
export function setting(
  key: string,
  options: {
    transform?: ValueTransform<unknown>;
    default?: unknown;
    optional?: boolean;
  } = {},
): any {
  const descriptor: SettingDescriptor = {
    [SettingBrand]: true,
    key,
    transform: options.transform,
    hasDefault: Object.prototype.hasOwnProperty.call(options, "default"),
    defaultValue: options.default,
    optional: options.optional === true,
  };
  return descriptor;
}

/**
 * A nested config object loaded from the same provider, e.g.
 * `database = nested(DatabaseConfig);`
 */
export function nested<T extends object>(Nested: new () => T): T;
export function nested(Nested: new () => object): unknown {
  const descriptor: NestedDescriptor = { [NestedBrand]: true, Nested };
  return descriptor;
}

//
// Transforms
//

export function asNumber(value: string): number {
  return +value;
}

export function asBoolean(value: string): boolean {
  return value.toLowerCase() === "true";
}

export function trim(value: string): string {
  return value.trim();
}

export function split(separator: string): ValueTransform<string[]> {
  return (value) => value.split(separator);
}

//
// Loader
//

/**
 * Resolves every setting/nested declaration on the object (own enumerable
 * properties, which includes inherited class field initializers) against the
 * given provider, replacing descriptors with resolved values in place.
 */
export async function loadConfiguration(
  obj: object,
  configProvider: ConfigProvider,
): Promise<void> {
  for (const [property, value] of Object.entries(obj)) {
    if (isSetting(value)) {
      Reflect.set(obj, property, resolveSetting(value, configProvider));
    } else if (isNested(value)) {
      const nestedObject = new value.Nested();
      await loadConfiguration(nestedObject, configProvider);
      Reflect.set(obj, property, nestedObject);
    }
  }
}

function resolveSetting(
  descriptor: SettingDescriptor,
  configProvider: ConfigProvider,
): unknown {
  if (!configProvider.has(descriptor.key)) {
    if (descriptor.hasDefault) {
      return descriptor.defaultValue;
    }
    if (descriptor.optional) {
      return undefined;
    }
    throw new Error(`Missing required configuration key "${descriptor.key}"`);
  }

  const raw = configProvider.get(descriptor.key);
  return descriptor.transform ? descriptor.transform(raw, descriptor.key) : raw;
}
