/*
 * Vendored from typed-config@1.0.0 (https://github.com/christav/typed-config, MIT License).
 * Copyright (c) Chris Tavares
 *
 * typed-config has been unmaintained since 2018. This is a TypeScript port of the
 * subset of its public API used by this package and its consumers, with one
 * deliberate fix: the built-in transforms (asNumber, asBoolean, split, map, trim)
 * now match the (target, propertyName, value) signature that loadConfiguration
 * actually invokes transforms with. Upstream shipped them with a (value, ...)
 * signature, which made them operate on the wrong argument
 * (https://github.com/christav/typed-config/issues/1).
 *
 * The runtime semantics of the decorators and loader are otherwise intentionally
 * identical to upstream, including quirks, to avoid behavior changes for
 * consumers that subclass BaseConfig.
 */

export interface ConfigProvider {
  get(key: string): string;
  has(key: string): boolean;
}

/**
 * A transform applied to a loaded config value. Receives the object being
 * configured, the property name, and the raw value; returns the transformed
 * value (or a promise of it).
 */
export interface ValueTransform {
  (target: any, propertyName: string, value: any): any;
}

interface KeyLoader {
  (configProvider: ConfigProvider): Promise<any>;
  configKey: string | null;
}

interface KeyInfo {
  propertyName: string;
  loader: KeyLoader;
  transformers: ValueTransform[];
}

export interface PropertyDecorator {
  (proto: any, prop: string): void;
}

export interface OptionalPredicate {
  (
    target: any,
    propertyName?: string,
    keyName?: string,
    config?: ConfigProvider,
  ): boolean;
}

interface OptionalInfo {
  propertyName: string;
  predicate: OptionalPredicate;
  defaultValue?: any;
}

type OptionalInfos = { [key: string]: OptionalInfo };

//
// Metadata storage on class prototypes
//

const KeyInfoSymbol = Symbol("configkeyinfo");
const OptionalInfoSymbol = Symbol("optionalkeyinfo");

function tryGetAtSymbol(target: any, key: symbol): any {
  if (target[key]) {
    return target[key];
  }
  if (typeof target === "function" && target.prototype?.[key]) {
    return target.prototype[key];
  }
  if (Object.getPrototypeOf(target)?.[key]) {
    return Object.getPrototypeOf(target)[key];
  }
  return undefined;
}

function getKeyInfos(obj: any): KeyInfo[] {
  const value = tryGetAtSymbol(obj, KeyInfoSymbol);
  if (value === undefined) {
    throw new Error(
      "Cannot load configuration, the supplied object is not decorated for configuration loading",
    );
  }
  return value;
}

function setKeyInfo(proto: any, info: KeyInfo): void {
  const infoList: KeyInfo[] = proto[KeyInfoSymbol] || [];
  if (
    infoList.length > 0 &&
    infoList[infoList.length - 1]!.propertyName === info.propertyName
  ) {
    throw new Error(
      `Configuration definition error: Multiple keys or nested specified for property ${info.propertyName}`,
    );
  }
  infoList.push(info);
  proto[KeyInfoSymbol] = infoList;
}

function getOptionalInfo(obj: any): OptionalInfos {
  return tryGetAtSymbol(obj, OptionalInfoSymbol) || {};
}

function setOptionalInfo(proto: any, info: OptionalInfo): void {
  const infos: OptionalInfos = proto[OptionalInfoSymbol] || {};
  infos[info.propertyName] = info;
  proto[OptionalInfoSymbol] = infos;
}

//
// @key decorator
//

function scalarLoader(configKey: string): KeyLoader {
  const loader: KeyLoader = Object.assign(
    (config: ConfigProvider) => Promise.resolve(config.get(configKey)),
    { configKey },
  );
  return loader;
}

export function key(
  keyName: string,
  ...transforms: ValueTransform[]
): PropertyDecorator {
  return function keyDecorator(proto: any, propName: string): void {
    setKeyInfo(proto, {
      propertyName: propName,
      loader: scalarLoader(keyName),
      transformers: transforms,
    });
  };
}

//
// @optional decorator
//

const checkConfigPredicate: OptionalPredicate = (
  _target,
  _propertyName,
  keyName,
  config,
) => config!.has(keyName!);

export function optional(
  predicate: OptionalPredicate,
  defaultValue: any,
): PropertyDecorator;
export function optional(predicate: OptionalPredicate): PropertyDecorator;
export function optional(defaultValue: any): PropertyDecorator;
export function optional(): PropertyDecorator;
export function optional(...args: any[]): PropertyDecorator {
  let predicate: OptionalPredicate = checkConfigPredicate;
  let defaultValue: any;

  if (args.length === 1 && typeof args[0] === "function") {
    predicate = args[0];
  } else if (args.length === 1) {
    defaultValue = args[0];
  } else if (args.length >= 2) {
    predicate = args[0];
    defaultValue = args[1];
  }

  return function optionalDecorator(proto: any, propertyName: string): void {
    setOptionalInfo(proto, { propertyName, predicate, defaultValue });
  };
}

//
// @nested decorator
//

export function nested(
  subObjectType: new () => any,
  ...transforms: ValueTransform[]
): PropertyDecorator {
  const loader: KeyLoader = Object.assign(
    (config: ConfigProvider) => {
      const subObject = new subObjectType();
      return loadConfiguration(subObject, config).then(() => subObject);
    },
    { configKey: null },
  );

  return function nestedDecorator(proto: any, propName: string): void {
    setKeyInfo(proto, {
      propertyName: propName,
      loader,
      transformers: transforms,
    });
  };
}

//
// Built-in transforms, with the corrected (target, propertyName, value) signature
//

export function asNumber(_target: any, _propertyName: string, value: any): number {
  return +value;
}

export function asBoolean(
  _target: any,
  _propertyName: string,
  value: any,
): boolean {
  return (value as string).toLowerCase() === "true";
}

export function trim(_target: any, _propertyName: string, value: any): string {
  return value.toString().match(/^\s*(.*?)\s*$/m)![1]!;
}

export function split(splitChar: string): ValueTransform {
  return (_target, _propertyName, value) => (value as string).split(splitChar);
}

export function map(transform: ValueTransform): ValueTransform {
  return async (target, propertyName, value) => {
    const results: any[] = [];
    for (const item of value as any[]) {
      results.push(await transform(target, propertyName, item));
    }
    return results;
  };
}

//
// Configuration loader
//

const notOptional: OptionalInfo = {
  propertyName: "n/a",
  predicate: () => true,
};

export async function loadConfiguration(
  obj: any,
  configProvider: ConfigProvider,
): Promise<void> {
  const keyInfos = getKeyInfos(obj);
  const optionals = getOptionalInfo(obj);

  for (const info of keyInfos) {
    const optionalInfo = optionals[info.propertyName] || notOptional;
    const shouldLoad = optionalInfo.predicate(
      obj,
      info.propertyName,
      info.loader.configKey || "",
      configProvider,
    );

    if (!shouldLoad && optionalInfo.defaultValue !== undefined) {
      obj[info.propertyName] = optionalInfo.defaultValue;
    } else if (shouldLoad) {
      let value = await info.loader(configProvider);
      for (const transform of info.transformers) {
        value = await transform(obj, info.propertyName, value);
      }
      obj[info.propertyName] = value;
    }
  }
}
