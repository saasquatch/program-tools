@author:derek
@owner:ian
Feature: Portal Register

    @motivating
    Scenario: Users can register for the portal
        Given a user who wants to register
        And they provide the email "bobTesterson@example.com"
        And a password
        And they confirm their password
        When they click "Register"
        Then the button enters a loading state
        And a ssqt user is upserted
        And a managed identity is created
        And a verification email is sent
        And the user is redirect to verify their email

    @motivating
    Scenario: User's must provide an email and password to register
        Given a user who wants to register
        And do not enter all of the following fields
            | Email            |
            | Password         |
            | confirm Password |
        When they click "Register"
        Then the registration does not occur
        And the missing field is highlighted with a validation error

    @motivating
    Scenario: Users are notified if registration fails
        And a user who wants to register
        And they provide a valid email "bobTesterson@example.com"
        And a password
        And they confirm their password
        When they click "Register"
        Then the button enters a loading state
        When the registration fails
        Then an error banner is shown

    @motivating
    Scenario Outline: A user cannot register with an email linked to an existing account
        Given a user has already registered a managed identity with email "bobTesterson@example.com"
        When another user tries to register with <email>
        Then a validation error occurs
        And a new user with <email> is not be registered
        Examples:
            | email                    |
            | bobTesterson@example.com |
            | bobtesterson@example.com |
            | BOBTESTERSON@example.com |

    @motivating
    Scenario: Users are redirected to "/" after registration by default
        Given the component does not have prop "nextPage"
        And a user has entered their registration information
        When they click "Register"
        Then a verification email is sent to their email
        And they are redirected to "/"

    @motivating
    Scenario: Custom redirection can be configured
        Given the component has prop "nextPage" with value "/verify"
        And a user has entered their registration information
        When they click "Register"
        Then a verification email is sent to their email
        And they are redirected to "/verify"

    @minutae
    Scenario Outline: Navigation back to the login page can be customized but defaults to "/login"
        Given a user viewing the register component
        And the component <mayHave> "login-path" with <value>
        Then they see a "Sign In" text button
        When they click "Sign In"
        Then they are redirected to <redirectPath>
        Examples:
            | mayHave      | value   | redirectPath |
            | doesn't have | N/A     | /login       |
            | has          | /signin | /signin      |

    @motivating
    Scenario Outline: The verification email link can be configured to redirect users to a specific base path but defaults to "/verifyEmail"
        Given a user viewing the register component
        And the registration component <mayHave> "redirect-path" with <value>
        When they register
        And receive their email verification email
        And they click the link in the email
        Then they are redirected to <redirectPath>
        Examples:
            | mayHave      | value          | redirectPath   |
            | doesn't have | N/A            | /verifyEmail   |
            | has          | /verifyMyEmail | /verifyMyEmail |

    @ui
    Scenario: Slotted content can be included above the register button
        Given a user viewing the register component
        And the registration component contains the following html
            """
            <sqm-portal-register>
            <p slot="terms">
            By signing up you agree to the
            <a href="https://example.com" target="_blank">
            Terms and Conditions
            </a>
            </p>
            </sqm-portal-register>
            """
        Then the terms and conditions slotted content is shown above the register button
        And the link opens in a new tab

    @motivating
    Scenario Outline: Password Validation is enabled by default
        Given the registration component <mayHaveProp> "disable-validation" with <value>
        And a user viewing the registration component
        Then they <maySee> the password validation
        Examples:
            | mayHaveProp       | value | maySee    |
            | has prop          | true  | don't see |
            | has prop          | false | see       |
            | has prop          | test  | don't see |
            | has prop          |       | don't see |
            | doesn't have prop |       | see       |

    @motivating
    Scenario: Registration form initialData is loaded into formState
        Given a registration form "microsite-registration" is configured
        And the registration form has the initialData
            """
            {
                "firstName": "Test",
                "lastName": "Testerson",
                "email": "test.testerson@example.com"
            }
            """
        When the registration form loads
        Then the firstName, lastName, and email fields will be populated with the initialData values

    @motivating
    Scenario: The Registration form key maps to a SaaSquatch form and makes a submission
        Given a SaaSquatch registration form with key "microsite-registration"
        And the registration component has prop "form-key" with value "microsite-registration"
        When a user submits the registration form
        Then a "microsite-registration" form submission is recorded in SaaSquatch
        And all form fields are recorded in the submission expect for the password