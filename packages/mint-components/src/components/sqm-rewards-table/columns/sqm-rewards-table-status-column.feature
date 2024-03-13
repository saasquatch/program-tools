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
      | status                   | text           | pillColour |
      | AVAILABLE                | Available      | Green      |
      | CANCELLED                | Cancelled      | Red        |
      | PENDING                  | Pending        | Orange     |
      | EXPIRED                  | Expired        | Red        |
      | REDEEMED                 | Redeemed       | Blue       |
      | PENDING_REVIEW           | Pending Review | Orange     |
      | PAYOUT_SENT              | Payout Sent    | Orange     |
      | PAYOUT_FAILED            | Payout Failed  | Orange     |
      | PENDING_TAX_REVIEW       | Pending        | Orange     |
      | PENDING_NEW_TAX_FORM     | Pending        | Orange     |
      | PENDING_TAX_SUBMISSION   | Pending        | Orange     |
      | PENDING_PARTNER_CREATION | Pending        | Orange     |
      | DENIED                   | Denied         | Red        |

  @motivating
  Scenario Outline: Reward status related information is displayed under status pills
    Given a user
    And they have a <reward>
    And their program is
    When they view the reward table
    Then they see their reward
    And under the pill is <text>
    And the date is localized to the users locale

    Examples: 
      | reward                                                       | text                                                                                   |
      | available reward with an expiry date                         | localized expiry date in format "Month-Day-Year"                                       |
      | redeemed reward                                              | localized redemption date in format "Month-Day-Year"                                   |
      | expired reward                                               | localized expired date in format "Month-Day-Year"                                      |
      | cancelled reward                                             | localized cancelled date in format "Month-Day-Year"                                    |
      | pending reward with a end date                               | localized pending for date in format "Month-Day-Year"                                  |
      | pending reward due to W9                                     | W-9 required                                                                           |
      | pending reward due to fufillment error                       | Fulfillment error                                                                      |
      | reward pending review of referral                            | Pending review                                                                         |
      | pending reward due to no connected Impact partner            | Complete your tax and cash payout setup to receive your rewards.                       |
      | pending reward due to an invalid tax document                | Invalid tax form. Submit a new form to receive your rewards.                           |
      | pending reward due to user required to submit a tax document | Submit your tax documents to receive your rewards.                                     |
      | pending reward due to tax document being in review           | Awaiting tax form review.                                                              |
      | reward whose payout failed                                   | Payout failed due to a fulfillment issue and is currently being retried.               |
      | reward whose payout was sent                                 | Reward approved for payout on {date} and scheduled for payment based on your settings. |
      | cancelled reward from denied referral                        | Flagged as fraud                                                                       |

  @minutia
  Scenario Outline: Tax-related reward statuses are based on the user's Impact tax connection
    Given a user
    And they are in a program that has Impact tax handling enabled
    And they have at least one pending reward
    And the reward's pending reasons include "PAYOUT_CONFIGURATION_MISSING"
    Then the status description will be
      """
      Complete your tax and cash payout setup to receive your rewards.
      """

  @motivating
  Scenario Outline: Statuses can be customized
    Given the "status-text" prop is "{status, select, AVAILABLE {Redeem me!} CANCELLED {Unavailable} PENDING {Coming soon!} EXPIRED {Past due} REDEEMED {Spent} PENDING_REVIEW {Pending Review!} PAYOUT_SENT {Payout Sent!} PAYOUT_FAILED {Payout Failed!} PENDING_TAX_REVIEW {Pending Tax Review!} PENDING_NEW_TAX_FORM {Pending new tax form!} PENDING_TAX_SUBMISSION {Pending tax submission!} PENDING_PARTNER_CREATION {Pending partner creation!} DENIED {Unlucky!}}"
    And a user
    And they have a <status> reward
    When they view the reward table
    Then the status of their reward is displayed in <pillColour> pill with <text>

    Examples: 
      | status                   | text                      | pillColour |
      | AVAILABLE                | Redeem me!                | Green      |
      | CANCELLED                | Unavailable               | Red        |
      | PENDING                  | Coming soon!              | Orange     |
      | EXPIRED                  | Past due                  | Red        |
      | REDEEMED                 | Spent                     | Blue       |
      | PENDING_REVIEW           | Pending Review!           | Orange     |
      | PAYOUT_SENT              | Payout Sent!              | Orange     |
      | PAYOUT_FAILED            | Payout Failed!            | Orange     |
      | PENDING_TAX_REVIEW       | Pending Tax Review!       | Orange     |
      | PENDING_NEW_TAX_FORM     | Pending new tax form!     | Orange     |
      | PENDING_TAX_SUBMISSION   | Pending tax submission!   | Orange     |
      | PENDING_PARTNER_CREATION | Pending partner creation! | Orange     |
      | DENIED                   | Unlucky!                  | Red        |

  @minutia @ui
  Scenario: Expiry status date text can be configured
    Given the "expiry-text" prop has <value>
    And a user with an available reward with an expiry date
    When they view the reward table
    Then they see <text> under the Available Status pill

    Examples: 
      | value         | text                        |
      |               | Expires on <EXPIRY DATE>    |
      | Redeem before | Redeem before <EXPIRY DATE> |
