@author:sam
@owner:sam
Feature: Invoice Table

    Shows a table of all invoices for the participant

    Background:
        Given the participant has configured their payment details

    @motivating

    Scenario Outline: Invoices for the user are displayed
        Given the participant has invoices available
        When the invoices are loading
        Then a loading table skeleton is shown
        When the invoices request finishes
        Then <columns> are shown
        And a download button is shown for each invoice
        Examples:
            | columns            |
            | Date               |
            | Invoice            |
            | Earnings           |
            | Taxed Amount       |
            | Earnings after tax |


