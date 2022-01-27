@author:derek
@owner:derek
Feature: Reward Table Status Column

    Shows the status of each reward

    Background:
        Given the status column is included in the reward table

    @motivating
    Scenario Outline: The title of the status column is configurable
        Given the "column-title" prop is set to <value>
        Then the status column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | Status          |                 |
            | My column title | My column title |

    @motivating
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
    Scenario Outline: Reward status related dates are displayed under status pills
        Given a user
        And they have a <reward>
        When they view the reward table
        Then they see their reward
        And under the pill is <date> in format "Month-Date-Year"
        And the date is localized to the users locale
        Examples:
            | reward                               | date            |
            | available reward with an expiry date | expiry date     |
            | redeemed reward                      | redemption date |
            | expired reward                       | expired date    |
            | cancelled reward                     | cancelled date  |

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
    Scenario: Expiry status date text can be configured
        Given the "expiry-text" prop has <value>
        And a user with an available reward with an expiry date
        When they view the reward table
        Then they see <text> under the Available Status pill
        Examples:
            | value         | text                        |
            |               | Expires on <EXPIRY DATE>    |
            | Redeem before | Redeem before <EXPIRY DATE> |