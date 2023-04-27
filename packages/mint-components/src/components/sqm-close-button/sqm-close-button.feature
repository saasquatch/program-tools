@owner:coleton
@author:coleton

Feature: Popup close button

  Close button component for closing popup widgets

  @motivating
  Scenario: Close button is not rendered if the widget is not a POPUP widget
    Given the sqm-close-button component is included in widget template
    And the widget is rendered as an EMBED widget
    Then the close button is hidden

  @motivating
  Scenario: Clicking the close button hides the POPUP widget
    Given the sqm-close-button component is included in widget template
    And the widget is rendered as a POPUP widget
    And the POPUP widget is showing
    When the close button is clicked
    Then the POPUP widget is hidden

  @motivating
  @ui
  Scenario Outline: Color can be customized
    Given a user is viewing the close button
    And the prop "background-color" has <value>
    Then the background has color <backgroundColor>
    Examples:
      | value                 | backgroundColor                     |
      | empty (default value) | var(--sl-color-neutral-0) (#000000) |
      | aquamarine            | #7fffd4                             |
