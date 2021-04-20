@owner:sam
@author:sam

Feature: Conditional Section

  Conditional Section adds JSONata conditional logic that can display or hide children components based on user segments or custom fields

  @review
  @motivating
  Scenario: Content is hidden or shown depending on user segments
    Given the component's condition prop is set to "'vip' in user.segments"
    And the component contains the text "Hello"
    And the user has no segments
    When the widget is loaded
    Then "Hello" will not be shown
    When the user is added to segment "vip"
    Then "Hello" will be shown

  @review
  @motivating
  Scenario: Content is hidden or shown depending on user's custom fields
    Given the component's condition prop is set to "user.customFields.foo = true"
    And the component contains the text "Hello"
    And the user's custom field "foo" is false
    When the widget is loaded
    Then "Hello" will not be shown
    When the user's custom field "foo" is set to true
    Then "Hello" will be shown

  @review
  @minutae
  Scenario: JSONata condition is type sensitive
    Given the component's condition prop is set to "user.customFields.foo = true"
    And the component contains the text "Hello"
    And the user's custom field "foo" is "true"
    Then "Hello" will not be shown
    When the user's custom field "foo" is set to true
    Then "Hello" will be shown

  @review
  @minutae
  Scenario: JSONata strings using user data require an authenticated user
    Given the component's condition prop is set to "user.customFields.foo = true"
    And the component contains the text "Hello"
    And there is no authenticated user available
    Then the JSONata evaluation will fail
    And "Hello" will not be shown

