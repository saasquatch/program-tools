@author:derek
@owner:derek
Feature: Header Logo

    @motivating
    Scenario: The header logo component displays an image with a set height
        Given a header logo component with the following props
            | prop      |
            | image-url |
            | height    |
        When a user views the component
        Then they see their header logo with their set height

    @motivating
    Scenario: Users are redirected when they click on the header logo
        Given a header logo component
        And it <mayHave> prop with <value>
        When a user clicks on the Logo
        Then they are redirected to <redirectPath>
        Examples:
            | mayHave      | value | redirectPath |
            | has          | /test | /test        |
            | doesn't have |       | /            |
