@author:derek
@owner:derek
Feature: Invoice Table Date Column

    Provides a download link to each invoice

    Background:
        Given the download column is included in the invoice table

    @motivating
    @ui
    Scenario Outline: The column title is configurable
        Given the "column-title" prop is set to <value>
        Then the date column is shown with <columnTitle>
        Examples:
            | value           | columnTitle     |
            | <null>          | <empty>         |
            | My column title | My column title |

    @motivating
    Scenario: A download link is provided for each invoice
        Given there is at least one invoice
        Then a download icon is shown
        When the user clicks the icon
        Then the browser downloads the invoice
        And the user remains on the same page