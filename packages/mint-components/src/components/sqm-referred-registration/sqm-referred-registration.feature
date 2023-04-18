@author:truman
Feature: Instant access referred registration


    @motivating
    Scenario: User's must provide an email to register
        Given a user is trying to register as a referrer
        When they do not provide an email
        And they submit the form
        Then an error appears telling the user to provide their email
        When they provide an email
        And they submit the form
        Then they are brought to the

    @motivating
    Scenario: Users are notified if registration fails
        Given a user is trying to register
        And they have included their email
        When an error occurs with the registration
        Then an alert banner appears letting the user know about the error

    @ui
    Scenario: Slotted content can be included
        Given a user a viewing the follow component HTML
            """
            <sqm-referred-registration>
            <div slot='top-slot'>
            top slot
            </div>
            <div slot='bottom-slot'>
            bottom slot
            </div>
            </sqm-referred-registration>
            """
        Then the top slot is above the form inputs
        And the bottom slot is below the form inputs

    @ui
    Scenario: First name and last name input fields can be hidden
        Given a user is editing the instant access registration component
        Then they see an option labeled "Include name fields"
        When they toggle the option
        Then the first name and last name input field visibility is toggled

    @ui
    Scenario: Input labels can be customized
        Given a user is editing the instant access registration component
        Then they see an option labeled "Include name fields"

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