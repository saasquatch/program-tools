@owner:andy @author:andy
Feature: Base registration form
   Base form where user chooses manual or google registration

  Background:
    Given the tenant has GOOGLE_SIGNUP feature enabled

  @minutia
  Scenario: User can choose manual registration
    Given the user is on the base registration form
    When the user enters their email
    And they press the "Register" button
    Then the user is taken to the manual registration form

  @minutia
  Scenario: User can choose google registration
    Given the user is on the base registration form
    When the user presses the "Sign up with Google" button
    Then the user is prompted with the google sign in API
    And then user is taking to the google registration form

  @minutia
  Scenario: User goes back to login page
    Given the user is on the base registration form
    Then they see a login CTA
      """
      Already have an account? Sign in
      """
    When the user presses Sign in
    Then the user is taken back to the login page
