@author:andy @owner:andy
Feature: Microsite Google Registration Form

  Background: `sqm-google-portal-registration-form` is loaded on the page

  @motivating
  Scenario: Initial registration screen
    Given the user loads the page for the first time
    Then they see the base registration view
    And there is a title "Register"
    And there is an email input field
    And there is a "Register" button
    And there is a "Sign up with Google" Google SSO button
    And there is the text "Already have an account? Sign in"
    And the "Sign in" text is a link

  @minutia
  Scenario: Users can go to the login page
    Given a user viewing the initial registration form
    When they click the "Sign in" link
    Then they are brought to the correct login page

  @motivating
  Scenario: Manual registration can be done by clicking "Register"
    Given a user views the initial registration form
    And they enter a valid email
    When they click the "Register" button
    Then they are shown a second registration form with the following default fields
      | field     |
      | firstName |
      | lastName  |
      | email     |
      | password  |
    And these default fields are all required
    And the "email" field is prefilled with the email enterred from the first step
    And the "email" field is disabled
    When they fill out all default fields
    And click "Register"
    Then they must verify their email

  @motivating
  Scenario: Manual registration requires a valid email to continue
    Given a user views the initial registration form
    And they enter an invalid email
    When they click the "Register" button
    Then an error banner is shown above the email field

  @minutia
  Scenario: Manual registration has field validation
    Given a user entered an email in the initial registration form
    And clicked "Register"
    But any field on the 2nd step is empty
    When they click "Register"
    Then field validation errors are shown on the invalid fields

  @minutia
  Scenario: Registering with Google
    Given a user viewing the initial registration form
    When they click the "Sign up with Google" Google SSO button
    And go through the google flow correctly
    Then they see the the 2nd step of the registration form
    And they see the following default fields
      | field     |
      | firstName |
      | lastName  |
      | email     |
    And the "email" field is disabled

  @minutia
  Scenario: Fields are pre-filled with user's google account information
    Given the user has completed the google sign-in process
    When the user is on the google registration form
    Then they see their google account's email address pre-filled
    And they see their google account's first/last name pre-filled

  @minutia @ui
  Scenario: Form does not have redirect to login page button
    Given the user is on the 2nd step of the registration form
    Then they do not see a login CTA
    And they must use the back button in the browser to return to the login page

  @minutia
  Scenario: Password fields are hidden
    Given the user is on the google registration form
    Then they do not see password fields

  @minutia
  Scenario: User encounters an error during form submission
    Given the user has completed the google sign-in process
    And the user is on the google registration form
    When the user fills in all required fields
    And the user submits the form
    But an error occurs
    Then the user sees an error banner
    And the form is not submitted

  @minutia
  Scenario: User tries to submit the form with missing required fields
    Given the user has completed the google sign-in process
    And the user is on the google registration form
    But the user leaves required fields empty
    When the user submits the form
    Then the user sees validation error messages
    And the form is not submitted

  @motivating
  Scenario: Registering through Google does not require manually verifying your email
    Given the user has completed the google sign-in process
    And the user is on the google registration form
    And all default fields are valid
    When they click "Register"
    And registration is successful
    Then they are redirected to the microsite's dashboard
    And they do not need to verify their email manually