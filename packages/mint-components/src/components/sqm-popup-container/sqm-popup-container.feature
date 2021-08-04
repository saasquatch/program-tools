@owner:noah
@author:noah

Feature: Popup Container

  Container for the widget popup

Scenario: The close button closes the popup
    Given the popup is open
    And the <closeButton> prop is set to true
    When the user clicks the close button text button with text from the <closeButtonText> prop
    Then the popup will close