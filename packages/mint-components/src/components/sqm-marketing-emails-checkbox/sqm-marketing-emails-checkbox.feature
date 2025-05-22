@owner:zach
@author:zach
Feature: Marketing Emails Checkbox

    A checkbox that is used to opt in for marketing emails.

    Background: The microsite registration form contains a marketing emails checkbox

        Scenario: The registration form can be configured to include a marketing emails checkbox
            Given a user is viewing the "/register"
            And "/register" contains the registration form
            And they have added a marketing emails checkbox to the form in the content editor
            Then the registration form has the following fields
                | fields                    |
                | first name                |
                | last name                 |
                | email                     |
                | password                  |
                | Marketing Emails Checkbox |


        Scenario: The user can opt in to marketing emails
            Given the user is filling out the registration form
            And the fields have valid input
            And the marketing emails checkbox is checked
            When they try to register
            Then the form is submitted
            And there are no errors
            And the "marketingEmailOptIn" value is set to true
            And the user is opted in to marketing emails


        @motivating
        Scenario: Checkbox is optional by default
            Given the user is filling out the registration form
            And the name fields have valid input
            And the email field has valid input
            And the password field has valid input
            And the checkbox is not checked
            When they try to register
            Then the form is submitted
            And there is no error for the checkbox

        Scenario: The form field name is provided by default
            Given the customer has added a marketing emails checkbox to their registration form
            Then the field name is automatically set to "marketingEmailOptIn"
            And the name is not configurable