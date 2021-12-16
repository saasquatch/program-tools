Feature: Portal Container


    Scenario: Horizontal content overflows, but does not stretch

        Bad elements should not affect other elements in the page

        Given there are two element in the container
        And the first is small
        And the second would stretch the container wider than it's parent
        Then the second one is clipped
        And the first one doesn't stretch

    @landmine
    Scenario: `max-width` is required for displaying as a row
        Given I have `direction` to "row"
        And I have not set a `max-width`
        Then it will display as a column
