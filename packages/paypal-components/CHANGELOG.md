# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.3] - 2023-06-14

### Changed

- Updated `@shoelace-style/shoelace` to `@saasquatch/shoelace` to fix tooltip and dropdown issues

## [1.0.2] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.0.1] - 2022-11-29

### Added

- New components

  - \<sqp-account-details>

    - Allows users to edit and disconnect the paypalEmail attached to their SaaSquatch user
    - version `@saasquatch/mint-components@1.6.5` or later is required to query data necessary for these components
    - Displays a preview of any PayPal payouts that are coming in the next 3 payout periods and which currencies they will be paid out in
    - Displays any pending rewards without a dateScheduledFor that will not be paid out by PayPal until they are available

  - \<sqp-rewards-column>
    - Used with \<sqm-referral-table> from `@saasquatch/mint-components`
    - displays SaaSquatch reward statuses and additional reward statuses based on meta from PayPal transactions
  - \<sqp-status-column>
    - Used with \<sqm-rewards-table> from `@saasquatch/mint-components`
    - displays SaaSquatch reward statuses and additional reward statuses based on meta from PayPal transactions

[unreleased]: https://github.com/saasquatch/program-tools/compare/paypal-components%401.0.3...HEAD
[1.0.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fpaypal-components%401.0.3
[1.0.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fpaypal-components%401.0.2
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fpaypal-components%401.0.1
