@author:noah @owner:noah
Feature: Referral Table Reward Column
  Shows the reward associated with each referral

  Background: 
    Given the status column is included in the referral table
    And at least one referral exists



  @motivating @ui
  Scenario Outline: The referral reward and its status are shown for each referral
    Then for each referral reward there exists a reward cell
    And the reward type and value is displayed in the cell
    And the status of each reward is displayed as a pill in the cell
    And rewards of <status> have a <pillColour> pill with the text <statusText>

    Examples: 
      | status                     | pillColour | statusText         |
      | Available                  | success    | Available          |
      | Pending                    | warning    | Pending            |
      | Pending Fraud Review       | warning    | Pending            |
      | Pending Tax Review         | warning    | Pending            |
      | Pending New Tax Form       | warning    | Pending            |
      | Pending Tax Submission     | warning    | Pending            |
      | Pending Partner Creation   | warning    | Pending            |
      | Cancelled                  | danger     | Cancelled          |
      | Payout Overdue             | danger     | Payout Failed      |
      | Payout Reversed            | danger     | Payout Cancelled   |
      | Expired                    | danger     | Expired            |
      | Denied                     | danger     | Denied             |
      | Redeemed                   | primary    | Redeemed           |
      | Payout Transferred         | primary    | Payout Approved    |
      | Payout Not Yet Due         | primary    | Payout Approved    |
      | Payout Processing          | primary    | Payment Processing |

  @motivating
  Scenario: The pending period of a referral reward is shown inside the pill if scheduled
    Given a reward that is pending
    And the reward has a scheduled date in the future
    Then the status pill of the reward will contain the text "Pending for <relativeTime>"
    And the date is localized to the user's locale

    Examples: 
      | relativeTime |
      | 2 days       |
      | 1 week       |
      | 3 months     |

  @motivating
  Scenario: The expiry date of a reward is shown in a secondary pill
    Given a reward that is available
    And the reward has a set expiry date
    Then an additional info pill will appear next to the status pill with the text "Expiring in <relativeTime>"
    And the date is localized to the user's locale

    Examples: 
      | relativeTime |
      | 2 days       |
      | 1 week       |

  @motivating @ui
  Scenario Outline: Expanding the reward cell shows specific detailed status messages
    When a reward cell is clicked
    Then it expands to show the detail view
    And if the reward status is <status>
    Then the detail text displays <detailMessage>

    Examples: Payout States
      | status             | detailMessage                                                              |
      | Payout Approved    | Processing until {date}. Payout is then scheduled based on your settings.  |
      | Payout Failed      | Payout failed due to a fulfillment issue and is currently being retried.   |
      | Payout Cancelled   | If you think this is a mistake, contact our Support team.                  |
      | Processing         | Processing until {date}. Payout is then scheduled based on your settings.  |

    Examples: Tax Compliance States
      | status                   | detailMessage                                                      |
      | Pending Tax Review       | Awaiting tax form review                                           |
      | Pending New Tax Form     | Invalid tax form. Submit a new form to receive your rewards.       |
      | Pending Tax Submission   | Submit your tax documents to receive your rewards                  |
      | Pending Partner Creation | Complete your tax and cash payout setup to receive your rewards    |

    Examples: Standard States
      | status             | detailMessage       |
      | Available          | Reward expiring on  |
      | Cancelled          | Reward cancelled on |
      | Pending            | Available on        |
      | Pending Review     | Pending since       |
      | Denied             | Denied on           |
      | Expired            | Reward expired on   |
      | Redeemed           | Redeemed            |

  @motivating
  Scenario: Fuel Tank codes are displayed in the expanded view
    Given a reward has a Fuel Tank code
    When the reward cell is clicked
    Then the expanded details display the text "Your code is"
    And the code <fuelTankCode> is displayed in bold

  @motivating
  Scenario: Fraud denial help text is displayed
    Given a reward has been denied due to fraud
    And the component has "deniedHelpText" configured
    When the reward cell is clicked
    Then the expanded details display the denied help text next to the denial date

  @minutia
  Scenario: Payout-related reward statuses are determined by the state of the Paid Funds Transfer
    Given a reward exists
    And the reward has a connected Paid Funds Transfer (PFT)
    When the PFT is in <pftState>
    Then the reward's status is <status>
    And the status text displays <text>
    And the status is displayed in a <pillColour> pill

    Examples:
      | pftState                                           | status              | text               | pillColour |
      | transfer date is in the future | PROCESSING | Payment Processing | primary |
      | successfully transferred to payment provider       | PAYOUT_TRANSFERRED  | Payout Approved    | primary    |
      | approved but payout scheduled date not yet arrived | PAYOUT_NOT_YET_DUE  | Payout Approved    | primary    |
      | failed due to fulfillment issue and retrying       | PAYOUT_OVERDUE      | Payout Failed      | danger     |
      | reversed or cancelled after being processed        | PAYOUT_REVERSED     | Payout Cancelled   | danger     |
