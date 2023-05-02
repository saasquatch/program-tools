@author:truman
Feature: Instant access referrer registration

    @motivating
    Scenario Outline: Form has content validation for email input
        Given a user is trying to register as a referrer
        When they <error action>
        And they submit the form
        Then an error tells the user <message>
            Examples
            | error action            | message                    |
            | do not provide an email | that email cannot be empty |
            | give an invalid email   | the email is invalid       |

    @motivating
    Scenario: Name fields are not required when included
        Given a user is viewing the registration component
        When the "Include name fields" option is set to "true"
        Then the inputs for the first and last name fields are not required
        And the user can submit the form

    @motivating
    Scenario: Users are notified if registration fails
        Given a user is trying to register
        And they have included their valid email address
        When an error occurs with the registration
        Then an alert banner appears letting the user know about the error

    @motivating
    Scenario: Successful registration upserts a user
        Given a user has entered a valid email
        And they submit the form
        Then the input is disabled
        And the button is in a loading state
        When the submission is successful
        Then a new user has been upserted to SaaSquatch

    @ui
    Scenario: Slotted content can be included
        Given a user a viewing the follow component HTML
            """
            <sqm-referred-registration>
            <div slot='top'>
            top slot
            </div>
            <div slot='bottom'>
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
        And the default is set to "false"
        When they toggle the option
        Then the first name and last name input field visibility is toggled

    @ui
    Scenario: Input labels can be customized
        Given a user is editing the instant access registration component
        Then they see an option labeled "Include name fields"
        And the default value is "false"
        And the user also sees options for "First name field label" and "Last name field label"
        And the defaults are "First Name" and "Last name"

    @ui
    Scenario Outline: Container border can be toggled
        Given a user is viewing the registration component
        Then the default value for the prop "include-border" is "true"
        When "include-border" has <value>
        Then the registration component's border <maybe> included
        Examples:
            | value            | maybe |
            | true             | is    |
            | false            | isn't |
            | empty (no value) | is    |

    @motivating
    @ui
    Scenario Outline: Component background color can be customized
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
        Given a user is looking at the component
        Then the default values for "padding-top", "padding-bottom", "padding-left", "padding-right" is "large"
        When prop "padding-top" has <value>
        Then <padding> is applied to content
        And the same applies to "padding-bottom", "padding-left", "padding-right"

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