# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-11-06

### BREAKING CHANGES

- Minimum supported Node.js version is now 24 (`engines: ^24 || ^26`, was `>=18`).
- The `typed-config` dependency has been removed and replaced with an in-house
  settings API. The `@key`/`@optional` decorators no longer exist; settings are now declared as class field initializers using `setting()` (plus `nested()` and the
  transform helpers `asNumber`, `asBoolean`, `trim`, and `split`), all
  exported from `@saasquatch/integration-boilerplate-node`. Consumers
  extending `BaseConfig` must be updated:

  ```ts
  // Before
  @key("HUBSPOT_APP_ID", asNumber)
  public hubspotAppId!: number;

  @key("DEPLOYMENT_ENVIRONMENT")
  @optional("dev")
  public deploymentEnvironment!: string;

  // After
  hubspotAppId = setting("HUBSPOT_APP_ID", { transform: asNumber });
  deploymentEnvironment = setting("DEPLOYMENT_ENVIRONMENT", { default: "dev" });
  ```

  Custom transform functions change signature from
  `(obj, propertyName, value)` to `(value, key)`.

- A required setting that is missing from the environment now fails loading
  with `Missing required configuration key "<KEY>"` (previously
  `Missing environment variable - <KEY>`).
- `METRICS_ENABLED` is now parsed as a boolean. Previously it had no
  transform, so `METRICS_ENABLED=false` resolved to the truthy string
  `"false"` and enabled metrics.
- Updated `@saasquatch/logger` from 1.x to 4.x and removed Winston entirely.
- Updated `@saasquatch/express-boilerplate` from 1.x to 3.x.

### Changed

- Replaced the `auth0` SDK with `@auth0/auth0-auth-js` for the workload
  identity client credentials flow. The token file written for Google
  Workload Identity Federation keeps the same format.
- `handleError` now accepts `unknown` instead of `Error`. Throwing `null` or
  `undefined` no longer causes a secondary error inside the error handler and
  instead produces a clean `UNKNOWN_ERROR` response.
- Updated the OpenTelemetry metrics stack
  (`@opentelemetry/exporter-metrics-otlp-http` 0.219.x,
  `@opentelemetry/resources` and `@opentelemetry/sdk-metrics` 2.8.x).
- Updated dependencies: `express` 4.22.x, `compression` 1.8.x, `ajv` 8.20.x,
  `json-schema` 0.4.x.

### Removed

- Removed unused dependencies: `body-parser`,
  `@opentelemetry/exporter-trace-otlp-http`, `@opentelemetry/instrumentation`,
  `@opentelemetry/sdk-trace-base`, `@types/auth0`,
  `@types/http-proxy-middleware`, `@types/lodash`, `@types/node-cache`.

## [2.4.1] - 2025-03-20

### Changed

- Updated `@saasquatch/logger` to version 1.5.1

## [2.4.0] - 2024-07-16

### Added

- add `impactBrandId` from integration token claims to request object in auth middleware

## [2.1.1] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [2.1.0] - 2023-03-20

### Added

- Support for automatically generating `GOOGLE_APPLICATION_CREDENTIALS` for use with Workload Identity Federation
- Added public authenticatedHttpRequest method in Auth module

### Changed

- Made Auth module public

## [2.0.1] - 2023-01-25

### Changed

- Boilerplate no longer assumes that "staging" / "prod" will be included in the
  `SERVICE_NAME`

## [2.0.0] - 2023-01-17

### Added

- Added support for integration introspection handlers
- Added support for OpenTelemetry metrics management via boilerplate
- BREAKING: Added new required config variable `SERVICE_NAME`

### Changed

- BREAKING: Server uses `process.cwd()` to determine the current working directory
  instead of `require.main!.path`

## [1.1.4] - 2023-01-16

### Changed

- Changed package `jsonwebtoken` from version 8.5.1 to 9.0.0

## [1.1.3] - 2022-11-29

### Changed

- SaaSquatch token middleware exits early if the request `tenantAlias` is already present
- integration-boilerplate-node logger now uses `@saasquatch/logger` package

### Added

- `getUserGraphQL` function for getting a user-scoped GraphQL client using a user JWT

## [1.1.2] - 2022-06-20

### Changed

- `/form` and `/webhook` routes are only set if handlers are provided
- Update form handler types to include new `globalConfig`

## [1.1.1] - 2022-05-09

### Changed

- GraphQL error responses are included in thrown error

## [1.1.0] - 2022-01-27

### Added

- `getIntegrationTenants` service method to return a list of all tenant aliases
  that have the integration enabled.
- A router for custom endpoints is always created, and is accessible as `service.router`,
  however the `customRouter` option still works for backwards compatibility.

## [1.0.0] - 2021-08-13

### Added

- Initial release

[unreleased]: https://github.com/sasquatch/integration-boilerplate-node/compare/v2.1.1...HEAD
[2.1.1]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.1.1
[2.1.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.1.0
[2.0.1]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.0.1
[2.0.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.0.0
[1.1.4]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.4
[1.1.3]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.3
[1.1.2]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.2
[1.1.1]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.1
[1.1.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.0
[1.0.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.0.0
