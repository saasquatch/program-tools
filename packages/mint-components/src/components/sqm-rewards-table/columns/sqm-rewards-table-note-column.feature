@author:derek
@owner:zach
Feature: Reward Table Customer Note Column

    @motivating
    Scenario Outline: The title of the note column is configurable
        Given the "column-title" prop is set to <value>
        Then the note column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | Note            |                 |
            | My column title | My column title |

    @motivating
    Scenario: Reward meta messages are shown in the column
        Given a user with a reward
        And that reward has a message
        When they view the rewards table
        Then they see the reward message in the note column