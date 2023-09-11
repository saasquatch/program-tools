# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.16] - 2023-09-11

### Changed

- Change powered by link

## [1.6.15] - 2023-08-24

### Updated

- Changed components:
  - \<sqm-task-card>
    - added new `hideButton` prop
      - Hides the CTA button on the task card

## [1.6.14] - 2023-08-23

### Updated

- Added new stat type
- Changed components:
  - \<sqm-big-stat>
    - added new `/traffic` stat
      - Uses the "traffic" stat on the user object
    - added new `/rewardsRedeemedWeek` stat
      - Gives a sum of rewards that have been fully redeemed by the user this week
    - added new `/rewardsRedeemedWeek` stat
      - Gives a sum of rewards that have been fully redeemed by the user this month
    - added new `/rewardsPending` stat
      - Gives a sum of the user's rewards that are currently pending

## [1.6.13] - 2023-08-02

### Fixed

- `@saasquatch/shoelace` update merged into master and published

## [1.6.12] - 2023-07-27

### Fixed

- \<sqm-big-stat>
  - `/referralsWeek` properly queries `this_week` instead of `this_month`

## [1.6.11] - 2023-06-14

### Changed

- Swap `@shoelace-style/shoelace` for `@saasquatch/shoelace` to fix tooltip and dropdown issues

## [1.6.10] - 2023-05-18

### Changed

- `@saasquatch/component-boilerplate` package bump

## [1.6.9] - 2023-05-16

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.
- Updated all component’s uiName to snake case
- Changed components:
  - \<sqm-hero>
    - Updated background and secondary background’s uiWidget to background which supports color, Shoelace variables, and image uploads through Cloudinary
    - Added prop to set minimum container height
  - \<sqm-referral-card>
    - Added prop to remove the card’s border
    - Added prop to limit the container width
    - Added padding props
    - Updated referral card to autohide containers
  - \<sqm-share-link>, \<sqm-share-code>
    - Updated to use \<copy-text-view>
    - Added prop for copy button style and label
    - Added prop for text alignment

### Added

- Added Components:
  - \<sqm-coupon-code> displays a coupon code with copy functionality
    - Includes props to edit the error messages, copy button style and label, and text alignment
  - \<sqm-logout-current-user> displays the current logged in user’s email and provides a switch user link
  - \<sqm-instant-access-registration> adds the ability to register with just an email and no password
    - Includes a top and bottom slot
    - Includes props to edit background color, show and hide border, adjust padding, include name fields, edit field labels, and edit registration error messages
  - \<sqm-referred-registration>
    - Same as \<sqm-instant-access-registration> but for the friend experience
  - \<sqm-close-button> displays the close button on Popup Widgets
    - Includes prop to change the icon color
    - Styled to be in the top right of the first `position: relative;` parent container

## [1.6.8] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.6.7] - 2023-03-30

### Changed

- Changed components:
  - \<sqm-hero-image>
    - Fix a bug that would sometimes cause the image to expand vertically forever when in an iframe.

## [1.6.6] - 2023-01-17

### Changed

- Changed components:
  - \<sqm-reward-exchange-list>
    - Added reward exchange component example to the rewards group
    - Bug fixed to restrict the size of the reward exchange option drop down

## [1.6.5] - 2022-11-29

### Changed

- Changed components:
  - \<sqm-referral-table>
    - additional data queried for use with `@saasquatch/paypal-components`
    - `h` function passed to renderCell functions to support rendering between two packages
  - \<sqm-rewards-table>
    - additional data queried for use with `@saasquatch/paypal-components`
    - `h` function passed to renderCell functions to support rendering between two packages

## [1.6.4] - 2022-10-05

### Changed

- Changed components:
  - \<sqm-divided-layout>
    - Added `box-sizing: border-box` and `overflow-x: clip` to the root container element to remove horizontal scrollbar on mobile devices
  - \<sqm-edit-profile>
    - Added missing `)` to the end of CSS variable
  - \<sqm-empty>
    - Changed padding from `xxxx-large` to `large`
    - Fixed the name of the exported class to accurately reflect the name of the component
  - \<sqm-navigation-sidebar>
    - Updated view to display a hamburger menu when the screen size is 799px or less
    - Added `useNavigationSidebar` hook to automatically close the menu in mobile when navigating between routes
  - \<sqm-portal-container>
    - Added `box-sizing: border-box;` to container
  - \<sqm-portal-profile>
    - Replaced `<sqm-portal-container>` used in the view in order to change the flex direction of the name inputs when in mobile view.
    - Added missing margin bottom to the success alert
  - \<sqm-stat-container>
    - Added media query to hide the stats right border when the screen size is 430px or less.
  - \<sqm-hero>
    - Adding two column layout example for usage in the microsite/widget editor

## [1.6.3] - 2022-10-04

### Changed

- Added a countdown timer to \<sqm-portal-email-validation> that automatically checks if a user's email has been verified on another screen or device
  - User will be redirected to the \<sqm-portal-verify-email> success screen by default
- The Resend Email button in \<sqm-portal-email-validation> is now a text link
- Verified users that navigate to a path containing \<sqm-portal-verify-email> will now be properly redirected to the portal instead of seeing a failure screen
- Changed Components
  - \<sqm-portal-email-validation>
  - \<sqm-portal-verify-email>

## [1.6.2] - 2022-07-21

### Added

- Added Components:
  - \<sqm-portal-registration-form> component added to handle registration form submissions
  - Has all features of existing \<sqm-portal-register> but uses registration forms instead
    - Features include:
      - Pre-fill
      - Form Protection
      - Domain Blocking
  - \<sqm-header-logo> displays a logo and redirects participants when they click on it
    - Designed to be used in Microsite headers

### Changed

- replaced useValidationState with useRegistrationFormState for `<sqm-portal-registration-form>` and `<sqm-portal-register>`
- useRegistrationFormState allows passing loading, disabled, and initialData states in addition to validationErrors and network errors
- implemented useRegistrationFormState in the registration form slotted components to improve form loading and validation
  - `<sqm-password-field>`
  - `<sqm-name-fields>`
  - `<sqm-input-field>`
  - `<sqm-dropdown-field>`
  - `<sqm-checkbox-field>`
- Fixed missing null check on \<sqm-brand>
- Fixed `program-id` prop overwrite on \<sqm-share-code>
- Updated `--sqm-max-width` to be `100%`, this affects the \<sqm-hero> and the component will now be full width on larger screens
- Added [jsDocs](https://jsdoc.app/) to the following components to improve the editability experience in our new Raisins widget editor.
- Changed components:
  - \<sqm-checkbox-field>
  - \<sqm-divided-layout>
  - \<sqm-dropdown-field>
  - \<sqm-edit-profile>
  - \<sqm-form-message>
  - \<sqm-header-logo>
  - \<sqm-hero>
  - \<sqm-input-field>
  - \<sqm-name-fields>
  - \<sqm-navigation-sidebar-item>
  - \<sqm-navigation-sidebar>
  - \<sqm-password-field>
  - \<sqm-portal-change-password>
  - \<sqm-portal-email-verification>
  - \<sqm-portal-forgot-password>
  - \<sqm-portal-frame>
  - \<sqm-portal-login>
  - \<sqm-portal-logout>
  - \<sqm-portal-profile>
  - \<sqm-portal-protected-route>
  - \<sqm-portal-register>
  - \<sqm-portal-registration-form>
  - \<sqm-portal-reset-password>
  - \<sqm-portal-verify-email>
  - \<sqm-program-menu>
  - \<sqm-route>
  - \<sqm-share-code>
  - \<sqm-user-name>

### Breaking Changes

- `showCountry` prop with `true` default replaced with `hideCountry` prop with `false` default for `<sqm-portal-profile>`
- `enableValidation` prop with `true` default replaced with `disableValidation` prop with `false` default for `<sqm-password-field>`
- `showPoweredBy` prop with `true` default replaced with `hidePoweredBy` prop with `false` default for `<sqm-portal-footer>`
- `enablePasswordValidation` prop with `true` default replaced with `disablePasswordValidation` prop with `false` default for `<sqm-portal-register>`
- `enablePasswordValidation` prop with `true` default replaced with `disablePasswordValidation` prop with `false` default for `<sqm-portal-registration-form>`

## [1.6.1] - 2022-06-09

### Changed

- Removed brand color application to `<a>` tags
- Update templates to portal templates to remove `<sqm-graphql-provider>`
- Update Referral, Loyalty and Mono widget templates for SSW launch
- Added [jsDocs](https://jsdoc.app/) to the following components to improve the editability experience in our new Raisins widget editor.
- Changed components:
  - \<sqm-big-stat>
  - \<sqm-brand>
  - \<sqm-card-feed>
  - \<sqm-divided-layout>
  - \<sqm-empty>
  - \<sqm-hero>
  - \<sqm-hero-image>
  - \<sqm-image>
  - \<sqm-leaderboard>
  - \<sqm-leaderboard-rank>
  - \<sqm-popup-container>
  - \<sqm-portal-container>
  - \<sqm-portal-footer>
  - \<sqm-program-explainer>
  - \<sqm-program-explainer-step>
  - \<sqm-referral-card>
  - \<sqm-referral-table>
  - \<sqm-referral-table-date-column>
  - \<sqm-referral-table-rewards-column>
  - \<sqm-referral-table-status-column>
  - \<sqm-referral-table-user-column>
  - \<sqm-reward-exchange-list>
  - \<sqm-rewards-table>
  - \<sqm-rewards-table-date-column>
  - \<sqm-rewards-table-note-column>
  - \<sqm-rewards-table-source-column>
  - \<sqm-rewards-table-status-column>
  - \<sqm-route>
  - \<sqm-router>
  - \<sqm-scroll>
  - \<sqm-share-button>
  - \<sqm-share-code>
  - \<sqm-share-link>
  - \<sqm-stat-container>
  - \<sqm-tab>
  - \<sqm-table-cell>
  - \<sqm-table-row>
  - \<sqm-tabs>
  - \<sqm-task-card>
  - \<sqm-text>
  - \<sqm-timeline>
  - \<sqm-timeline-entry>
  - \<sqm-titled-section>
  - \<sqm-user-name>

## Breaking Changes

- `showLabels` props with `true` default replaced with `hideLabels` prop with `false` default for `<sqm-referral-table>` and `<sqm-rewards-table>`

## [1.6.0] - 2022-05-09

### Changed

- Update portal components to use managed identity v2 error responses
- \<sqm-portal-forgot-password>
  - clear success message on re-send
- \<sqm-portal-email-verification>
  - clear success message on re-send
- \<sqm-portal-reset-password>
  - handle network failure of reset password mutation

## [1.5.5] - 2022-04-21

- Fixed grapesJs from build by removing window.location.origin from stencil build file
  - Grapes was broken in the previous build

## [1.5.4] - 2022-04-13

### Changed

- Changed Component:
  - /<sqm-leaderboard>
    - Now supports a top point earners leaderboard, `topPointEarners`
    - Added a `programId` prop to overwride program context
      - If an empty string is passed, then a global leaderboard is displayed
    - Max number of leaderboard rows displayed is now configurable via prop but defaults to 10
  - /<sqm-leaderboard-rank>
    - Now supports rank from top point earners leaderboard
    - Added a `programId` prop to overwride program context
      - If an empty string is passed, then a global leaderboard rank is displayed
  - /<sqm-reward-exchange-list>
    - Updated `not-available-error` default value to fix issue with error message fallback in ICU message

## [1.5.3] - 2022-03-31

### Added

- Input component added for use in \<sqm-portal-register>
- Added Component:
  - \<sqm-input-field>
    - Required by default but can be optional with the `field-optional` prop
    - Field label and error message are configurable by prop
    - Best used in `formData` slot inside \<sqm-portal-register>
    - Form field name can be customized with the `field-name` prop
      - `field-name` must be a unique string and is submitted as the key to the value submitted
        - For example, with `field-name` set to `businessName` the result is `{"businessName":"SaaSquatch"}`
      - An error is displayed if `field-name` prop is not included
    - Input type can be customized with the `field-type` prop
      - Supports `text`, `tel`, and `date` as types

### Changed

- Changed Components:
  - \<sqm-dropdown-field>
    - An error is now displayed if `dropdown-name` prop is not included
    - `dropdown-required` prop deprecated, must use `dropdown-optional` instead
      - Field is still required by default
  - \<sqm-checkbox-field>
    - Error is now displayed if `checkbox-name` prop is not included
    - `checkbox-required` prop deprecated, must use `checkbox-optional` instead
      - Field is still required by default
  - \<sqm-referral-iframe>
    - Updated fail fast state text

## [1.5.2] - 2022-03-08

### Changed

- Changed Components:
  - \<sqm-portal-login>
    - Enforce that nextPage redirects are relative
  - \<sqm-portal-reset-password>
    - Enforce that nextPage redirects are relative
  - \<sqm-portal-verify-email>
    - Enforce that nextPage redirects are relative

## [1.5.1] - 2022-03-03

### Added

- Checkbox and dropdown components added for use in \<sqm-portal-register>

- Added Components:

  - \<sqm-checkbox-field>
    - Required by default but can be optional
    - Allows for a link in checkbox text to support behaviour like linking out to terms and conditions
    - All text is configurable by prop
    - Best used in the register components `terms` or `formData` slots
    - Form field name can be customized with the `checkbox-name` prop
  - \<sqm-dropdown-field>
    - Required by default but can be optional
    - Dropdown options are \<sl-menu-items>
    - All text is configurable by prop
    - Best used in the register components `formData` slot
    - Form field name can be customized with the `dropdown-name` prop

## [1.5.0] - 2022-02-23

### Added

- Added Components:

  - \<sqm-brand>
    - Takes in a brand colour via prop and creates a colour palette from it.
    - Sets shoelace colour variables from brand palette for child components
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
    - Image can be used instead of an icon, image url is configurable by prop
  - \<sqm-reward-exchange-list>
    - Allows users to exchange rewards configured by Tenant level reward exchange rules
    - Includes props for complete text editability
    - Has a 4 step process, select exchange rule, select reward, confirm exchange, exchanged
  - \<sqm-rewards-table>
    - Displays a table of users rewards with help from column and cell components
    - Program Id prop specifies from which programs to show rewards for, defaults to program context but shows rewards globally if no program is provided through prop or context
    - Column titles are shown by default but can be hidden via prop
    - 4 rewards are shown per page by default but is customizable via prop
    - Mobile responsive functionality
    - Includes props for mobile and table breakpoints, which trigger mobile friendly views
    - Includes prop to hide column titles in mobile view
    - \<sqm-rewards-table-date-column>
      - Displays reward dates in a column using the \<sqm-rewards-table-date-cell>
      - Includes prop to configure what date to show (date given, expires, canceled, redeemed, scheduled for)
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
    - \<sqm-rewards-table-status-column>
      - Displays reward statuses in a column using the \<sqm-rewards-table-status-cell>
      - Includes props to configure reward status text
      - Includes prop to configure column title
      - Displays associated status dates (date expires, date pending, etc)
    - \<sqm-rewards-table-status-cell>
      - Displays the status of a reward along with status information (expiry or pending date, etc)
    - \<sqm-rewards-table-customer-note-column>
      - Includes prop to configure column title
      - Displays a rewards customer note using the \<sqm-rewards-table-customer-note-cell>
    - \<sqm-rewards-table-customer-note-cell>
      - Displays a rewards customer note
  - \<sqm-task-card>
    - Displays Tasks which correspond to program goals for users to complete
    - Tasks can be one time, repeatable, or finite repeatable, configurable by prop
    - Users progress comes from custom field or program goal, configured by prop
    - Goal value is configurable by prop
    - Includes prop to disable cards outside of an activities duration and show an expiry during, default is no duration (always available)
    - Includes prop to hide cards outside of an activities duration, default is no duration (always displayed)
    - Includes props for text configuration like card title, reward amount/unit, description, CTA button text
    - Includes CTA button to redirect users to where they need to complete the task (new tab or existing tab), route is configurable via prop
    - CTA link can open in a new tab or redirect on the current tab, configurable by prop
    - Can send an event to SSQT and refresh the widget when a user clicks the CTA, event is configurable via prop
    - Progress bar is hidden or shown by prop, hidden by default
    - Includes text showing how many times a user has completed a task if repeatable, text is configurable
  - \<sqm-timeline>
    - Wraps several \<sqm-timeline-entry> to create a program timeline
    - Includes prop to select between a brand colour cirle or gift icon for each entry
    - Links entry's together with a brand colour line
    - \<sqm-timeline-entry>
      - Displays a step of a program
      - Configurable text props for reward, unit, description and icon
  - \<sqm-empty>
    - A reusable empty state component to be slotted into parent components like our tables, leaderboard or reward exchange
    - Includes props to configured image, heading and description
    - Uses `empty` slot
  - \<sqm-tabs>
    - Wraps \<sqm-tab> components to create a collection of tabs
    - Similar to shoelace tabs
    - Placement can be configured to be left, right, bottom, top
    - Pulls headers from child \<sqm-tab> and displays them
  - \<sqm-tab>
    - Wraps a slotted content to be a member of the \<sqm-tabs> component
    - Has a header prop to configure the label displayed by \<sqm-tabs>
  - \<sqm-referral-card>
    - Takes two slots and displays them within a card
    - Slots are named `left` and `right`
    - Vertical alignment can be configured by a prop, defaults to `start` but options for `center` and `end` also available
  - \<sqm-image>
    - Displays an image configured with an `imageUrl` prop
    - Aligned can be `left`, `center` or `right`, defaults to `center` but is configurable by prop
    - A min height can be configured by prop
    - A background colour can be configured by prop
  - \<sqm-hero-image>
    - Displays image and text in two configuration
      - Overlay or column, defaults to overlay
    - Background and text colour are configurable via prop
    - A CTA button can be optionally shown
      - Text, link and behaviour (open in new or same tab) are configurable via prop
    - All text is configurable by props
    - Text and Image padding are configurable via prop
  - \<sqm-scroll>
    - A button that scrolls users to an element in the widget
    - Can scroll by id or tag
    - Visual props mirror that of sl-button

### Changed

- Changed Components:
  - \<sqm-big-stat>
    - Added hook functionality to query custom fields
    - Hooks now returns value (number) and statValue (string)
    - Added loading state into the hook
  - \<sqm-leaderboard>
    - Now the viewing user is shown by default, can be disabled via prop
      - If they are in the leaderboard they are highlighted, else they are displayed below the top 10
    - Updated default empty state
    - Added prop to customized anonymous user fallback
  - \<sqm-portal-container>
    - Added max width prop, defaults to 100%
    - Added prop to center children
    - Added display prop, options are grid or flex but defaults to grid
  - \<sqm-referral-table>
    - Added new default empty state
    - Changed default per page value from 3 to 4
    - Added mobile and tablet responsive functionality
    - Added props for mobile and table breakpoints, which trigger mobile friendly views
    - Added prop to hide column titles in mobile view
  - \<sqm-share-button>
    - Added default button colours and icons for all share mediums
    - Added border radius prop
    - Added background colour prop
    - Added text colour prop
  - \<sqm-share-code>
    - Sends a "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT" analytic with "DIRECT" share medium event on copy code click
  - \<sqm-share-link>
    - Sends a "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT" analytic with "DIRECT" share medium event on copy link click
  - \<sqm-titled-section>
    - Added prop to configure text alignment, left, center or right, defaults to left
  - \<sqm-hero>
    - Added default background colour which matches the previous `--sqm-portal-background` colour
  - \<sqm-text>
    - Added styling for subtitle (`sub`) elements

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

[unreleased]: https://github.com/saasquatch/program-tools/compare/mint-components@1.6.16...HEAD
[1.6.16]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.16
[1.6.15]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.15
[1.6.14]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.14
[1.6.13]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.13
[1.6.12]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.12
[1.6.11]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.11
[1.6.10]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.10
[1.6.9]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.9
[1.6.8]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.8
[1.6.7]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.7
[1.6.6]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.6
[1.6.5]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.5
[1.6.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.4
[1.6.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.3
[1.6.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.2
[1.6.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.1
[1.6.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.6.0
[1.5.5]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.5
[1.5.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.4
[1.5.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.3
[1.5.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.2
[1.5.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.1
[1.5.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.5.0
[1.4.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.4.2
[1.4.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.4.1
[1.4.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.4.0
[1.3.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.3.0
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fmint-components%401.1.1
