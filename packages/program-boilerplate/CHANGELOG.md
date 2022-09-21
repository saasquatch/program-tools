# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.6.0] - 2022-09-21

### Added

- Added getUserCustomFieldsFromJsonata util to return custom fields being used by programs
- Added meetEdgeTriggerConditions util to check edge conditions of AFTER_USER_CREATED_OR_UPDATED trigger

## [3.5.11] - 2021-12-1

- Set default payload size limit to 1mb
- Added MAX_PAYLOAD_SIZE env var to allow easier configuration
- Fixes payload too large error that can occur during introspection

## [3.5.9] - 2021-10-20

### Added

- Added CHANGELOG.md
- Added referrer/referred emails to the email context query so they can be used in email templates

### Changed

### Removed

[unreleased]: https://github.com/saasquatch/program-tools/compare/%40saasquatch/program-boilerplate%403.6.0...HEAD
[3.6.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/program-boilerplate%403.6.0
[3.5.11]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/program-boilerplate%403.5.11
[3.5.9]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/program-boilerplate%403.5.9
