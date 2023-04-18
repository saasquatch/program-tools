@author:noah
@owner:noah

Feature: Logout Current User

  Background:
    Given a user viewing an instant access widget

  Scenario: A user on an instant access widget
    Given the user is identified
    And the user is logged in
    Then the component identifies the user by email

  Scenario: Users can switch who they are identified as through a link
    Given the user is identified
    And the user is logged in
    When the user clicks the link in the component
    Then the saved user identity is emptied
    And they are sent back to the registration form to re-identify themselves