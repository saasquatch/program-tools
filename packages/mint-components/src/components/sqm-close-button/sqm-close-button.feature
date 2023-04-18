@owner:coleton
@author:coleton

Feature: Popup close button

  Close button component for closing popup widgets

  Scenario: Close button is not rendered if the widget is not a POPUP widget
    Given the sqm-close-button component is included in widget template
    And the widget is rendered as an EMBED widget
    Then the close button is hidden

  Scenario: Clicking the close button hides the POPUP widget
    Given the sqm-close-button component is included in widget template
    And the widget is rendered as a POPUP widget
    And the POPUP widget is showing
    When the close button is clicked
    Then the POPUP widget is hidden