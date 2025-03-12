@author:derek @owner:ian
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

  @minutia
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
    Given the registration component <mayHaveProp> "disable-password-validation" with <value>
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
  Scenario Outline: Registration form initialData is loaded into formState
    Given a registration form "microsite-registration" is configured
    And there is a <slottedComponent> slotted with <fieldName>
    And the registration form has the initialData <initialData>
    When the registration form loads
    Then the email field and <slottedComponent> are prefilled with <initialData>

    Examples:
      | slottedComponent   | fieldName           | initialData                                                                      |
      | sqm-name-fields    | firstName, lastName | { "email": "test@example.com" , "firstName": "Test", "lastName": "Testerson"}    |
      | sqm-password-field | password            | { "email": "test@example.com" , "password": "Test1234", "lastName": "Testerson"} |
      | sqm-input-field    | testInput           | { "email": "test@example.com" , "testInput": "Test"}                             |
      | sqm-checkbox-field | testCheckbox        | { "email": "test@example.com" , "testCheckbox": true}                            |
      | sqm-dropdown-field | testDropdown        | { "email": "test@example.com" , "testDropdown": "Test"}                          |

  @motivating
  Scenario: Blocked emails are shown an error
    Given a registration form "microsite-registration" is configured
    And "0-mail.com" is a blocked email domain
    And the email field has been filled out to "test@0-mail.com"
    When the registration form is submitted
    Then the email field shows the error "Must be a valid email address"

  @motivating
  Scenario Outline: Invalid emails are shown an error
    Given a registration form "microsite-registration" is configured
    And the email field has been filled out to <invalidEmail>
    When the registration form is submitted
    Then the email field shows the error "Must be a valid email address"

    Examples:
      | invalidEmail    |
      | test            |
      | test@           |
      | test@google.con |

  @motivating
  Scenario Outline: Slotted content displays validation states through form context
    Given a user viewing the registration form component
    And the registration form component has <slottedContent>
    And it is required
    When the form is submitted
    Then they see the <slottedField> is outlined in red
    And they see the error text below the <slottedField>

    Examples:
      | slottedContent     | slottedField    |
      | N/A                | email           |
      | N/A                | password        |
      | sqm-name-fields    | First Name      |
      | sqm-name-fields    | Last Name       |
      | sqm-input-field    | Custom Input    |
      | sqm-checkbox-field | Custom Checkbox |
      | sqm-dropdown-field | Custom Dropdown |
      | sqm-password-field | Custom Password |

  @motivating
  Scenario Outline: Slotted content fields are disable during submission through form context
    Given a user viewing the registration form component
    And the registration form component has <slottedContent>
    When the form is submitted
    Then they see the <slottedField> is disabled during submission

    Examples:
      | slottedContent     | slottedField    |
      | N/A                | email           |
      | N/A                | password        |
      | sqm-name-fields    | First Name      |
      | sqm-name-fields    | Last Name       |
      | sqm-input-field    | Custom Input    |
      | sqm-checkbox-field | Custom Checkbox |
      | sqm-dropdown-field | Custom Dropdown |
      | sqm-password-field | Custom Password |

  @motivating
  Scenario Outline: Slotted content fields are disabled if registration form is disabled
    Given a user viewing the registration form component
    And the registration form is disabled
    And the registration form component has <slottedContent>
    Then they see the <slottedField> is disabled on load

    Examples:
      | slottedContent     | slottedField    |
      | N/A                | email           |
      | N/A                | password        |
      | sqm-name-fields    | First Name      |
      | sqm-name-fields    | Last Name       |
      | sqm-input-field    | Custom Input    |
      | sqm-checkbox-field | Custom Checkbox |
      | sqm-dropdown-field | Custom Dropdown |
      | sqm-password-field | Custom Password |

  @motivating
  Scenario Outline: The registration form can be disabled by form protection
    Given a user viewing the registration form component
    And the registration form protection returns <return>
    Then they <maySee> an error banner at the top of the form with <text>
    And they <maySee> that the form inputs are disabled

    Examples:
      | return | maySee    | text                                         |
      | false  | see       | The registration form is currently disabled. |
      | "test" | see       | "test"                                       |
      | true   | don't see |                                              |

  @motivating
  Scenario: The Registration form key maps to a SaaSquatch form and makes a submission
    Given a SaaSquatch registration form with key "microsite-registration"
    And the registration component has prop "form-key" with value "microsite-registration"
    When a user submits the registration form
    Then a "microsite-registration" form submission is recorded in SaaSquatch
    And all form fields are recorded in the submission expect for the password
