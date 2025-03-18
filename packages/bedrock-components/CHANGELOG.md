# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.10] - 2025-03-18

### Updated

- `@saasquatch/component-boilerplate` package bump

## [1.4.8] - 2024-07-04

### Updated

- `@saasquatch/component-boilerplate` package bump

## [1.4.7] - 2024-07-04

### Updated

- `@saasquatch/component-boilerplate` package bump

## [1.4.6] - 2024-07-03

### Updated

- `@raisins/stencil-docs-target` package bump

## [1.4.5] - 2024-05-30

### Updated

- `@saasquatch/component-boilerplate` package bump
- `dom-context` package bump
- `dom-context-hooks` package bump

## [1.4.4] - 2023-05-07

### Updated

- `@saasquatch/component-boilerplate` package bump

## [1.4.3] - 2023-04-02

### Updated

- `@saasquatch/component-boilerplate` package bump

## [1.4.2] - 2024-02-14

### Updated

- \<sqb-program-section> - Sends a program load event when rendered for the first time
- `@saasquatch/component-boilerplate` package bump
- `@saasquatch/dom-context-hooks` package bump

## [1.4.1] - 2023-02-06

### Updated

- `@saasquatch/component-boilerplate` package bump

## [1.4.0] - 2023-01-08

### Changed

- `@saasquatch/component-boilerplate` package bump

## [1.3.10] - 2024-01-03

### Changed

- Removed JSDoc example of component

## [1.3.9] - 2023-05-18

### Changed

- `@saasquatch/component-boilerplate` package bump

## [1.3.8] - 2023-05-16

### Added

- \<sqb-auth-template-switch> - Automatically switch between "logged-in" and "logged-out" templates based on whether a valid User Identity has been set.

## [1.3.7] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.3.6] - 2022-07-25

### Added

- \<sqb-redirect> - Automatically redirects the user to a given path when rendered

## [1.3.5] - 2022-07-21

### Changed

- \<sqb-program-section> updated to stop using flawed DOM context state hook in favour of directly creating a DOM context provider
- Added [jsDocs](https://jsdoc.app/) to the following components to improve the editability experience in our new Raisins widget editor.
- Changed components:
  - \<sqb-conditional-section>
  - \<sqb-program-switch>

## [1.3.4] - 2022-06-08

### Changed

- Added [jsDocs](https://jsdoc.app/) to the following components to improve the editability experience in our new Raisins widget editor.
- Changed components:
  - \<sqb-conditional-section>
  - \<sqb-program-section>

## [1.3.2] - 2022-06-01

### Changed

- Changed components:
  - \<sqb-conditional-section>
    - A users country code is now accessible in the JSONata context

## [1.3.1] - 2022-02-23

### Changed

- Changed components:
  - \<sqb-widget>
    - Now supports translations, returning the localized widget
  - \<sqb-program-section>
    - Now supports `program-id=""` as a null programId instead of empty string

## [1.3.0] - 2021-12-07

### Changed

- Updated version of component-boilerplate to prevent rare case of user context being deleted during register
- Changed components:
  - \<sqb-conditional-section>
    - Added the ability to use the user's email in JSONata conditions

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

[unreleased]: https://github.com/saasquatch/program-tools/compare/bedrock-components%401.4.10...HEAD
[1.4.10]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.10
[1.4.8]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.8
[1.4.7]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.7
[1.4.6]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.6
[1.4.5]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.5
[1.4.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.4
[1.4.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.3
[1.4.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.2
[1.4.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.1
[1.4.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.4.0
[1.3.10]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.10
[1.3.9]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.9
[1.3.8]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.8
[1.3.7]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.7
[1.3.6]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.6
[1.3.5]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.5
[1.3.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.4
[1.3.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.2
[1.3.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.1
[1.3.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.3.0
[1.2.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.2.1
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.1.1
[1.1.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.1.0
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.0.1
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fbedrock-components%401.0.0
