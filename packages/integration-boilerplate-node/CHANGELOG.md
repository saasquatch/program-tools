# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2022-01-27

### Added

- `getIntegrationTenants` service method to return a list of all tenant aliases
  that have the integration enabled.
- A router for custom endpoints is always created, and is accessible as `service.router`,
  however the `customRouter` option still works for backwards compatibility.

## [1.0.0] - 2021-08-13

### Added

- Initial release

[unreleased]: https://github.com/sasquatch/integration-boilerplate-node/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.1.0
[1.0.0]: https://github.com/sasquatch/integration-boilerplate-node/releases/tag/v1.0.0
