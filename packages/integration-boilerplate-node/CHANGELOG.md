# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/sasquatch/integration-boilerplate-node/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.1.0
[2.0.1]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.0.1
[2.0.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v2.0.0
[1.1.4]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.4
[1.1.3]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.3
[1.1.2]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.2
[1.1.1]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.1
[1.1.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.0
[1.0.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.0.0
