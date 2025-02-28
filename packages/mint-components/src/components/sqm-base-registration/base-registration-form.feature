@owner:andy @author:andy
Feature: Base registration form
   Base form where user chooses manual or google registration

  Background:
    Given the tenant has GOOGLE_SIGNUP feature enabled
# AL: TODO

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
    Then the user is taken to the google registration form
