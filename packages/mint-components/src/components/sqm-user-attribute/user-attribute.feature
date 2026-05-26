@owner:zach @author:zach
Feature: User Attribute
  Displays a user's custom field value.

  Background: A user exists
    Given a user is logged in
    And the user has custom fields

  @motivating
  Scenario: A custom field value is displayed
    Given the component has prop "value" with value "firstName"
    And the user has a custom field "firstName" with value "John"
    When the component is rendered
    Then the text "John" is displayed

  @landmine
  Scenario: Nothing is rendered when the custom field does not exist
    Given the component has prop "value" with value "nonExistentField"
    And the user does not have a custom field "nonExistentField"
    Then component is not rendered
    And nothing is displayed

  @motivating
  Scenario: Nothing is rendered while user data is loading
    Given the component is loading user data
    When the component is rendered
    Then component is not rendered
    And nothing is displayed

  @motivating
  Scenario Outline: Optional styling props can be applied to customize the text appearance
    Given the component has prop <prop> with value <value>
    When the component is rendered
    Then the text is displayed with <cssProperty> set to <value>

    Examples:
      | prop         | value       | cssProperty |
      | fontSize     | 24          | font-size   |
      | color        | #E91E63   | color       |
      | fontWeight   | 700         | font-weight |

  @minutia
  Scenario: Style props are optional and default to no custom styling
    Given the component has no style props set
    When the component is rendered
    Then the text is displayed with default browser styles
