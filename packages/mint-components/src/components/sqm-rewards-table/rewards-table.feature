@owner:sam
@author:sam
Feature: Rewards Table

    Shows a list of rewards as a table

    @motivating
    @ui
    Scenario: The empty state is shown if there are no rewards
        Given a user with rewards
        When they view the reward table
        Then no rewards are displayed
        And they see an image with a user icon
        And "View your rewards" in bold
        And "See all the rewards you have earned from referring friends and completing tasks" below the bolded text
        And the pagination buttons are disabled

    @minutae
    @ui
    Scenario: A custom empty state can be provided
        Given a user with no rewards
        And a custom empty state has been supplied in the "empty" slot
        When they view the reward table
        Then they see the custom empty state

    @minutae
    @ui
    Scenario: The loading state is shown while rewards are loading
        Given the table is loading
        Then the loading state is shown in the table
        And a custom loading state can be supplied in the "loading" slot
        And the pagination buttons are disabled

    @motivating
    @ui
    Scenario Outline: The table becomes paginated when the number of rewards exceeds the per page limit
        Given the user has <number of rewards>
        And the table is configured to show <page limit> rewards per page
        Then the table will have <number of pages> page(s)
        And pagination buttons will allow users to navigate between pages
        And the pagination button to go to the next page is disabled on the last page of rewards
        And the pagination button to go to the previous page is disabled on the first page of rewards
        Examples:
            | number of rewards | page limit | number of pages |
            | 0                 | 4          | 1               |
            | 1                 | 4          | 1               |
            | 3                 | 4          | 1               |
            | 5                 | 4          | 2               |
            | 42                | 4          | 11              |

    @motivating
    @ui
    Scenario: The table converts to a card view on tablet and mobile window sizes
        Given a user with rewards
        When they view the table
        And their window size is smaller than "899px"
        Then rewards are displayed as cards
        And they are in two columns
        When their window size is smaller than "634px"
        Then the rewards are displayed as cards in a singular column

    @motivating
    @ui
    Scenario: Table and Mobile beakpoints can be configured
        Given the reward table has been configured with the following props
            | prop         | value |
            | smBreakpoint | 599   |
            | mdBreakpoint | 799   |
        And a user with rewards
        When they view the table
        And their window size is smaller than "799px"
        Then rewards are displayed as cards
        And they are in two columns
        When their window size is smaller than "599px"
        Then the rewards are displayed as cards in a singular column

    @motivating
    @ui
    Scenario Outline: By default the first column heading is hidden in mobile
        Given a reward table with 4 columns
        And prop "hidden-columns" with <hideColumnValue>
        And a user with rewards
        When they view the reward table
        And their window size is below the tablet breakpoint
        Then reward cards are displayed
        And the titles of <columnsArehidden> within the card
        Examples:
            | hideColumnValue | columnsArehidden                    |
            |                 | the first column                    |
            | 0,1,2           | the first, second and third columns |
            | 3               | the fourth column                   |

    @motivating
    Scenario: Only rewards which occured in the program specific by "program-id" are shown
        Given the table is configured with "program-id"
        Then only rewards from the program with "program-id" are shown

    @landmine
    Scenario: Classic program rewards can't be filtered for
        There is no easy way for the backend to filter for "classic" programs,
        since it only allows filtering my "programId: null"
        and that returns manual rewards and reward exchanges

        Given the "program-id" of the table is set to "classic"
        Then there is an error shown

    @minutae
    @ui
    Scenario: Column heading can be hidden
        Given the table is configured with "show-labels" set to false
        Then the table is displayed without column headings