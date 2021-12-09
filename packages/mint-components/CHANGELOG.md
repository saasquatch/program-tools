# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2021-12-08

### Changed

- Changed components:
  - \<sqm-big-stat>
    - Added program ID prop to optionally be used instead of the default program context

## [1.3.0] - 2021-11-08

### Changed

- Changed components:
  - \<sqm-share-button>
    - Exported "icon" part so it can be customizable in the future
  - \<sqm-portal-change-password>
    - Changed sl-button in modal to be of type "primary" instead of "default"
    - Swapped location of cancel and change password buttons
    - Added padding between fields
    - Changed hardcoded text into customizable props
    - Changed password field input default label to "New Password"
  - \<sqm-portal-profile>
    - Changed hardcoded text into customizable props
    - Added padding text below header
  - \<sqm-portal-reset-password>
    - Changed hardcoded text into customizable props
    - Changed password field input default label to "New Password"
  - \<sqm-portal-register>
    - Changed hardcoded text into customizable props
    - Changed formData slot to add custom inputs to the top of form instead of the bottom
    - Fixed bug causing the correct error validation message from being shown
  - \<sqm-portal-email-verification>
    - Changed hardcoded text into customizable props
  - \<sqm-portal-verify-email>
    - Fixed bug causing users to get stuck if no userIdent existed when verifying their email

### Added

- Default affiliate portal templates now provided in [Stencilbook](https://mint-components.stencilbook.saasquat.ch)
  - Default Portal
  - Multi Program Portal
  - Lead Submit Portal
  - Portal Dashboard (program widget)
- New components added for default affiliate portals
  - \<sqm-portal-footer> Footer for providing FAQ, T&S, and support email
  - \<sqm-hero> One or two column landing page with an optional background
  - \<sqm-name-fields> First and last name inputs for registration which supports validation errors
  - \<sqm-referral-iframe> Renders an iFrame and passes users referral code as a UTM param named rsCode

## [1.2.1] - 2021-09-21

### Fixed

- demoData no longer breaking GrapesJS editability on all components
- \<sqm-big-stat> properly supports units with/without slashes
- \<sqm-big-stat> rewardBalance stat now uses format if included for the fallback value
- \<sqm-referral-table> dateScheduledFor bug fixed, deleted user bug fixed

### Added

- Filtered Credit and Integration reward count stats now available in \<sqm-big-stat>
  - formats:
  ```
  /(rewardsCountFiltered)/:statType([INTEGRATION|PCT_DISCOUNT|CREDIT]*)?/:unit((?!global)(?!PENDING)(?!CANCELLED)(?!EXPIRED)(?!REDEEMED)(?!AVAILABLE)[a-zA-Z0-9%]+)?/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?
  /(integrationRewardsCountFiltered)/:status([PENDING|CANCELLED|EXPIRED|REDEEMED|AVAILABLE]*)?/:global?
  ```
- \<sqm-share-button> loading states and hide text prop
- \<sqm-divided-layout> border customizable
- \<sqm-leaderboard> allows rank to be shown

### Removed

- menuLabel prop removed from \<sqm-program-menu>

## [1.2.0] - 2021-09-17

### Changed

- Changed components:
  - \<sqm-referral-table> can pull only classic referrals
  - \<sqm-referral-table> supports showing "Referred You" row
  - \<sqm-referral-table> supports additional props to override text values
  - \<sqm-referral-table> has default loading and empty slots
  - \<sqm-referral-table> pagination button labels are customizable
  - \<sqm-share-button> text slot (default slot) is hideable
  - \<sqm-big-stat> will return appropriate stats or error for "classic" program id. Height is inherited

## [1.1.1] - 2021-08-20

### Added

- Password field component with live validation
- Newly available component:
  - \<sqm-password-field>

## [1.1.0] - 2021-08-04

### Added

- New portal components and additional layout components
- Newly available components:
  - \<sqm-asset-card>
  - \<sqm-divided-layout>
  - \<sqm-form-message>
  - \<sqm-graphql-client-provider>
  - \<sqm-navigation-sidebar>
  - \<sqm-navigation-sidebar-item>
  - \<sqm-portal-change-password>
  - \<sqm-portal-container>
  - \<sqm-portal-email-verification>
  - \<sqm-portal-forgot-password>
  - \<sqm-portal-login>
  - \<sqm-portal-logout>
  - \<sqm-portal-profile>
  - \<sqm-portal-protected-route>
  - \<sqm-portal-register>
  - \<sqm-portal-reset-password>
  - \<sqm-portal-verify-email>
  - \<sqm-program-menu>
  - \<sqm-referral-table>
    - \<sqm-table-cell>
    - \<sqm-table-row>
    - \<sqm-referral-table-cell>
    - \<sqm-referral-table-date-cell>
    - \<sqm-referral-table-rewards-cell>
    - \<sqm-referral-table-status-cell>
    - \<sqm-referral-table-user-cell>
    - \<sqm-referral-table-column>
    - \<sqm-referral-table-date-column>
    - \<sqm-referral-table-rewards-column>
    - \<sqm-referral-table-status-column>
    - \<sqm-referral-table-user-column>
  - \<sqm-share-code>
  - \<sqm-stat-container>
  - \<sqm-text>
  - \<sqm-text-span>
  - \<sqm-titled-section>
  - \<sqm-user-name>

## [1.0.0-86] - 2021-05-20

### Added

- Initial release, components use stencil 2+, Sass mixins, and shoelace web components - https://shoelace.style
- Available components:
  - \<sqm-big-stat>
  - \<sqm-edit-profile>
  - \<sqm-leaderboard>
  - \<sqm-leaderboard-rank>
  - \<sqm-navigation-menu>
  - \<sqm-portal-frame>
  - \<sqm-route>
  - \<sqm-router>
  - \<sqm-share-button>
  - \<sqm-share-link>
  - \<sqm-form-message>
  - \<sqm-hook-story-container>
  - \<sqm-popup-container>
  - \<sqm-stencilbook>

[unreleased]: https://github.com/saasquatch/program-tools/compare/mint-components@1.3.1...HEAD
[1.3.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.3.1
[1.3.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.3.0
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.1.1
