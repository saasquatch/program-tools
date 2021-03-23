Feature: Share Button

  The share button redirects users to a platform where they can share their referral link

  Scenario Outline: Share button displays for various platforms
    Given the share button's medium prop is "<medium>"
    And the button's child is text saying "BUTTON_TEXT"
    When the share button is rendered
    And the button will have text "BUTTON_TEXT"
    Then it will display an icon beside the text
    And clicking the button will redirect to an appropriate link
    Examples:
      | medium        |
      | facebook      |
      | twitter       |
      | email         |
      | direct        |
      | linkedin      |
      | sms           |
      | fbmessenger   |
      | whatsapp      |
      | linemessenger |
      | pinterest     |
      | reminder      |
      | unknown       |

  Scenario: Unsupported browsers warned on native share
    Given the share button's medium prop is "direct"
    And your browser is not mobile
    When you click the share button
    Then an alert will appear warning about compatibility