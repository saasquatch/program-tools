@author:derek
@owner:derek
Feature: Invoice Table Date Column

    Shows the date of each reward

    Background:
        Given the date column is included in the reward table

    @motivating
    @ui
    Scenario Outline: The title of the date column is configurable
        Given the "column-title" prop is set to <value>
        Then the date column is shown with <columnTitle>
        Examples:
            | value        | columnTitle  |
            | Date created | Date created |

    @motivating
    Scenario: The formatted created date of the invoice is shown
        Given at least one invoice exists
        Then in that invoice's row the creation date is shown with the proper locale format