@author:noah
@owner:noah

Feature: Logout Current User

  Background:
    Given a user viewing an instant access widget

  @motivating
  @ui
  Scenario: A user on an instant access widget
    Given the user is identified
    And the user is logged in
    Then the component identifies the user by displaying their email in an ICU string
    And the users email displayed in the ICU string using hte "{email}" variable

  @motivating
  @ui
  Scenario: Users can switch who they are identified as through a link
    Given the user is identified
    And the user is logged in
    When the user clicks the link in the component
    Then the saved user identity is emptied
    And they are sent back to the registration form to re-identify themselves

  @minutia
  Scenario: Logout link empties the saved User Identity
    Given a valid user identity
    And the user is viewing the "logged-in" template
    When they click the logout link
    Then the user identity is set to "undefined"
    And the user is returned to the "logged-out" template