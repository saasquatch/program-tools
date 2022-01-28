@author:noah
@owner:noah
Feature: Share Button

  The share button redirects users to a platform where they can share their referral link

  @motivating
  Scenario Outline: Share button displays for various platforms
    Given the share button's medium prop is "<medium>"
    And the button's child is text saying "BUTTON_TEXT"
    When the share button is rendered
    Then the button has text "BUTTON_TEXT"
    And the button is <colour>
    And it displays an <icon> beside the text
    And clicking the button redirects to an appropriate link
    Examples:
      | medium        | colour       | icon               |
      | facebook      | #1877f2      | facebook logo      |
      | twitter       | #1da1f2      | twitter logo       |
      | email         | #666666      | envelope           |
      | direct        | brand colour | paper plane        |
      | linkedin      | #0077b5      | linkedIn logo      |
      | sms           | #34DA50      | chat bubble        |
      | fbmessenger   | #0084ff      | messenger logo     |
      | whatsapp      | #25d366      | whatsapp logo      |
      | linemessenger | #00B300      | linemessenger logo |
      | pinterest     | #e60023      | pinterest logo     |

  @minutae
  Scenario Outline: Default icons can be overwritten
    Given a share button for any medium with <iconPropValue>
    When the share button is rendered
    Then it displays a <iconPropValue> instead of the share mediums default icon
    Examples:
      | iconPropValue |
      | basket        |
      | bluetooth     |
      | bandaid       |

  @motivating
  Scenario Outline: Default share medium colours can be overwritten
    Given a share button for any medium with <backgroundColourPropValue>
    When the share button is rendered
    Then the share button is <backgroundColourPropValue>
    Examples:
      | backgroundColourPropValue |
      | blue                      |
      | black                     |
      | green                     |

  @minutae
  Scenario Outline: Share medium icons and text can be hidden
    Given a share button with <prop> <value>
    When the share button is rendered
    Then <element> is hidden
    Examples:
      | prop     | value | element |
      | hideicon | true  | icon    |
      | hidetext | true  | text    |

  @minutae
  Scenario Outline: Icons can be on either side of the text
    Given a share button with <iconslotPropValue>
    When the share button is rendered
    Then the icon is displayed to the <direction> of the text
    Examples:
      | iconslotPropValue | direction |
      | suffix            | right     |
      | prefix            | left      |
      | prefix            | left      |

  @minutae
  Scenario: Unsupported browsers hide native share buttons
    Given the share button's medium prop is "direct"
    And your browser does not support the Web Share API
    Then the share button is hidden

  @minutae
  Scenario: SMS share buttons are hidden on non Android and iOS devices
    Given the share button's medium is "sms"
    And the share button is being viewed on a device which is not an Android or iOS device
    Then the share button is hidden

  @motivating
  Scenario: Facebook share buttons uses SquatchAndroid sharing features
    Given the share button's medium is "facebook"
    And the share button is being viewed in a web view with the SquatchAndroid API
    And the Facebook app is available
    Then tapping the share button opens the phone's Facebook app
    And a share activity is opened with the share link prefilled

  @motivating
  Scenario: SquatchAndroid falls back to the Facebook website if no app is available
    Given the share button's medium is "facebook"
    And the share button is being viewed in a web view with the SquatchAndroid API
    And the Facebook app is not available
    Then tapping the share button opens the the Facebook mobile site in the device's browser
    And a share activity is opened with the share link prefilled

  @minutae
  Scenario: A supplied program ID is used if available
    Given the program id is supplied to the component in the "programId" prop
    Then the program ID in the "programId" prop is used to retrieve share links

  @minutae
  Scenario: The program ID is automatically fetched from context
    Given the program id is not supplied to the component in the "programId" prop
    Then the program ID is retrieved from context