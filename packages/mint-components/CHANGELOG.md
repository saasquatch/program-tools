# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.5.0] - 2022-01-10

### Added

- Added Components:

  - \<sqm-brand>
    - Takes in a brand colour, creates a colour palette from it and sets --sl-primary colour's accordingly to child components
    - Takes in a brand font and applies it to child components
  - \<sqm-card-feed>
    - Applies a masonry style grid to child components (created for sqm-task-card)
    - Child width and gap between children is configurable
  - \<sqm-program-explainer>
    - Designed to wrap \<sqm-program-explainer-step>
    - Adds header and footer sections
    - Text (titles and descriptions) and colours (background and text) are configurable
  - \<sqm-program-explainer-step>
    - Card to explain part of a customers program
    - Icon, background colour, text colour, title and description text are configurable
  - \<sqm-reward-exchange-list>
    - Allows users to exchange rewards configured by Tenant level reward exchange rules
    - Includes props for complete text editability
    - Has a 4 step process, select exchange rule, select reward, confirm exchange, exchanged
  - \<sqm-rewards-table>
    - Displays a table of users rewards with help from column and cell components
    - Program Id prop specifies from which programs to show rewards for, defaults to program context but shows rewards globally if no program is provided through prop or context
    - Column titles are shown by default but can be hidden via prop
    - 3 rewards are shown per page by default but is customizable via prop
    - Mobile responsive functionality
    - Includes props for mobile and table breakpoints, which trigger mobile friendly views
    - Includes prop to hide column titles in mobile view
    - \<sqm-rewards-table-date-column>
      - Displays reward dates in a column using the \<sqm-rewards-table-date-cell>
      - Includes prop to configure what date to show (date given, expires, cancelled, redeemed, scheduled for)
      - Includes prop to configure column title text
    - \<sqm-rewards-table-date-cell>
      - Displays reward date
    - \<sqm-rewards-table-reward-column>
      - Displays rewards in a column using the \<sqm-rewards-table-rewards-cell>
      - Includes prop to configure column title and other text
    - \<sqm-rewards-table-rewards-cell>
      - Displays the amount and type of a reward
      - Displays how much of the reward is available/redeemed
    - \<sqm-rewards-table-source-column>
      - Displays reward sources in a column using the \<sqm-rewards-table-source-cell>
      - Includes props to configure text elements used in the source cell
      - Includes prop to configure column title
    - \<sqm-rewards-table-source-cell>
      - Displays the source of a reward (Program/Automated, Manual, Referral, Reward Exchange)
    - \<sqm-rewards-status-column>
      - Displays reward statuses in a column using the \<sqm-rewards-table-status-cell>
      - Includes props to configure reward status text
      - Includes prop to configure column title
    - \<sqm-rewards-table-status-cell>
      - Displays the status of a reward along with status information (expiry or pending date, etc)
  - \<sqm-task-card>
    - Displays Tasks which correspond to program goals for users to complete
    - Users progress comes from custom field or program goal, configured by prop
    - Includes prop to disable cards outside of an activities duration, default is no duration (always available)
    - Includes props for text configuration like card title, description, CTA button text
    - Includes CTA button to redirect users to where they need to complete the task (new tab or existing tab), route is configurable via prop
    - Progress bar is hidden or shown by prop, hidden by default
    - Includes text showing how many times a user has completed a task if repeatable, text is configurable

### Changed

- Changed Components:
  - \<sqm-big-stat>
    - Added hook functionality to query customfields
    - Hooks now returns value (number) and statValue (string)
    - Added loading state into the hook
  - \<sqm-leaderboard> CHANGES IN PROGRESS - UPDATE ME
  - \<sqm-portal-container>
    - Added max width prop, defaults to 100%
  - \<sqm-referral-table>
    - Added empty state text prop
    - Added mobile responsive functionality
    - Added props for mobile and table breakpoints, which trigger mobile friendly views
    - Added prop to hide column titles in mobile view
  - \<sqm-share-button>
    - Added prop to override button colour
    - Added prop to override button text colour
    - Added prop to override border radius
    - Added default button colours for all share mediums --TO DO--
  - \<sqm-share-code>
    - Sends a "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT" analytic with "DIRECT" share medium event on copy code click
  - \<sqm-share-link>
    - Sends a "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT" analytic with "DIRECT" share medium event on copy link click

## [1.4.2] - 2022-01-14

### Changed

- Added ability to include slotted content on \<sqm-portal-register> using `slot="terms"`
  - Slotted content is displayed above the registration button

## [1.4.1] - 2021-01-17

### Fixed

- Fixed broken WhatsApp icon by updating the version of bootstrap icons from 1.2.0 to 1.7.2

## [1.4.0] - 2021-12-09

### Changed

- Updated version of component-boilerplate to prevent rare case of user context being deleted during register
- Updated version of component-boilerplate to support new registration, password reset, and verify requests
- Changed components:
  - \<sqm-portal-email-verification>
    - Added prop to customize what page a user is redirected to from their verify email, defaults to /verifyEmail
  - \<sqm-portal-forgot-password>
    - Added prop to customize what page a user is redirected to from their password reset email, defaults to /resetPassword
    - Added prop to customize the login button redirection path, defaults to /login
  - \<sqm-portal-login>
    - Added prop to customize the register button redirection path, defaults to /register
    - Added prop to customize the forgot password text link redirection path, defaults to /forgotPassword
  - \<sqm-portal-register>
    - Added prop to customize the login button redirection path, defaults to /login
    - Added prop to customize what page a user is redirect to from their initial verify email, defaults to /verifyEmail
  - \<sqm-portal-reset-password>
    - Added prop to customize what path users are redirected to when oobcode validation fails, defaults to /
  - \<sqm-portal-verify-email>
    - Added prop to customize what path users are redirected to when oobcode validation fails, defaults to /
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

[unreleased]: https://github.com/saasquatch/program-tools/compare/mint-components@1.4.0...HEAD
[1.5.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.0
[unreleased]: https://github.com/saasquatch/program-tools/compare/mint-components@1.4.2...HEAD
[1.4.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.4.2
[1.4.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.4.1
[1.4.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.4.0
[1.3.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.3.0
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.1.1
