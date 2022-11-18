@author:derek
@owner:derek
Feature: Referral Table Reward Column

    Shows the reward associated with each referral

    Background:
        Given a user
        And the status column is included in the referral table
        And at least one referral exists

    @motivating
    @ui
    Scenario Outline: The referral reward and it's status are shown for each referral
        Then for each referral reward there exists a reward cell
        And the reward type and value is displayed in the cell
        And the status of each reward is displayed as a pill in the cell
        And rewards of <status> have a <pillColour> pill with the text <statusText>
        Examples:
            | status    | pillColour | statusText |
            | Available | green      | Available  |
            | Pending   | orange     | Pending    |
            | Cancelled | red        | Cancelled  |
            | Expired   | red        | Expired    |
            | Redeemed  | blue       | Redeemed   |

    @motivating
    @ui
    Scenario Outline: The status column displays the status of PayPal rewards
        Given a reward with <paypalStatus> in its reward meta
        Then the status of their reward is displayed in a <pillColour> pill with <text>
        And they see the PayPal icon to the right of the pill
        Examples:
            | status    | text        | pillColour |
            | SUCCESS   | Paid Out    | Blue       |
            | FAILED    | Failed      | Red        |
            | PENDING   | In progress | Orange     |
            | UNCLAIMED | Unclaimed   | Orange     |
            | ONHOLD    | In progress | Orange     |
            | REFUNDED  | Refunded    | grey       |
            | RETURNED  | Returned    | grey       |
            | REVERSED  | Reversed    | grey       |
            | BLOCKED   | Blocked     | grey       |

    @minutia
    Scenario Outline: Available rewards of a reward unit and currency paid out by the tenants PayPal integration display a PayPal icon with the badge
        Given a <status> reward that is to be paid out by the PayPal integration
        Then the PayPal icon is displayed to the right of rewards status pill
        Examples:
            | status    |
            | AVAILABLE |
            | PENDING   |

    @motivating
    Scenario: The pending period of a referral reward is shown if it exists
        Given a reward that is pending
        And the reward has a set pending period
        Then the status pill of the reward will instead have the text "Pending for <relativeTime>"
        And all dates are localized to the users locale
        Examples:
            | relativeTime |
            | 2 days       |
            | 1 week       |
            | 3 months     |
            | 2 years      |

    @motivating
    Scenario: The expiry date of a reward is shown if it exists
        Given a reward that is available
        And the reward has a set expiry date
        Then an additional grey pill will appear next to the status pill with the text "Expiring in <relativeTime>"
        And all dates are localized to the users locale
        Examples:
            | relativeTime |
            | 2 days       |
            | 1 week       |
            | 3 months     |
            | 2 years      |

    @motivating
    Scenario Outline: Each reward can be expanded to show additional details about the reward
        Given a <reward>
        When a reward cell is clicked
        Then it expands to show <text>
        And all dates are localized to a users locale
        Examples:
            | reward                                 | text                                                                                                                                                                 |
            | available reward with an expiry date   | localized expiry date in format "Month-Day-Year"                                                                                                                     |
            | redeemed reward                        | localized redemption date in format "Month-Day-Year"                                                                                                                 |
            | expired reward                         | localized expired date in format "Month-Day-Year"                                                                                                                    |
            | cancelled reward                       | localized cancelled date in format "Month-Day-Year"                                                                                                                  |
            | pending reward with a end date         | localized pending for date in format "Month-Day-Year"                                                                                                                |
            | pending reward due to W9               | W-9 required                                                                                                                                                         |
            | pending reward due to fufillment error | Fulfillment error                                                                                                                                                    |
            | succeeded PayPal payout reward         | Paid out on {dateLastUpdated from the customMeta}.                                                                                                                   |
            | Failed PayPal payout reward            | This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on {dateLastAttempted from the customMeta}. |
            | Pending PayPal payout reward           | Payout process started on {dateLastUpdated from the customMeta}.                                                                                                     |
            | Unclaimed PayPal payout reward         | The email you provided does not link to an existing PayPal account. Payout expires on {dateLastUpdated + 30 days from the customMeta}.                               |
            | On hold PayPal payout reward           | Payout on hold and in review since {dadateLastUpdated from the customMetateLastUpdated}.                                                                             |
            | Refunded PayPal payout reward          | Payout refunded on {dateLastUpdated from the customMeta}                                                                                                             |
            | Returned PayPal payout reward          | The email you provided does not link to an existing PayPal account. Payout expired on {dateLastUpdated}.                                                             |
            | Reversed PayPal payout reward          | Payout reversed on {dateLastUpdated from the customMeta}                                                                                                             |
            | Blocked PayPal payout reward           | Payout blocked on {dateLastUpdated from the customMeta}                                                                                                              |