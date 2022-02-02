@owner:sam
@author:sam
Feature: Referral Table

    The Referral table component shows users a list of their referrals. The referral table it's self can be customized
    with a collection of columns.

    @motivating
    Scenario: The empty state is shown if there are no referrals
        Given a user with no referrals
        When they view the referral table
        Then no referrals are displayed
        And they see an image with a user icon
        And "View your referral details" in bold
        And "Track the status of your referrals and rewards earned by referring friends" below the bolded text
        And the pagination buttons are disabled

    @motivating
    Scenario: The empty state image and text are customizable
        Given the referral table has been given the following prop values
            | prop                | value                                                                                                                           |
            | empty-state-img-url | https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png |
            | empty-state-title   | View your referral history                                                                                                      |
            | empty-state-text    | See your previous referrals and what you earned!                                                                                |
        And a user with no referrals
        When they view the referral table
        Then they see no referrals
        And they see the SaaSquatch logo
        And "View your referral history" in bold
        And "See your previous referrals and what you earned!" below the bolded text
        And the pagination buttons are disabled

    @minutae
    Scenario: A custom empty state can be provided
        Given a user with no referrals
        And a custom empty state has been supplied in the "empty" slot
        When they view the referral table
        Then they see the custom empty state
        And the pagination buttons are disabled

    @motivating
    Scenario: The loading state is shown while referrals are loading
        Given the table is loading
        Then the loading state is shown in the table
        And a custom loading state can be supplied in the "loading" slot
        And the pagination buttons are disabled

    @motivating
    Scenario Outline: The table becomes paginated when the number of referrals exceeds the per page limit
        Given the user has <number of referrals>
        And the table is configured to show <page limit> referrals per page
        Then the table will have <number of pages> page(s)
        And pagination buttons will allow users to navigate between pages
        And the pagination button to go to the next page is disabled on the last page of referrals
        And the pagination button to go to the previous page is disabled on the first page of referrals
        Examples:
            | number of referrals | page limit | number of pages |
            | 0                   | 4          | 1               |
            | 1                   | 4          | 1               |
            | 3                   | 4          | 1               |
            | 5                   | 4          | 2               |
            | 42                  | 4          | 11              |

    @motivating
    Scenario: The table converts to a card view on tablet and mobile window sizes
        Given a user with referrals
        When they view the table
        And their window size is smaller than "899px"
        Then referrals are displayed as cards
        And they are in two columns
        When their window size is smaller than "634px"
        Then the referrals are displayed as cards in a singular column

    @motivating
    Scenario: Table and Mobile beakpoints can be configured
        Given the referral table has been configured with the following props
            | prop         | value |
            | smBreakpoint | 599   |
            | mdBreakpoint | 799   |
        And a user with referrals
        When they view the table
        And their window size is smaller than "799px"
        Then referrals are displayed as cards
        And they are in two columns
        When their window size is smaller than "599px"
        Then the referrals are displayed as cards in a singular column

    @motivating
    Scenario Outline: By default the first column heading is hidden in mobile,
        Given a referral table with 4 columns
        And prop "hidden-columns" with <hideColumnValue>
        And a user with referrals
        When they view the referral table
        And their window size is below the tablet breakpoint
        Then referral cards are displayed
        And the titles of <columnsArehidden> within the card
        Examples:
            | hideColumnValue | columnsArehidden                    |
            |                 | the first column                    |
            | 0,1,2           | the first, second and third columns |
            | 3               | the fourth column                   |

    @motivating
    Scenario: The use who referred the current user can be shown in the table
        Given the table is configured with <showReferrer> set to true
        And the current user was referrered by <referrer>
        Then the first table row on the first page of the table is for <referrer>

    @motivating
    Scenario: Only referrals which occured in the program specific by program-id are shown
        Given the table is configured with "program-id"
        Then only referrals from the program with "program-id" are shown

    @motivating
    Scenario: Classic program shows only classic referrals
        Given the "program-id" of the table is set to "classic"
        Then only classic referrals are shown in the table

    @minutae
    Scenario: Column heading can be hidden
        Given the table is configured with "show-labels" set to false
        Then the table is displayed without column headings