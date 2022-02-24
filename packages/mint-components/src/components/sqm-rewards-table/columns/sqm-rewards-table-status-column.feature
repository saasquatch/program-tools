@author:derek
@owner:derek
Feature: Reward Table Status Column

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
    Scenario Outline: Reward status related information is displayed under status pills
        Given a user
        And they have a <reward>
        When they view the reward table
        Then they see their reward
        And under the pill is <text>
        And the date is localized to the users locale
        Examples:
            | reward                                 | text                                                  |
            | available reward with an expiry date   | localized expiry date in format "Month-Day-Year"      |
            | redeemed reward                        | localized redemption date in format "Month-Day-Year"  |
            | expired reward                         | localized expired date in format "Month-Day-Year"     |
            | cancelled reward                       | localized cancelled date in format "Month-Day-Year"   |
            | pending reward with a end date         | localized pending for date in format "Month-Day-Year" |
            | pending reward due to W9               | W-9 required                                          |
            | pending reward due to fufillment error | Fulfillment error                                     |

    @motivating
    Scenario Outline: Statuses can be customized
        Given the "status-text" prop is "{status, select, AVAILABLE {Redeem me!} CANCELLED {Unavailable} PENDING {Coming soon!} EXPIRED {Past due} REDEEMED {Spent}}"
        And a user
        And they have a <status> reward
        When they view the reward table
        Then the status of their reward is displayed in <pillColour> pill with <text>
        Examples:
            | status    | text         | pillColour |
            | AVAILABLE | Redeem me!   | Green      |
            | CANCELLED | Unavailable  | Red        |
            | PENDING   | Coming soon! | Orange     |
            | EXPIRED   | Past due     | Red        |
            | REDEEMED  | Spent        | Blue       |

    @minutae
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