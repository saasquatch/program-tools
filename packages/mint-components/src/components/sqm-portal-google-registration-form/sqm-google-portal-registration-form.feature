@author:andy @owner:andy
Feature: Portal Google Registration Form

  @minutia @ui
  Scenario: The google registration form does not redirect to login page button
    Given the user is on the google registration form
    Then they do not see a login CTA
    And they must use the back button in the browser to return to the login page
