@author:derek
@owner:derek
Feature: Form Input Field

    This componenent is used as a custom registration field during registration. A motivating use case
    is to ask for a users company name, this calue could then be mapped through the Managed Identity Service
    and upserted on the user after registration.

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
        And it has prop "label" with value "My Custom Input"
        When the user views the registration form
        Then they see label "My Custom Input" above the input field

    @motivating
    Scenario: Input fields can be optional
        Given the register form has the following html
            """
            <sqm-portal-register>
            <sqm-name-fields slot="formData"></sqm-name-fields>
            <sqm-input-field
            slot="formData"
            label="Company Name"
            field-name="companyName"
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