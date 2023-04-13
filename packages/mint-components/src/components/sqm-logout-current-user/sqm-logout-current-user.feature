@author:noah
@owner:noah

Feature: Logout Current User

  Scenario: A user on an instant access widget
    Given a user viewing an instant access widget
    And the user is identified
    And the user is not logged in
    Then the component identifies the user by email

  Scenario: Users can switch who they are identified as through a link
    Given a user viewing an instant access widget
    And the user is identified
    And the user is not logged in
    When the user clicks the link in the component
    Then they are sent back to the registration form to re-identify themselves