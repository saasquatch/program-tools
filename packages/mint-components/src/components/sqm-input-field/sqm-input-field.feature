@author:derek
@owner:derek
Feature: Form Input Field

    This component is used as a custom registration field during registration. The field can be text, a number,
    date or phone number. A motivating use case is to ask for a users company name, this value would then be mapped
    through the Managed Identity Service and upserted on the user after registration.

    Background: A user exists and is viewing the hosted portal registration
        Given a user is viewing "/register"
        And "/register" contains the registration form
        And the registration form has a custom input field

    @motivating
    Scenario Outline: Input fields are required by default but can be optional
        Given the input has prop "field-required" with <value>
        And the input is empty
        When the user tries to register
        Then the input <mayBe> highlighted in red
        And an error message <mayAppear> in red below
        And form submission <mayBe> blocked
        Examples:
            | value | mayBe | mayAppear      |
            | true  | is    | appears        |
            |       | is    | appears        |
            | false | isn't | doesn't appear |

    @motivating
    Scenario: Input field labels are configurable
        Given the input has prop "field-label" with value "My Custom Input"
        When the user views the registration form
        Then they see the input field
        And it has label "My Custom Input" above the input

    @minutae
    Scenario Outline: The validation error message is configurable
        Given the input is required
        And it has prop "error-message" with <value>
        When the user tries to register
        But they haven't filled in the input
        Then they see <errorMessage> below
        Examples:
            | value             | errorMessage      |
            |                   | Cannot be empty   |
            | My Custom Message | My Custom Message |

    @motivating
    Scenario: Form data attribute name is configurable
        Given the input has prop "field-name" with value "myCustomField"
        When the user types "testing testing" into the input
        And they register
        Then "testing testing" is submitted under "myCustomField" in the form data

    @motivating
    Scenario Outline: The input field is a text input by default
        Given the input <mayHave> prop "field-type" with <value>
        When the user views the input field
        Then it is a text input
        Examples:
            | mayHave      | value |
            | has          | text  |
            | doesn't have |       |

    @motivating
    Scenario: Date type inputs are supported
        Given the input has prop "field-type" "date"
        When the user views the input field
        Then they see "mm/dd/yyyy" as a placeholder
        And they see a calendar icon on the right
        When they start typing a date
        Then it maintains the "mm/dd/yyyy" format
        When they click the calendar icon
        Then a dropdown appears
        And they see a calendar
        When they select a date
        Then it is applied to the input

    @motivating
    Scenario: Phone number type inputs are supported
        Given the input has prop "field-type" with value "tel"
        When the user starts typing a phone number in the input
        Then it is formatted into the following form "(XXX) XXX-XXXX"
        When they pre-fix their phone number with a "1"
        Then it is formatted into the following form "1 (XXX) XXX-XXXX"

    @landmine
    Scenario: Telephone formatting is removed after 10 numbers
        Given a user using a phone number input field
        And they entered their 10 character phone number
        And it was not prefixed with a 1
        When they add another character
        Then the formatting is removed

    @landmine
    Scenario Outline: Input values are always recorded as strings in the form data
        Given the input has prop "field-type" with <value>
        And it has a "field-name"
        When the user inputs <formInput>
        And they register
        Then <formData> is recorded in the form data as a string
        Examples:
            | value  | formInput      | formData       |
            | text   | Hello there    | Hello there    |
            | date   | 05/07/2021     | 2021-05-07     |
            | tel    | (250) 234-9877 | (250) 234-9877 |

    @landmine
    Scenario: Input fields without field names appear under "/undefined" in the form data
        Given the input does not have prop "field-name"
        When the users enters a value in the input
        And they register
        Then the value of the input is recorded under "/undefined" in the form data