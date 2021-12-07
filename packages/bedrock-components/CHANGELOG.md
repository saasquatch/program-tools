# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.2] - 2021-12-07

### Added

- \<sqb-conditional-section> can now use the user's email in JSONata conditions

## [1.2.1] - 2021-11-22

### Fixed

- Version of component-boilerplate updated to prevent rare race condition with graphQL queries

## [1.2.0] - 2021-11-05

### Added

- \<sqb-program-switch> - Loads different content based on the programId from useProgramId

### Changed

- \<sqb-widget> Added functionality to track widget loads, off by default and enabled by the prop `track-loads`

## [1.1.1] - 2021-09-20

### Fixed

- Prevent conditional container from querying for a user before a JWT is set
- Update component-boilerplate version to fix infinite loop bug

## [1.1.0] - 2021-07-21

### Added

- Component for loading existing program or global widgets
  - \<sqb-widget>

## [1.0.1] - 2021-04-22

### Changed

- Updated package dependencies

## [1.0.0] - 2021-04-19

### Added

- Initial release, components use stencil 2+. These are style-less and used for functional purposes only.
- Available components:
  - \<sqb-conditional-section>
  - \<sqb-program-section>

[unreleased]: https://github.com/saasquatch/program-tools/compare/bedrock-components%401.2.2...HEAD
[1.2.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.2.2
[1.2.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.2.1
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.1.1
[1.1.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.1.0
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.0.0
