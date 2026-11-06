import assert from "node:assert/strict";
import { Given, When, Then } from "@cucumber/cucumber";

import {
  type ConfigProvider,
  setting,
  nested,
  loadConfiguration,
  asNumber,
  asBoolean,
  trim,
  split,
} from "../../src/settings.ts";
import type { TestWorld } from "../support/world.ts";

/** A simple provider backed by a map; get() throws for missing keys. */
class MapConfigProvider implements ConfigProvider {
  protected values: Record<string, string>;

  constructor(values: Record<string, string>) {
    this.values = values;
  }

  get(key: string): string {
    const value = this.values[key];
    if (value === undefined) {
      throw new Error(`Missing key - ${key}`);
    }
    return value;
  }

  has(key: string): boolean {
    return key in this.values;
  }
}

/** A misbehaving provider whose get() silently returns undefined. */
class SilentMapConfigProvider extends MapConfigProvider {
  override get(key: string): string {
    return this.values[key] as string;
  }
}

interface SettingsWorld extends TestWorld {
  settingsObject?: Record<string, unknown>;
  settingsValues?: Record<string, string>;
  settingsSilentProvider?: boolean;
  settingsError?: unknown;
}

function configObject(world: SettingsWorld): Record<string, unknown> {
  world.settingsObject ??= {};
  return world.settingsObject;
}

function providerValues(world: SettingsWorld): Record<string, string> {
  world.settingsValues ??= {};
  return world.settingsValues;
}

Given(
  "a provider that returns undefined instead of throwing for missing keys",
  function (this: SettingsWorld) {
    this.settingsSilentProvider = true;
  },
);

Given(
  "a config with a required string setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key);
  },
);

Given(
  "a config with a string setting for key {string} and default {string}",
  function (this: SettingsWorld, key: string, defaultValue: string) {
    configObject(this)["value"] = setting(key, { default: defaultValue });
  },
);

Given(
  "a config with an optional string setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key, { optional: true });
  },
);

Given(
  "a config with a number setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key, { transform: asNumber });
  },
);

Given(
  "a config with a number setting for key {string} and default {int}",
  function (this: SettingsWorld, key: string, defaultValue: number) {
    configObject(this)["value"] = setting(key, {
      transform: asNumber,
      default: defaultValue,
    });
  },
);

Given(
  "a config with a boolean setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key, { transform: asBoolean });
  },
);

Given(
  "a config with a trimmed string setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key, { transform: trim });
  },
);

Given(
  "a config with a comma-split setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key, { transform: split(",") });
  },
);

Given(
  "a config with a custom transform setting for key {string}",
  function (this: SettingsWorld, key: string) {
    configObject(this)["value"] = setting(key, {
      transform: (value, settingKey) => `${settingKey}=${value}`,
    });
  },
);

Given(
  "a config with a nested config containing a required string setting for key {string}",
  function (this: SettingsWorld, key: string) {
    class NestedConfig {
      value = setting(key);
    }
    configObject(this)["nestedConfig"] = nested(NestedConfig);
  },
);

Given(
  "a config with a plain field set to {string}",
  function (this: SettingsWorld, value: string) {
    configObject(this)["plainField"] = value;
  },
);

Given(
  "the provider has {string} set to {string}",
  function (this: SettingsWorld, key: string, value: string) {
    providerValues(this)[key] = value;
  },
);

When("the configuration is loaded", async function (this: SettingsWorld) {
  const values = providerValues(this);
  const provider = this.settingsSilentProvider
    ? new SilentMapConfigProvider(values)
    : new MapConfigProvider(values);
  try {
    await loadConfiguration(configObject(this), provider);
  } catch (e) {
    this.settingsError = e;
  }
});

Then(
  "the config value will be {string}",
  function (this: SettingsWorld, expected: string) {
    assert.equal(this.settingsError, undefined);
    assert.equal(configObject(this)["value"], expected);
  },
);

Then(
  "the config value will be the number {float}",
  function (this: SettingsWorld, expected: number) {
    assert.equal(this.settingsError, undefined);
    assert.equal(configObject(this)["value"], expected);
  },
);

Then(
  /^the config value will be the boolean (true|false)$/,
  function (this: SettingsWorld, expected: string) {
    assert.equal(this.settingsError, undefined);
    assert.equal(configObject(this)["value"], expected === "true");
  },
);

Then("the config value will be undefined", function (this: SettingsWorld) {
  assert.equal(this.settingsError, undefined);
  assert.ok("value" in configObject(this));
  assert.equal(configObject(this)["value"], undefined);
});

Then(
  "the config value will be the array:",
  function (this: SettingsWorld, docString: string) {
    assert.equal(this.settingsError, undefined);
    assert.deepEqual(configObject(this)["value"], JSON.parse(docString));
  },
);

Then(
  "the nested config value will be {string}",
  function (this: SettingsWorld, expected: string) {
    assert.equal(this.settingsError, undefined);
    const nestedConfig = configObject(this)["nestedConfig"] as Record<
      string,
      unknown
    >;
    assert.equal(nestedConfig["value"], expected);
  },
);

Then(
  "the plain field will still be {string}",
  function (this: SettingsWorld, expected: string) {
    assert.equal(this.settingsError, undefined);
    assert.equal(configObject(this)["plainField"], expected);
  },
);

Then(
  "loading will fail with an error containing:",
  function (this: SettingsWorld, docString: string) {
    assert.ok(this.settingsError instanceof Error, "expected loading to fail");
    assert.ok(
      this.settingsError.message.includes(docString.trim()),
      `expected "${this.settingsError.message}" to contain "${docString.trim()}"`,
    );
  },
);
