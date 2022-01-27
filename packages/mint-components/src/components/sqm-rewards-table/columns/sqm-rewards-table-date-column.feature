@author:derek
@owner:derek
Feature: Reward Table Date Column

    Shows the date of each reward

    Background:
        Given the date column is included in the reward table

    @motivating
    Scenario Outline: The title of the date column is configurable
        Given the "column-title" prop is set to <value>
        Then the date column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | Date received   |                 |
            | My column title | My column title |

    @motivating
    Scenario Outline: A configurable date associated with the reward is shown for each reward
        Given the "date-shown" prop is set to <dateType>
        And a user with rewards
        When they view the date column
        Then for each reward the <rewardDate> is shown in the table
        And the date is localized to the users locale
        Examples:
            | dateType         | rewardDate         |
            | dateGiven        | date given         |
            | dateExpires      | date expires       |
            | dateCancelled    | date cancelled     |
            | dateRedeemed     | date redeemed      |
            | dateScheduledFor | date scheduled for |
            |                  | date given         |