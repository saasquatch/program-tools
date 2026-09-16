@author:derek @owner:derek
Feature: Reward Table Status Column
  Shows the status of each reward

  Background:
    Given the status column is included in the reward table

  @motivating @ui
  Scenario Outline: The title of the status column is configurable
    Given the "column-title" prop is set to <value>
    Then the status column is shown with <columnTitle>

    Examples:
      | value           | columnTitle     |
      | Status          |                 |
      | My column title | My column title |

  @motivating @ui
  Scenario Outline: The status column displays the status of each reward
    Given a user
    And they have a <status> reward
    When they view the reward table
    Then the status of their reward is displayed in <pillColour> pill with <text>

    Examples:
      | status                   | text             | pillColour |
      | AVAILABLE                | Available        | success    |
      | CANCELLED                | Cancelled        | danger     |
      | PENDING                  | Pending          | warning    |
      | EXPIRED                  | Expired          | danger     |
      | REDEEMED                 | Redeemed         | primary    |
      | PENDING_REVIEW           | Pending          | warning    |
      | PAYOUT_TRANSFERRED       | Payout Approved  | primary    |
      | PAYOUT_NOT_YET_DUE       | Payout Approved  | primary    |
      | PAYOUT_OVERDUE           | Payout Failed    | danger     |
      | PAYOUT_REVERSED          | Payout Cancelled | danger     |
      | PROCESSING               | Processing       | warning    |
      | PENDING_TAX_REVIEW       | Pending          | warning    |
      | PENDING_NEW_TAX_FORM     | Pending          | warning    |
      | PENDING_TAX_SUBMISSION   | Pending          | warning    |
      | PENDING_PARTNER_CREATION | Pending          | warning    |
      | DENIED                   | Denied           | danger     |

  @motivating
  Scenario Outline: Status precedence ladder
    Given a reward, its referral fraud state, the user's Impact tax connection
    Then <rule> is produced
    And the <resultingStatus>, <resultingBadgeText>, and <resultingDescription> is determined in the following <order>:

    Examples:
      | order | rule                                                                                                               | resultingStatus  | resultingBadgeText | resultingDescription                                                           |
      |     1 | referral.fraudData.moderationStatus is "DENIED"                                                                    | DENIED           | Denied             | Detected self-referral                                                         |
      |     2 | referral.fraudData.moderationStatus is "PENDING"                                                                   | PENDING_REVIEW   | Pending            | Awaiting review                                                                |
      |     3 | reward.rewardedCash is true AND impactConnection is NOT connected                                                  | PENDING          | Pending            | Complete your cash payout setup to receive your rewards.                       |
      |     4 | reward.rewardedCash is true AND impactConnection is connected AND publisher.withdrawalSettings is missing          | PENDING          | Pending            | Complete your cash payout setup to receive your rewards.                       |
      |     5 | partnerFundsTransfer.status is "REVERSED"                                                                          | PAYOUT_CANCELLED | Payout Cancelled   | If you think this is a mistake, contact our Support team.                      |
      |     6 | partnerFundsTransfer.status is "OVERDUE"                                                                           | PAYOUT_FAILED    | Payout Failed      | Payout failed due to a fulfillment issue and is currently being retried.       |
      |     7 | reward.pendingReasons includes "MISSING_PAYOUT_CONFIGURATION" AND publisher.withdrawalSettings is missing          | PENDING          | Pending            | Complete your cash payout setup to receive your rewards.                       |
      |     8 | partnerFundsTransfer.dateScheduled is in the future                                                                | PROCESSING       | Payment Processing | Processing until Jan 1, 2026. Payout is then scheduled based on your settings. |
      |     9 | partnerFundsTransfer.status is "TRANSFERRED" / "NOT_YET_DUE", or dateScheduled has passed without REVERSED/OVERDUE | PAYOUT_APPROVED  | Payout Approved    | Payout approved and scheduled for payment based on your settings.              |
      |    10 | reward.dateCancelled is set                                                                                        | CANCELLED        | Cancelled          | Jan 1, 2026                                                                    |
      |    11 | reward.statuses includes "EXPIRED"                                                                                 | EXPIRED          | Expired            | Jan 1, 2026                                                                    |
      |    12 | reward.statuses includes "PENDING"                                                                                 | PENDING          | Pending            | Until Jan 1, 2026                                                              |
      |    13 | statuses includes "REDEEMED"                                                                                       | REDEEMED         | Redeemed           | Jan 1, 2026                                                                    |
      |    14 | statuses includes "AVAILABLE"                                                                                      | AVAILABLE        | Available          | Expires Jan 1, 2026                                                            |
      |    15 | statuses includes "CANCELLED"                                                                                      | CANCELLED        | Cancelled          | Jan 1, 2026                                                                    |
# This spec should probably be inserted in to the above spec after rule 9 because it gets invoked when the reward state is pending
# and does not hit the rules that output pending from above

  @motivating
  Scenario Outline: PENDING description precedence ladder
    Given a PENDING reward, its pendingReasons, and the user's Impact tax connection
    Then <rule> is produced
    And the <resultingStatus>, <resultingBadgeText>, and <resultingDescription> is determined in the following order:

    Examples:
      | order | rule                                                                                                                                    | resultingStatus | resultingBadgeText | resultingDescription                                             |
      |     1 | pendingReasons includes "US_TAX" AND impactConnection.taxHandlingEnabled is false                                                       | PENDING         | Pending            | W-9 required                                                     |
      |     2 | pendingReasons includes "US_TAX" AND impactConnection is NOT connected                                                                  | PENDING         | Pending            | Complete your tax and cash payout setup to receive your rewards. |
      |     3 | pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument is missing               | PENDING         | Pending            | Submit your tax documents to receive your rewards.               |
      |     4 | pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument.status is "INACTIVE"     | PENDING         | Pending            | Invalid tax form. Submit a new form to receive your rewards.     |
      |     5 | pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument.status is "NOT_VERIFIED" | PENDING         | Pending            | Awaiting tax form review.                                        |
      |     6 | pendingReasons includes "US_TAX" AND publisher.withdrawalSettings is missing                                                            | PENDING         | Pending            | Complete your tax and cash payout setup to receive your rewards. |
      |     7 | pendingReasons includes "MISSING_PAYOUT_CONFIGURATION"                                                                                  | PENDING         | Pending            | Complete your tax and cash payout setup to receive your rewards. |
      |     8 | reward.rewardedCash is true AND impactConnection is NOT connected (fallback when no pendingReason returned)                             | PENDING         | Pending            | Complete your tax and cash payout setup to receive your rewards. |
      |     9 | reward.rewardedCash is true AND impactConnection is connected AND publisher.withdrawalSettings is missing (fallback)                    | PENDING         | Pending            | Complete your tax and cash payout setup to receive your rewards. |

  @motivating
  Scenario Outline: Reward status related information is displayed under status pills
    Given a user
    And they have a <reward>
    And their program is
    When they view the reward table
    Then they see their reward
    And under the pill is <text>
    And the date is localized to the users locale

    Examples: Standard Rewards
      | reward                               | text                     |
      | available reward with an expiry date | Expires <localized date> |
      | redeemed reward                      | <localized date>         |
      | expired reward                       | <localized date>         |
      | cancelled reward                     | <localized date>         |
      | pending reward with a scheduled date | Until <localized date>   |

    Examples: Tax & Payout Rewards
      | reward                                                       | text                                                                                |
      | pending reward due to W9                                     | W-9 required                                                                        |
      | pending reward due to fulfillment error                      | Fulfillment error                                                                   |
      | reward pending review of referral                            | Awaiting review                                                                     |
      | pending reward due to no connected Impact partner            | Complete your tax and cash payout setup to receive your rewards.                    |
      | pending reward due to an invalid tax document                | Invalid tax form. Submit a new form to receive your rewards.                        |
      | pending reward due to user required to submit a tax document | Submit your tax documents to receive your rewards.                                  |
      | pending reward due to tax document being in review           | Awaiting tax form review.                                                           |
      | reward whose payout is processing                            | Processing until <localized date>. Payout is then scheduled based on your settings. |
      | reward whose payout failed                                   | Payout failed due to a fulfillment issue and is currently being retried.            |
      | reward whose payout was approved                             | Payout approved and scheduled for payment based on your settings.                   |
      | reward whose payout was cancelled                            | If you think this is a mistake, contact our Support team.                           |
      | cancelled reward from denied referral                        | Detected self-referral                                                              |

  @minutia
  Scenario Outline: Tax-related reward statuses are based on the user's Impact tax connection
    Given a user
    And they are in a program that has Impact tax handling enabled
    And they have at least one pending reward
    And the reward's pending reasons include "MISSING_PAYOUT_CONFIGURATION"
    Then the status description will be
      """
      Complete your tax and cash payout setup to receive your rewards.
      """

  @motivating
  Scenario Outline: Statuses can be customized via ICU format
    Given the "status-text" prop is "{status, select, AVAILABLE {Redeem me!} CANCELLED {Unavailable} PENDING {Coming soon!} EXPIRED {Past due} REDEEMED {Spent} PENDING_REVIEW {Pending Review!} PAYOUT_SENT {Payout Sent!} PAYOUT_FAILED {Payout Failed!} PENDING_TAX_REVIEW {Pending Tax Review!} PENDING_NEW_TAX_FORM {Pending new tax form!} PENDING_TAX_SUBMISSION {Pending tax submission!} PENDING_PARTNER_CREATION {Pending partner creation!} DENIED {Unlucky!}}"
    And a user
    And they have a <status> reward
    When they view the reward table
    Then the status of their reward is displayed in <pillColour> pill with <text>

    Examples:
      | status             | text              | pillColour |
      | AVAILABLE          | Redeem me!        | success    |
      | CANCELLED          | Unavailable       | danger     |
      | PENDING            | Coming soon!      | warning    |
      | EXPIRED            | Past due          | danger     |
      | REDEEMED           | Spent             | primary    |
      | PENDING_REVIEW     | Pending Review!   | warning    |
      | PAYOUT_TRANSFERRED | Payout Approved!  | primary    |
      | PAYOUT_NOT_YET_DUE | Payout Approved!  | primary    |
      | PAYOUT_OVERDUE     | Payout Failed!    | danger     |
      | PAYOUT_REVERSED    | Payout Cancelled! | danger     |
      | DENIED             | Unlucky!          | danger     |

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

  @motivating
  Scenario: Payout-related reward statuses are determined by the state of the Paid Funds Transfer
    Given a user has a reward with a connected Paid Funds Transfer (PFT)
    When the PFT is in <pftState>
    Then the reward's status is <status>
    And the status is displayed in a <pillColour> pill with <text>
    And under the pill is <description>

    Examples:
      | pftState                                           | status             | text             | pillColour | description                                                                         |
      | transfer date is in the future                     | PROCESSING         | Processing       | warning    | Processing until <localized date>. Payout is then scheduled based on your settings. |
      | successfully transferred to payment provider       | PAYOUT_TRANSFERRED | Payout Approved  | primary    | Payout approved and scheduled for payment based on your settings.                   |
      | approved but payout scheduled date not yet arrived | PAYOUT_NOT_YET_DUE | Payout Approved  | primary    | Payout approved and scheduled for payment based on your settings.                   |
      | failed due to fulfillment issue and retrying       | PAYOUT_OVERDUE     | Payout Failed    | danger     | Payout failed due to a fulfillment issue and is currently being retried.            |
      | reversed or cancelled after being processed        | PAYOUT_REVERSED    | Payout Cancelled | danger     | If you think this is a mistake, contact our Support team.                           |
