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
      | reward                                                       | text                                                                            |
      | pending reward due to W9                                     | W-9 required                                                                    |
      | pending reward due to fufillment error                       | Fulfillment error                                                               |
      | reward pending review of referral                            | Awaiting review                                                                 |
      | pending reward due to no connected Impact partner            | Complete your tax and cash payout setup to receive your rewards.                |
      | pending reward due to an invalid tax document                | Invalid tax form. Submit a new form to receive your rewards.                    |
      | pending reward due to user required to submit a tax document | Submit your tax documents to receive your rewards.                              |
      | pending reward due to tax document being in review           | Awaiting tax form review.                                                       |
      | reward whose payout is processing                            | Processing until <localized date>. Payout is then scheduled based your settings.|
      | reward whose payout failed                                   | Payout failed due to a fulfillment issue and is current being retried.          |
      | reward whose payout was approved                             | Payout approved and scheduled for payment based on your settings.               |
      | reward whose payout was cancelled                            | If you think this is a mistake, contact our Support team.                       |
      | cancelled reward from denied referral                        | Detected self-referral                                                          |

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
      | pftState                                           | status              | text             | pillColour | description                                                                     |
      | transfer date is in the future                     | PAYOUT_PROCESSING   | Processing       | warning    | Processing until <localized date>. Payout is then scheduled based your settings.|
      | successfully transferred to payment provider       | PAYOUT_TRANSFERRED  | Payout Approved  | primary    | Payout approved and scheduled for payment based on your settings.               |
      | approved but payout scheduled date not yet arrived | PAYOUT_NOT_YET_DUE  | Payout Approved  | primary    | Payout approved and scheduled for payment based on your settings.               |
      | failed due to fulfillment issue and retrying       | PAYOUT_OVERDUE      | Payout Failed    | danger     | Payout failed due to a fulfillment issue and is current being retried.          |
      | reversed or cancelled after being processed        | PAYOUT_REVERSED     | Payout Cancelled | danger     | If you think this is a mistake, contact our Support team.                       |