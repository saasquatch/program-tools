# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.2] - 2023-04-20

### Changed
- Updated license information

## [2.4.1] - 2022-09-23

### Changed

- Updated CHANGELOG

## [2.4.0] - 2022-09-23

### Added

- Added a test step to set the program rules to arbitrary JSON

## [2.3.0] - 2022-09-21

### Added

- Added test support for edge condition triggers

### Changed

- Removed peer dependencies

## [2.1.2] - (2022-08-25)

### Added

- Added messages for all `assert` function calls to improve the debugging experience
  for failing tests
- Added README and CHANGELOG

### Changed

- Allow the `SCHEDULED` and `REWARD_SCHEDULED` triggers to be used with the program
  trigger step definition

### Fixed

- Fixed the `rules` and `template` variables of `World` being mutated across resets
- Fixed the time machine step incorrectly passing the time as a string to the program
  instead of as a number
- Fixed the segment-add step incorrectly including quotes in the added segments (`A"`
  instead of `A`)

[2.4.2]: https://github.com/saasquatch/picklesdoc/releases/tag/v2.4.2
[2.4.1]: https://github.com/saasquatch/picklesdoc/releases/tag/v2.4.1
[2.4.0]: https://github.com/saasquatch/picklesdoc/releases/tag/v2.4.0
[2.3.0]: https://github.com/saasquatch/picklesdoc/releases/tag/v2.3.0
[2.1.2]: https://github.com/saasquatch/picklesdoc/releases/tag/v2.1.2
