# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2024-05-30

### Changed

- `dom-context` package bump

## [1.0.6] - 2024-05-07

### Fixed

- Fixed an issue where the locale format `xx_XX` was valid but not `xx`

## [1.0.5] - 2024-02-14

### Fixed

- Fixed an issue where the locale wouldn't be set if the browser locale matched the user's locale

## [1.0.4] - 2023-05-18

### Changed

- Fix to iOS environment being incorrectly set to "None"

## [1.0.3] - 2023-05-16

### Changed

- Added support for Instant Access widgets:
  - Updated UserIdentityContext to support lack of user information in widgetIdent
  - Updated SquatchJS2 environment logic to support lack of user information in widgetIdent

## [1.0.2] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.0.1] - 2022-09-13

### Changed

- Validate the browser's navigator.language is a simple locale with no extension to be compatible
  with the backend

## [1.0.0] - 2022-07-21

Initial version.

[unreleased]: https://github.com/saasquatch/program-tools/compare/%40saasquatch%2Fcomponent-environment%401.0.7...HEAD
[1.0.7]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.7
[1.0.6]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.6
[1.0.5]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.5
[1.0.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.4
[1.0.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.3
[1.0.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.2
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fcomponent-environment%401.0.0
