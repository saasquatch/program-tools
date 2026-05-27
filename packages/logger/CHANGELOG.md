# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-05-27

### BREAKING CHANGES

- Update minimum supported NodeJS version to 24.

## [2.0.1] - 2025-11-26

### Added

- Automatically strip sensitive url search params from log messages.
- Add ability to pass extra data to HTTP log messages using `res.locals.extraData`.

## [2.0.0] - 2025-10-28

### BREAKING CHANGES

- Removed `logger.log` function.
- Update minimum supported NodeJS version to 20.

### Changed

- Removed restriction on peer dependency version of Winston now that upstream bug is
  fixed.

## [1.0.1] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.0.0] - 2022-11-29

### Added

- Initial release.

[unreleased]: https://github.com/saasquatch/program-tools/compare/master...%40saasquatch/logger%403.0.0
[3.0.0]: https://github.com/saasquatch/program-tools/tree/%40saasquatch/logger%403.0.0
[2.0.1]: https://github.com/saasquatch/program-tools/tree/%40saasquatch/logger%402.0.1
[2.0.0]: https://github.com/saasquatch/program-tools/tree/%40saasquatch/logger%402.0.0
[1.0.1]: https://github.com/saasquatch/program-tools/tree/%40saasquatch/logger%401.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/tree/%40saasquatch/logger%401.0.0
