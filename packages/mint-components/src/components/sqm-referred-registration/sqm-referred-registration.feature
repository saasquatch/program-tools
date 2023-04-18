@author:truman
Feature: Instant access referred registration

    @motivating
    Scenario: User's must provide an email to register

    @motivating
    Scenario: Users are notified if registration fails

    @motivating
    Scenario Outline: A user cannot register with an email linked to an existing account

    @ui
    Scenario: Slotted content can be included

    @ui
    Scenario: First name and last name input fields can be hidden

    @ui
    Scenario: Input labels can be customized

    @ui
    Scenario Outline: Container border can be toggled
        Given a user is viewing the registration component
        And the prop "remove-border" has <value>
        Then the registration component <maybe> includes a border
        Examples:
            | value | maybe    |
            | true  | does     |
            | false | does not |

    @motivating
    @ui
    Scenario: Component background color can be customized
        Given a user is viewing the registration component
        And the prop "background-color" has <value>
        Then the background has color <backgroundColor>
        Examples:
            | value                 | backgroundColor                     |
            | empty (default value) | var(--sl-color-neutral-0) (#ffffff) |
            | aquamarine            | #7fffd4                             |

    @motivating
    @ui
    Scenario Outline: Container padding can be customized
        Given prop "padding" has <value>
        Then <padding> is applied to content

        Examples:
            | value      | padding    |
            | none       | no padding |
            | xxx-small  | xxx-small  |
            | xx-small   | xx-small   |
            | x-small    | x-small    |
            | small      | small      |
            | medium     | medium     |
            | large      | large      |
            | x-large    | x-large    |
            | xx-large   | xx-large   |
            | xxx-large  | xxx-large  |
            | xxxx-large | xxxx-large |
            | N/A        | no padding |