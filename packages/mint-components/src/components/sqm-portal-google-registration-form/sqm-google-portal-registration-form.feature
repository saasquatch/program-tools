@author:andy @owner:andy
Feature: Microsite Google Registration Form

  @minutia
  Scenario: Fields are pre-filled with user's google account information
    Given the user has completed the google sign-in process
    When the user is on the google registration form
    Then they see their google account email address pre-filled
    And they see their google account first/last name pre-filled

  @minutia @ui
  Scenario: Form does not have redirect to login page button
    Given the user is on the google registration form
    Then they do not see a login CTA
    And they must use the back button in the browser to return to the login page

  @minutia @ui
  Scenario: Password fields are hidden
    Given the user is on the google registration form
    Then they do not see password fields
