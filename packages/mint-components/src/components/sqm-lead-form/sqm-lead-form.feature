@author:sam
@owner:sam
Feature: Lead Form

    @motivating
    Scenario: Users can fill out a lead form
        Given a user viewing the lead form
        And they enter the first name "Bob"
        And they enter the last name "Testerson"
        And they provide the email "bobtesterson@example.com"
        When they click "Submit"
        Then the button enters a loading state
        And the lead is submitted to the form
        And a success banner is shown

    @motivating
    Scenario: User's must provide a first name, last name, and email to submit the lead form
        Given a user viewing the lead form
        And do not enter all of the following fields
            | First Name |
            | Last Name  |
            | Email      |
        When they click "Submit"
        Then the registration does not occur
        And the missing fields are highlighted with a validation error

    @minutia
    Scenario: Users are notified if submission fails
        Given a user viewing the lead form
        And they enter the first name "Bob"
        And they enter the last name "Testerson"
        And they provide a valid email "bobtesterson@example.com"
        When they click "Submit"
        Then the button enters a loading state
        When the submission fails
        Then an error banner is shown

    @minutia
    Scenario: A user can enter another lead after a successful submission
        Given a user viewing the lead form
        And they enter the first name "Bob"
        And they enter the last name "Testerson"
        And they provide the email "bobtesterson@example.com"
        When they click "Submit"
        Then the success banner is shown
        When they click "Refer another Friend"
        Then the lead form is reset
        And they can enter another lead

    @motivating
    Scenario: Additional fields can be slotted into the lead form
        Given a user viewing the lead form
        And the lead form contains the following html
            """
            <sqm-lead-form>
            <sqm-lead-input-field
            field-name="customInput"
            field-label="Custom Input" />
            <sqm-lead-dropdown-field
            dropdown-name="customDropdown"
            dropdown-label="Custom Dropdown">
            <sl-menu-item value="test">Test</sl-menu-item>
            </sqm-lead-dropdown-field>
            </sqm-lead-form>
            """
        And they enter a value for "Custom Input"
        And they select the value "Test" from the dropdown
        When they click "Submit"
        Then the button enters a loading state
        And the lead is submitted to the form
        And the additional fields are recorded in the form submission

    @minutia
    Scenario: Additional fields are validated for required values
        Given a user viewing the lead form
        And the lead form contains the following html
            """
            <sqm-lead-form>
            <sqm-lead-input-field
            field-name="customInput1"
            field-label="Custom Input 1" />
            <sqm-lead-input-field
            field-name="customInput2"
            field-label="Custom Input 2"
            field-optional="true"
            />
            <sqm-lead-dropdown-field
            dropdown-name="customDropdown"
            dropdown-label="Custom Dropdown">
            <sl-menu-item value="test">Test</sl-menu-item>
            </sqm-lead-dropdown-field>
            </sqm-lead-form>
            """
        And they do not enter a value for "Custom Input 1"
        And they enter the custom input "Custom Value 2"
        And they select the custom dropdown "Test"
        When they click "Submit"
        Then the button enters a loading state
        Then they see the "Custom Input 1" field is outlined in red
        And they see error text below the "Custom Input 1" field
        And the form is not submitted