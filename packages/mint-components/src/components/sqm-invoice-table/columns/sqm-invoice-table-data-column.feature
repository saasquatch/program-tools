@author:derek
@owner:derek
Feature: Invoice Table Date Column

    Shows the invoice of each invoice

    Background:
        Given the date column is included in the invoice table

    @motivating
    @ui
    Scenario Outline: The title of the date column is configurable
        Given the "column-title" prop is set to <value>
        Then the date column is shown with <columnTitle>
        Examples:
            | value        | columnTitle  |
            | Date created | Date created |

    @motivating
    Scenario: The data shown in the column is configurable by prop
        Given the column has a <property> set
        Then that property is pulled from the table data object and displayed in the table column