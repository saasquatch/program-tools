# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2022-11-24

### Added

- New components

  - \<sqp-account-details>

    - Allows users to edit and disconnect the paypalEmail attached to their SaaSquatch user
    - Displays a preview of any PayPal payouts that are coming in the next 3 payout periods and which currencies they will be paid out in
    - Displays any pending rewards without a dateScheduledFor that will not be paid out by PayPal until they are available

  - \<sqp-rewards-column>
    - Used with \<sqm-referral-table> from `@saasquatch/mint-components`
    - displays SaaSquatch reward statuses and additional reward statuses based on meta from PayPal transactions
  - \<sqp-status-column>
    - Used with \<sqm-rewards-table> from `@saasquatch/mint-components`
    - displays SaaSquatch reward statuses and additional reward statuses based on meta from PayPal transactions

[unreleased]: https://github.com/saasquatch/program-tools/compare/paypal-components%401.0.0...HEAD
[1.0.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch%2Fpaypal-components%401.0.0
