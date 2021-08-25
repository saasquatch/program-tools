@owner:sam
@author:sam
Feature: Referral Table

    Shows a list of referrals as a table

    Scenario: The empty state is shown if there are no referrals
        Given the current user has no referrals
        Then the empty state is shown in the table
        And a custom empty state can be supplied in the "empty" slot
        And the pagination buttons are disabled

    Scenario: The loading state is shown while referrals are loading
        Given the table is loading
        Then the loading state is shown in the table
        And a custom loading state can be supplied in the "loading" slot
        And the pagination buttons are disabled

    Scenario Outline: The table becomes paginated when the number of referrals exceeds the per page limit
        Given the user has <number of referrals>
        And the table is configured to show <page limit> referrals per page
        Then the table will have <number of pages> page(s)
        And pagination buttons will allow users to navigate between pages
        And the pagination button to go to the next page is disabled on the last page of referrals
        And the pagination button to go to the previous page is disabled on the first page of referrals
        Examples:
            | number of referrals | page limit | number of pages |
            | 0                   | 3          | 1               |
            | 1                   | 3          | 1               |
            | 3                   | 3          | 1               |
            | 5                   | 3          | 2               |
            | 42                  | 3          | 14              |

    Scenario: The use who referred the current user can be shown in the table
        Given the table is configured with <showReferrer> set to true
        And the current user was referrered by <referrer>
        Then the first table row on the first page of the table is for <referrer>

    Scenario: Only referrals which occured in the program specific by <programId> are shown
        Given the table is configured with <programId>
        Then only referrals from the program with <programId> are shown

    Scenario: Classic program shows only classic referrals
        Given the <programId> of the table is set to "classic"
        Then only classic referrals are shown in the table

    Scenario: Column heading can be hidden
        Given the table is configured with <showLabels> set to false
        Then the table is displayed without column headings