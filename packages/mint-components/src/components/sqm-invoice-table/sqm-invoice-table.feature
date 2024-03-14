@author:noah
@owner:noah
Feature: Invoice Table

    Shows a list of invoices for the current user

    Background:
        Given the user is logged in
        And the microsite has been configured to show the invoices table

    @minutia
    Scenario: If there are no invoices an empty state is shown
        Given the current user has no invoices
        Then an empty state image is shown in place of the table
        And below the image some text explaining the invoice table is shown

    @minutia
    Scenario: A loading state is displayed while the table is loading
        Given the invoice table is loading
        Then a loading skeleton is shown

    @motivating
    Scenario: The table shows data about the user's invoices
        Given the current user has invoice(s)
        Then the invoices are shown in the table, one per row
        And the data shown is dependent on which columns are configured
        And there exists the possibility the user can download each invoice (given the download column is included)

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
