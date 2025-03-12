@owner:zach
@author:zach
Feature: Marketing Emails Checkbox

    A checkbox that is used to opt in for marketing emails.

    Background: A user is on the portal registration page
        Given a user is viewing the "/register"
        And "/register" contains the registration form
        And the registration form has the following fields
            | fields                    |
            | first name                |
            | last name                 |
            | email                     |
            | password                  |
            | Marketing Emails Checkbox |

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