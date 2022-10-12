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
        And it <mayHaveBeenPaidOut> by the Paypal integration
        When they view the reward table
        Then the status of their reward is displayed in <pillColour> pill with <text>
        And they <maySee> the PayPal icon to the right of the pill
        Examples:
            | status    | mayHaveBeenPaidOut                                                          | text        | pillColour | maySee    |
            | AVAILABLE | hasn't been paid out                                                        | Available   | Green      | don’t see |
            | REDEEMED  | has been paid out (datePaidOut)                                             | Transferred | Blue       | see       |
            | AVAILABLE | failed to be paid out (meta status is ERROR)                                | Failed      | Red        | see       |
            | AVAILABLE | is being paid out by the integration (dateLastAttempted but no datePaidOut) | In Progress | Orange     | see       |
            | CANCELLED | N/A                                                                         | Cancelled   | Red        | don't see |
            | PENDING   | N/A                                                                         | Pending     | Orange     | don't see |
            | EXPIRED   | N/A                                                                         | Expired     | Red        | don't see |
            | REDEEMED  | N/A                                                                         | Redeemed    | Blue       | don't see |

    @motivating
    Scenario Outline: Reward status related information is displayed under status pills
        Given a user
        And they have a <reward>
        When they view the reward table
        Then they see their reward
        And under the pill is <text>
        And the date is localized to the users locale
        Examples:
            | reward                                                             | text                                                                                                 |
            | available reward with an expiry date                               | localized expiry date in format "Month-Day-Year"                                                     |
            | redeemed reward                                                    | localized redemption date in format "Month-Day-Year"                                                 |
            | expired reward                                                     | localized expired date in format "Month-Day-Year"                                                    |
            | cancelled reward                                                   | localized cancelled date in format "Month-Day-Year"                                                  |
            | pending reward with a end date                                     | localized pending for date in format "Month-Day-Year"                                                |
            | pending reward due to W9                                           | W-9 required                                                                                         |
            | pending reward due to fufillment error                             | Fulfillment error                                                                                    |
            | redeemed reward paid out by the integration                        | localized datePaidOut from the reward meta in format “Month-Day-Year”                                |
            | available reward that was failed to be paid out by the integration | Last attempted then the localized DateLastAttempted from the reward meta in format “Month-0Day_Year” |
            | available reward that is being paid out by the integration         | Processing Payout                                                                                    |

    @motivating
    Scenario Outline: Statuses can be customized
        Given the "status-text" prop is "{status, select, PAYOUTFAILED {Failed sorry!} PAYOUTSUCCEEDED {Paid} PAYOUTINPROGRESS {Transferring} AVAILABLE {Redeem me!} CANCELLED {Unavailable} PENDING {Coming soon!} EXPIRED {Past due} REDEEMED {Spent}}"
        And a user
        And they have a <status> reward
        When they view the reward table
        Then the status of their reward is displayed in <pillColour> pill with <text>
        Examples:
            | status                                                            | text          | pillColour |
            | available                                                         | Redeem me!    | Green      |
            | cancelled                                                         | Unavailable   | Red        |
            | pending                                                           | Coming soon!  | Orange     |
            | expired                                                           | Past due      | Red        |
            | redeemed                                                          | Spent         | Blue       |
            | redeemed and paid out by the PayPal integration                   | Paid          | Blue       |
            | available but being paid out by the PayPal integration            | Transferring  | Orange     |
            | available and has failed to be paid out by the PayPal integration | Failed sorry! | Red        |

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