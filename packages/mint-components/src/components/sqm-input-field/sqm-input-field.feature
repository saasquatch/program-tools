@author:derek
@owner:derek
Feature: Form Input Field

    This componenent is used as a custom registration field during registration. The field can be text, a number, 
    date or phone number. A motivating use case is to ask for a users company name, this value would then be mapped 
    through the Managed Identity Service and upserted on the user after registration.

    Background: A user exists and is viewing the hosted portal registration
        Given a user is viewing "/register"

    @motivating
    Scenario: Input fields are required by default
        Given an input field inside of a "sqm-portal-register" component
        And the user has filled out all standard registration fields
        But the custom input field is empty
        When the user tries to register
        Then the custom input field is highlighted in red
        And the error message "Cannot be empty" appears below

    @motivating
    Scenario: Input field labels are configurable
        Given an input field inside of a "sqm-portal-register" component
        And it has prop "field-label" with value "My Custom Input"
        When the user views the registration form
        Then they see the label "My Custom Input" above the input field

    @motivating
    Scenario: Input fields can be optional
        Given the register form has the following html
            """
            <sqm-portal-register>
            <sqm-name-fields slot="formData"></sqm-name-fields>
            <sqm-input-field
            slot="formData"
            field-label="Company Name"
            field-name="companyName"
            field-required="false"
            />
            </sqm-portal-register>
            """
        And the company name input is empty
        When the user tries to register
        Then there is no error for the company name input

    @minutae
    Scenario Outline: Validation error message is configurable
        Given an input field inside of a "sqm-portal-register" component
        And the input field is required
        And the input field has prop "error-message" with <propValue>
        When the user tries to register
        But they havent filled in the input field
        Then they see <errorMessage> below
        Examples:
            | propValue         | errorMessage      |
            |                   | Cannot be empty   |
            | My Custom Message | My Custom Message |

    @motivating
    Scenario: The form field name attribute is configurable
        Given an input field inside of a "sqm-portal-register" component
        And the input field has prop "field-name" with value "myCustomField"
        When the user adds a value to the input field
        And they register
        Then the value of the input field is submitted under "myCustomField" field
        And it is of type 'string'

    @motivating
    Scenario Outline: By default the input field is a text input
        Given an input field inside of a "sqm-portal-register" component
        And the input field <mayHave> prop "field-type" with <value>
        When the user views the input field
        Then it is a text input
        Examples:
            | mayHave      | value |
            | has          | text  |
            | doesn't have |       |

    @motivating
    Scenario: The input field can be a number input
        Given an input field inside of a "sqm-portal-register" component
        And the input field has prop "field-type" "number"
        When the user views the input field
        And the hover over
        Then they see up and down arrows on the right hand side
        When they click the up arrow
        Then the number in the input field increments
        When they click the down arrow
        Then the number in the input field decrements
        When they click the input
        And try to enter text characters
        Then nothing happens
        When they click the input field
        And try to enter number characters
        Then they are added in the input

    @motivating
    Scenario: The input field can provide a date picker
        Given an input field inside of a "sqm-portal-register" component
        And the input field has prop "field-type" "date"
        When the user views the input field
        Then they see "mm/dd/yyyy" as a placeholder
        And they see a calender icon on the right
        When they start typing a date
        Then it maintains the "mm/dd/yyyy" format
        When they click the calendar icon
        Then a dropdown appears
        And they see a calendar
        When they select a date
        Then it is applied to the input

    @motivating
    Scenario: The input field can format telephone numbers
        Given an input field inside of a "sqm-portal-register" component
        And the input field has prop "field-type" "tel"
        When the user views the input field
        And they start typing in a phone number
        Then it is formatted into the following form "(XXX) XXX-XXXX"
        When they start their phone number with a "1"
        And add their 10 character phone number
        Then it is formatted into the following form "1 (XXX) XXX-XXXX"

    @landmine
    Scenario: Telephone formating is removed after 10 numbers
        Given a user viewing a telephone type input field
        And they entered their 10 character phone number
        And it was not prefixed with a 1
        When they add another character
        Then the formatting is removed

    @landmine
    Scenario: Number type inputs are recorded in the form data as a string
        Given an input field inside of a "sqm-portal-register" component
        And the input field has prop "field-type" "number"
        When the user views the input field
        And they input 12
        And they submit the form
        Then the input value 12 is recorded in the form data as a string