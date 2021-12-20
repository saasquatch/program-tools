@owner:sam
@author:sam

Feature: Conditional Section

  Conditional Section adds JSONata conditional logic that can display or hide children components based on user segments, custom fields or email

  @motivating
  Scenario: Content can be hidden or shown depending on user segments
    Given the component's condition prop is set to "'vip' in user.segments"
    And the component contains the text "Hello"
    And the user has no segments
    When the widget is loaded
    Then "Hello" is not shown
    When the user is added to segment "vip"
    Then "Hello" is shown

  @motivating
  Scenario: Content can be hidden or shown depending on user's custom fields
    Given the component's condition prop is set to "user.customFields.foo = true"
    And the component contains the text "Hello"
    And the user's custom field "foo" is false
    When the widget is loaded
    Then "Hello" is not shown
    When the user's custom field "foo" is set to true
    Then "Hello" is shown

  @motivating
  Scenario: Content can be hidden or shown depending on user's email
    Given the component's condition prop is set to "$not('example.com' in $substringAfter(user.email, '@'))"
    And the component contains the text "Hello"
    And the user's email is "bobtesterson@example.com"
    When the widget is loaded
    Then "Hello" is not shown
    When the user's email is "bobtesterson@referralsaasquatch.com"
    Then "Hello" is shown

  @minutae
  Scenario: JSONata conditions are type sensitive
    Given the component's condition prop is set to "user.customFields.foo = true"
    And the component contains the text "Hello"
    And the user's custom field "foo" is "true"
    Then "Hello" is not shown
    When the user's custom field "foo" is set to true
    Then "Hello" is shown

  @minutae
  Scenario: JSONata strings using user data require an authenticated user
    Given the component's condition prop is set to "user.customFields.foo = true"
    And the component contains the text "Hello"
    And there is no authenticated user available
    Then the JSONata evaluation fails
    And "Hello" is not shown
