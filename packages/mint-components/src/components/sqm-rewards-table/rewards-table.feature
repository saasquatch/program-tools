@owner:sam
@author:sam
Feature: Rewards Table

    Shows a list of rewards as a table

    Scenario: The empty state is shown if there are no rewards
        Given the current user has no rewards
        Then the empty state is shown in the table
        And a custom empty state can be supplied in the "empty" slot
        And the pagination buttons are disabled

    Scenario: The loading state is shown while rewards are loading
        Given the table is loading
        Then the loading state is shown in the table
        And a custom loading state can be supplied in the "loading" slot
        And the pagination buttons are disabled

    Scenario Outline: The table becomes paginated when the number of rewards exceeds the per page limit
        Given the user has <number of rewards>
        And the table is configured to show <page limit> rewardsreferrals per page
        Then the table will have <number of pages> page(s)
        And pagination buttons will allow users to navigate between pages
        And the pagination button to go to the next page is disabled on the last page of rewards
        And the pagination button to go to the previous page is disabled on the first page of rewards
        Examples:
            | number of rewards | page limit | number of pages |
            | 0                 | 3          | 1               |
            | 1                 | 3          | 1               |
            | 3                 | 3          | 1               |
            | 5                 | 3          | 2               |
            | 42                | 3          | 14              |

    Scenario: The use who referred the current user can be shown in the table
        Given the table is configured with <showReferrer> set to true
        And the current user was referrered by <referrer>
        Then the first table row on the first page of the table is for <referrer>

    Scenario: Only rewards which occured in the program specific by <programId> are shown
        Given the table is configured with <programId>
        Then only referrals from the program with <programId> are shown

    @landmine
    Scenario: Classic program rewards can't be filtered for
        There is no easy way for the backend to filter for "classic" programs,
        since it only allows filtering my "programId: null"
        and that returns manual rewards and reward exchanges

        Given the <programId> of the table is set to "classic"
        Then there is an error shown

    Scenario: Column heading can be hidden
        Given the table is configured with <showLabels> set to false
        Then the table is displayed without column headings