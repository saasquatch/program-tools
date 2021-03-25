Feature: Share Button

  The share button redirects users to a platform where they can share their referral link

  @motivating
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

  @review
  @minutae
  Scenario: Unsupported browsers warned on native share
    Given the share button's medium prop is "direct"
    And your browser does not support the Web Share API
    Then the share button will be hidden

  @review
  @minutae
  Scenario: SMS share buttons are hidden on non Android and iOS devices
    Given the share button's medium is "sms"
    And the share button is being viewed on a device which is not an Android or iOS device
    Then the share button will be hidden

  @review
  @motivating
  Scenario: Facebook share buttons will use SquatchAndroid sharing features
    Given the share button's medium is "facebook"
    And the share button is being viewed in a web view with the SquatchAndroid API
    And the Facebook app is available
    Then tapping the share button will open the phone's Facebook app
    And a share activity will be opened with the share link prefilled

  @review
  @motivating
  Scenario: SquatchAndroid will fall back to the Facebook website if no app is available
    Given the share button's medium is "facebook"
    And the share button is being viewed in a web view with the SquatchAndroid API
    And the Facebook app is not available
    Then tapping the share button will open the the Facebook mobile site in the device's browser
    And a share activity will be opened with the share link prefilled

  @review
  @minutae
  Scenario: A supplied program ID will be used if available
    Given the program id is supplied to the component in the "programId" prop
    Then the program ID in the "programId" prop will be used to retrieve share links

  @review
  @minutae
  Scenario: The program ID is automatically fetched from context
    Given the program id is not supplied to the component in the "programId" prop
    Then the program ID will be retrieved from context