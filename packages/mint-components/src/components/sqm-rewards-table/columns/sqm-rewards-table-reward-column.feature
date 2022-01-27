@author:derek
@owner:derek
Feature: Reward Table reward Column

    Shows the exact reward

    Background:
        Given the reward column is included in the reward table
        And rewards with translations exist

    @motivating
    Scenario Outline: The title of the reward column is configurable
        Given the "column-title" prop is set to <value>
        Then the reward column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | Reward          |                 |
            | My column title | My column title |

    @motivating
    Scenario: The reward column displays the prettyValue of the reward given
        Given a user with a reward
        When they view the rewards table
        Then they see the name of their reward in the reward column
        And the name is the prettyValue translated for the users locale

    @motivating
    Scenario: The reward column displays an availability bar if the reward is redeemable
        Given a user with a credit reward of <value>
        But the user has <redeemedAmount>
        When they view the rewards table
        Then the reward column displays <value>
        And under it displays an availability bar with <percentage> filled
        And under it displays <availabilityText>
        Examples:
            | value     | percentage | availableAmount | availabilityText    |
            | 10 Points | 100%       | 10 Points       | 10 Points available |
            | 10 Points | 90%        | 9 Points        | 9 Points available  |
            | 10 Points | 10%        | 1 Point         | 1 Point  available  |

    @motivating
    Scenario Outline: The reward column displays an availability bar if the reward was redeemable but had been cancelled or expired
        Given a user with a credit reward of <value>
        And the reward has <status>
        But the user has <redeemedAmount>
        When they view the rewards table
        When they view the rewards table
        Then the reward column displays <value>
        And under it displays an availability bar with <percentage> filled
        And under it displays <redeemedText>
        Examples:
            | status      | value     | percentage | redeemedAmount | redeemedText     |
            | "EXPIRED"   | 10 Points | 100%       | 0 Point        | 0 Point redeemed |
            | "EXPIRED"   | 10 Points | 80%        | 2 Point        | 2 Point redeemed |
            | "CANCELLED" | 10 Points | 100%       | 0 Point        | 0 Point redeemed |
            | "CANCELLED" | 10 Points | 20%        | 8 Point        | 8 Point redeemed |

    @motivating
    Scenario: The reward column doesn't display the availability bar if the reward is not redeemable
        Given a user with a non credit reward
        When they view the rewards table
        Then they see the name of the reward
        But they do not see the availablity bar