@author:derek
@owner:derek
Feature: Paypal Reward Status Column

    Shows the status of each reward

    Background:
        Given the status column is included in the reward table

    @motivating
    @ui
    Scenario Outline: The title of the status column is configurable
        Given the "column-title" prop is set to <value>
        Then the status column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | Status          |                 |
            | My column title | My column title |

    @motivating
    @ui
    Scenario Outline: The status column displays the status of each reward
        Given a user
        And they have a <status> reward
        When they view the reward table
        Then the status of their reward is displayed in <pillColour> pill with <text>
        Examples:
            | status    | text      | pillColour |
            | AVAILABLE | Available | Green      |
            | CANCELLED | Cancelled | Red        |
            | PENDING   | Pending   | Orange     |
            | EXPIRED   | Expired   | Red        |
            | REDEEMED  | Redeemed  | Blue       |

    @motivating
    @ui
    Scenario Outline: The status column displays the status of PayPal rewards
        Given a user
        And they have a reward with <paypalStatus> in its reward meta
        When they view the rewards table
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
        Given a user
        And they have an <status> reward that is to be paid out by the PayPal integration
        When they view the rewards table
        Then they see the PayPal icon to the right of rewards status pill
        Examples:
            | status    |
            | AVAILABLE |
            | PENDING   |

    @motivating
    Scenario Outline: Reward status related information is displayed under status pills
        Given a user
        And they have a <reward>
        When they view the reward table
        Then they see their reward
        And under the pill is <text>
        And the date is localized to the users locale
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
            | Unclaimed PayPal payout reward         | The email you provided does not link to an existing PayPal account. Payout expires on {dateLastUpdated + 30 days from the customMeta}.                              |
            | On hold PayPal payout reward           | Payout on hold and in review since {dadateLastUpdated from the customMetateLastUpdated}.                                                                             |
            | Refunded PayPal payout reward          | Payout refunded on {dateLastUpdated from the customMeta}                                                                                                             |
            | Returned PayPal payout reward          | The email you provided does not link to an existing PayPal account. Payout expired on {dateLastUpdated + 30 days from the customMeta}.                              |
            | Reversed PayPal payout reward          | Payout reversed on {dateLastUpdated from the customMeta}                                                                                                             |
            | Blocked PayPal payout reward           | Payout blocked on {dateLastUpdated from the customMeta}                                                                                                              |

    @motivating
    Scenario Outline: Statuses can be customized
        Given the "status-text" prop is "{status, select, PAYOUTSUCCESS {Paid} PAYOUTFAILED {Error} PAYOUTPENDING {Pending} PAYOUTUNCLAIMED {Claim!} PAYOUTONHOLD{On hold} PAYOUTREFUNDED {Refund} PAYOUTRETURNED {Return} PAYOUTREVERSED {Reverse} PAYOUTBLOCKED {Held} AVAILABLE {Redeem me!} CANCELLED {Unavailable} PENDING {Coming soon!} EXPIRED {Past due} REDEEMED {Spent}}"
        And a user
        And they have a <status> reward
        When they view the reward table
        Then the status of their reward is displayed in a pill with <text>
        Examples:
            | status    | text         |
            | available | Redeem me!   |
            | cancelled | Unavailable  |
            | pending   | Coming soon! |
            | expired   | Past due     |
            | redeemed  | Spent        |
            | SUCCESS   | Paid         |
            | FAILED    | Error        |
            | PENDING   | Pending      |
            | UNCLAIMED | Claim!       |
            | ONHOLD    | On hold      |
            | REFUNDED  | Refund       |
            | RETURNED  | Return       |
            | REVERSED  | Reverse      |
            | BLOCKED   | Held         |

    @minutia
    @ui
    Scenario: Expiry status date text can be configured
        Given the "expiry-text" prop has <value>
        And a user with an available reward with an expiry date
        When they view the reward table
        Then they see <text> under the Available Status pill
        Examples:
            | value         | text                        |
            |               | Expires on <EXPIRY DATE>    |
            | Redeem before | Redeem before <EXPIRY DATE> |