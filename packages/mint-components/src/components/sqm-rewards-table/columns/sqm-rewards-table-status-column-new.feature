@author:derek @owner:derek
Feature: Reward Table Status Column
  Shows the status of each reward as a coloured pill plus a description
  line. The status is derived from the reward's fraud state, the user's
  Impact tax/payout connection, the reward's PartnerFundsTransfer (PFT),
  the reward's lifecycle dates, and the reward's `statuses` /
  `pendingReasons` arrays.

  Background:
    Given the status column is included in the reward table
  # ============================================================
  # 1. COLUMN CONFIGURATION
  # ============================================================

  @motivating @ui
  Scenario Outline: The title of the status column is configurable
    Given the "column-title" prop is set to <value>
    Then the status column is shown with <columnTitle>

    Examples:
      | value           | columnTitle     |
      | Status          |                 |
      | My column title | My column title |

  @minutia @ui
  Scenario Outline: Expiry status date text can be configured
    Given the "expiry-text" prop has <value>
    And a user with an available reward with an expiry date
    When they view the reward table
    Then they see <text> under the Available Status pill

    Examples:
      | value         | text                           |
      | Expires       | Expires <localized date>       |
      | Redeem before | Redeem before <localized date> |
  # ============================================================
  # 2. STATUS PRECEDENCE
  # rewardStatus() walks the rules below from top to bottom and the first
  # matching rule wins.
  # ============================================================

  @motivating
  Scenario: Status precedence ladder
    Given a reward, its referral fraud state, the user's Impact tax connection
    Then the displayed status is determined in the following order:
      | order | rule                                                                                                               | resulting status   | resulting badge text | resulting description                                                          |
      |     1 | referral.fraudData.moderationStatus is "DENIED"                                                                    | DENIED             | Denied               | Detected self-referral                                                         |
      |     2 | referral.fraudData.moderationStatus is "PENDING"                                                                   | PENDING_REVIEW     | Pending              | Awaiting review                                                                |
      |     3 | reward.rewardedCash is true AND impactConnection is NOT connected                                                  | PENDING            | Pending              | Complete your cash payout setup to receive your rewards.                       |
      |     4 | reward.rewardedCash is true AND impactConnection is connected AND publisher.withdrawalSettings is missing          | PENDING            | Pending              | Complete your cash payout setup to receive your rewards.                       |
      |     5 | partnerFundsTransfer.status is "REVERSED"                                                                          | PAYOUT_CANCELLED   | Payout Cancelled     | If you think this is a mistake, contact our Support team.                      |
      |     6 | partnerFundsTransfer.status is "OVERDUE"                                                                           | PAYOUT_FAILED      | Payout Failed        | Payout failed due to a fulfillment issue and is currently being retried.       |
      |     7 | reward.pendingReasons includes "MISSING_PAYOUT_CONFIGURATION" AND publisher.withdrawalSettings is missing          | PENDING            | Pending              | Complete your cash payout setup to receive your rewards.                       |
      |     8 | partnerFundsTransfer.dateScheduled is in the future                                                                | PROCESSING         | Payment Processing   | Processing until Jan 1, 2026. Payout is then scheduled based on your settings. |
      |     9 | partnerFundsTransfer.status is "TRANSFERRED" / "NOT_YET_DUE", or dateScheduled has passed without REVERSED/OVERDUE | PAYOUT_APPROVED    | Payout Approved      | Payout approved and scheduled for payment based on your settings.              |
      |    10 | reward.dateCancelled is set                                                                                        | CANCELLED          | Cancelled            | Jan 1, 2026                                                                    |
      |    11 | reward.statuses includes "EXPIRED"                                                                                 | EXPIRED            | Expired              | Jan 1, 2026                                                                    |
      |    12 | reward.statuses includes "PENDING"                                                                                 | PENDING            | Pending              | Until Jan 1, 2026                                                              |
      |    16 | none of the above                                                                                                  | "" (no badge text) | (no badge text)      | (no description)                                                               |
    But for rewards where reward.rewardedCash is false (non-cash rewards, e.g. CREDIT/POINTS, PCT_DISCOUNT, INTEGRATION, FUELTANK), the following non-cash-only rules are inserted between rule 12 and rule 13, in this order:
      | order | rule                          | resulting status | resulting badge text | resulting description |
      |    13 | statuses includes "REDEEMED"  | REDEEMED         | Redeemed             | Jan 1, 2026           |
      |    14 | statuses includes "AVAILABLE" | AVAILABLE        | Available            | Expires Jan 1, 2026   |
      |    15 | statuses includes "CANCELLED" | CANCELLED        | Cancelled            | Jan 1, 2026           |

  @motivating
  Scenario: PENDING description precedence ladder
    Given a PENDING reward, its pendingReasons, and the user's Impact tax connection
    Then the description shown under the Pending pill is determined in the following order:
      | order | rule                                                                                                                                    | resulting status | resulting badge text | resulting description                                            |
      |     1 | pendingReasons includes "US_TAX" AND impactConnection.taxHandlingEnabled is false                                                       | PENDING          | Pending              | W-9 required                                                     |
      |     2 | pendingReasons includes "US_TAX" AND impactConnection is NOT connected                                                                  | PENDING          | Pending              | Complete your tax and cash payout setup to receive your rewards. |
      |     3 | pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument is missing               | PENDING          | Pending              | Submit your tax documents to receive your rewards.               |
      |     4 | pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument.status is "INACTIVE"     | PENDING          | Pending              | Invalid tax form. Submit a new form to receive your rewards.     |
      |     5 | pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument.status is "NOT_VERIFIED" | PENDING          | Pending              | Awaiting tax form review.                                        |
      |     6 | pendingReasons includes "US_TAX" AND publisher.withdrawalSettings is missing                                                            | PENDING          | Pending              | Complete your tax and cash payout setup to receive your rewards. |
      |     7 | pendingReasons includes "MISSING_PAYOUT_CONFIGURATION"                                                                                  | PENDING          | Pending              | Complete your tax and cash payout setup to receive your rewards. |

  @motivating @ui
  Scenario Outline: Payout descriptions for PFT-derived statuses
    Given a reward whose computed status is <status>
    When the cell is rendered
    Then the description line shows <description>

    Examples:
      | status           | description                                                                         |
      | PAYOUT_APPROVED  | Payout approved and scheduled for payment based on your settings.                   |
      | PAYOUT_FAILED    | Payout failed due to a fulfillment issue and is currently being retried.            |
      | PAYOUT_CANCELLED | If you think this is a mistake, contact our Support team.                           |
      | PROCESSING       | Processing until <localized date>. Payout is then scheduled based on your settings. |

  @motivating @ui
  Scenario Outline: US_TAX pending reason resolves based on the tax connection state
    Given the user has a PENDING reward whose pendingReasons include "US_TAX"
    And the user's impactConnection.taxHandlingEnabled is <taxHandlingEnabled>
    And the user's impactConnection.connected is <connected>
    And the user's publisher.requiredTaxDocumentType is <requiredTaxDocumentType>
    And the user's publisher.currentTaxDocument is <currentTaxDocument>
    And the user's publisher.currentTaxDocument.status is <currentTaxDocumentStatus>
    And the user's publisher.withdrawalSettings is <withdrawalSettings>
    Then the badge is shown in a <pillColour> pill with text <badgeText>
    And the description line shows <description>

    Examples:
      | taxHandlingEnabled | connected | requiredTaxDocumentType | currentTaxDocument | currentTaxDocumentStatus | withdrawalSettings | badgeText | pillColour | description                                                      |
      | false              | true      | W9                      | present            | ACTIVE                   | present            | Pending   | warning    | W-9 required                                                     |
      | true               | false     | -                       | -                  | -                        | -                  | Pending   | warning    | Complete your tax and cash payout setup to receive your rewards. |
      | true               | true      | W9                      | missing            | -                        | present            | Pending   | warning    | Submit your tax documents to receive your rewards.               |
      | true               | true      | W9                      | present            | INACTIVE                 | present            | Pending   | warning    | Invalid tax form. Submit a new form to receive your rewards.     |
      | true               | true      | W9                      | present            | NOT_VERIFIED             | present            | Pending   | warning    | Awaiting tax form review.                                        |
      | true               | true      | W9                      | present            | ACTIVE                   | missing            | Pending   | warning    | Complete your tax and cash payout setup to receive your rewards. |
  # ============================================================
  # 3. STATUS → BADGE COLOUR MAPPING
  # ============================================================

  @motivating @ui
  Scenario Outline: Each status maps to a badge colour and default text
    Given a reward whose computed status is <status>
    When the cell is rendered
    Then the badge is shown in a <pillColour> pill with <text>

    Examples:
      | status           | text               | pillColour |
      | AVAILABLE        | Available          | success    |
      | REDEEMED         | Redeemed           | primary    |
      | PAYOUT_APPROVED  | Payout Approved    | primary    |
      | PENDING          | Pending            | warning    |
      | PENDING_REVIEW   | Pending            | warning    |
      | PROCESSING       | Payment Processing | warning    |
      | CANCELLED        | Cancelled          | danger     |
      | EXPIRED          | Expired            | danger     |
      | DENIED           | Denied             | danger     |
      | PAYOUT_FAILED    | Payout Failed      | danger     |
      | PAYOUT_CANCELLED | Payout Cancelled   | danger     |
      | (other / "")     | Not available      | danger     |
  # ============================================================
  # 4. DESCRIPTION LINE PRECEDENCE
  # The description under the badge is selected in this order:
  #   1. Fraud descriptions (PENDING_REVIEW / DENIED)
  #   2. Pending-reason descriptions (only when status is PENDING)
  #   3. Payout descriptions (PAYOUT_APPROVED / PAYOUT_FAILED /
  #      PAYOUT_CANCELLED / PROCESSING)
  #   4. Reward date (dateCancelled / dateExpires / dateRedeemed),
  #      prefixed with the configured expiry-text when status is AVAILABLE
  # ============================================================

  @motivating @ui
  Scenario Outline: Fraud descriptions are shown for fraud-derived statuses
    Given a reward whose computed status is <status>
    When the cell is rendered
    Then the description line shows <description>

    Examples:
      | status         | description            |
      | DENIED         | Detected self-referral |
      | PENDING_REVIEW | Awaiting review        |

  @motivating @ui
  Scenario Outline: Date-based descriptions for terminal lifecycle states
    Given a reward whose computed status is <status>
    And the reward has <date> populated
    When the cell is rendered
    Then the description line shows <text>

    Examples:
      | status    | date          | text                     |
      | AVAILABLE | dateExpires   | Expires <localized date> |
      | EXPIRED   | dateExpires   | <localized date>         |
      | CANCELLED | dateCancelled | <localized date>         |
      | REDEEMED  | dateRedeemed  | <localized date>         |
  # ============================================================
  # 5. PENDING DESCRIPTION PRECEDENCE
  # Once the status precedence ladder in § 2 has produced PENDING, the
  # description shown under the "Pending" pill is determined by the
  # following ordered ladder (mirrors getTaxPendingReasons + the
  # pendingCodeMap fallback). All rules render a warning pill with text
  # "Pending"; only the description varies.
  # ============================================================

  @motivating @ui
  Scenario Outline: Generic pendingReasons codes are mapped via pendingCodeMap
    Given the user has a PENDING reward
    And the reward has no tax/payout pending reason
    And the reward.pendingReasons include <pendingReason>
    When the cell is rendered
    Then the description line shows <text>

    Examples:
      | pendingReason   | text                   |
      | SCHEDULED       | Until <localized date> |
      | UNHANDLED_ERROR | Fulfillment error      |
      | SUSPECTED_FRAUD | Awaiting review        |

  @minutia
  Scenario: Multiple pending reasons are joined with commas
    Given the user has a PENDING reward
    And the reward has no tax/payout pending reason
    And the reward.pendingReasons include both "UNHANDLED_ERROR" and "SCHEDULED"
    Then the description line shows the mapped strings joined by ", "

  @minutia
  Scenario: Unknown pending reason codes pass through verbatim
    Given the user has a PENDING reward
    And the reward.pendingReasons include a code not present in the pendingCodeMap
    Then the raw code is shown in the description line
  # ============================================================
  # 6. STATUS TEXT CUSTOMIZATION (status-text prop)
  # ============================================================

  @motivating
  Scenario Outline: Statuses can be customized via ICU format
    Given the "status-text" prop is "{status, select, AVAILABLE {Redeem me!} CANCELLED {Unavailable} PENDING {Coming soon!} EXPIRED {Past due} REDEEMED {Spent} PENDING_REVIEW {Pending Review!} PAYOUT_APPROVED {Payout Sent!} PAYOUT_FAILED {Payout Failed!} PAYOUT_CANCELLED {Payout Cancelled!} PROCESSING {Processing!} DENIED {Unlucky!}}"
    And a reward whose computed status is <status>
    When the cell is rendered
    Then the badge is rendered in a <pillColour> pill with text <text>

    Examples:
      | status           | text              | pillColour |
      | AVAILABLE        | Redeem me!        | success    |
      | CANCELLED        | Unavailable       | danger     |
      | PENDING          | Coming soon!      | warning    |
      | EXPIRED          | Past due          | danger     |
      | REDEEMED         | Spent             | primary    |
      | PENDING_REVIEW   | Pending Review!   | warning    |
      | PAYOUT_APPROVED  | Payout Sent!      | primary    |
      | PAYOUT_FAILED    | Payout Failed!    | danger     |
      | PAYOUT_CANCELLED | Payout Cancelled! | danger     |
      | PROCESSING       | Processing!       | warning    |
      | DENIED           | Unlucky!          | danger     |
  # ============================================================
  # 7. LOCALIZATION
  # ============================================================

  @minutia
  Scenario: Dates are formatted in the user's locale
    Given the "locale" prop is set to a supported locale
    Then every <localized date> placeholder above is formatted with that locale
    And the configurable text props (expiryText, payoutProcessing, etc.) flow through `intl.formatMessage`
