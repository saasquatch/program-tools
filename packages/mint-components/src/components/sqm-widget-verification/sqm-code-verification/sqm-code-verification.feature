@author:andy @owner:andy
Feature: Cash payout code verification widget

  Background: User is on the Cash payouts setting page and sent a code to their email
    Given they are on the Cash payouts setting page

  @minutia
  Scenario Outline: Codes can be copy-pasted into the code input
    Given <code> is on the user's clipboard
    When they paste into the first input
    Then <result> is auto-filled into all code inputs
    And only one character/digit is in each input

    Examples:
      | code    | result |
      |  123456 | 123456 |
      | 1234567 | 123456 |

  @minutia
  Scenario Outline: Focus shifts to the next code input after typing
    Given a user is focused on input <previous>
    When they type any character
    Then the character is filled in the input
    And the cursor focus changes to input <next>
    When they are focussed on input <next>
    And the input is clear
    And they click "Backspace"
    Then the cursor focusses on the input <previous>

    Examples:
      | number | next |
      |      1 |    2 |
      |      2 |    3 |
      |      3 |    4 |
      |      4 |    5 |
      |      5 |    6 |

  @minutia
  Scenario: Clicking a code input highlights its contents
    Given a code input with a character already entered
    When a user clicks on the code input
    Then the character is highlighted

  @minutia
  Scenario: Successful code verification fires an event and advances to the partner info modal
    Given a valid code is entered
    And the mutation `verifyUserEmail` is successful
    And an access key is recieved
    Then a "sq:code-verified" event is dispatched
    And it has detail
      """
      { token: <accessKey> }
      """
    And the parent `sqm-widget-verification` advances to the partner info modal step

  @motivating
  Scenario: User enters verification code and proceeds to the partner info modal
    Given they are viewing the code verification widget inside the `sqm-widget-verification` dialog
    And they received a code in their email from the first step
    When they enter the code provided in their email in to the code input
    And press "Verify"
    Then the parent `sqm-widget-verification` swaps to the partner info modal step inside the same dialog
    And the dialog cannot be dismissed
    When the user successfully submits the partner info modal
    Then the widget verification dialog is hidden
    And the verified slot of `sqm-widget-verification` is rendered

  @motivating
  Scenario: Standalone code verification still gains access without the partner modal
    Given `sqm-code-verification` is rendered without a `sqm-widget-verification` parent
    When the user submits a valid 2FA code
    Then the "sq:code-verified" event is dispatched
    And the parent provider (if any) is set to verified
    But no partner info modal is shown by `sqm-code-verification` itself

  @minutia @ui
  Scenario: Code verification header text changes based on user email
    Given they are viewing the code verification widget
    And they provided <email> in the first step
    Then the <headerText> will change

    Examples:
      | email             | headerText                                                                       |
      | text@example.com  | Enter the code sent to test@example.com from our referral provider, impact.com.  |
      | janedoe@gmail.com | Enter the code sent to janedoe@gmail.com from our referral provider, impact.com. |

  @minutia
  Scenario: User re-sends verification code to email
    Given they are viewing the code verification widget
    And they see the link text
      """
      Resend Code
      """
    When they press the link text
    Then a success alert appears with text
      """
      Another code has been sent to email@example.com.
      """
    And a new verification code is generated is sent to their email

  @minutia @ui
  Scenario: User enters invalid verification code
    Given they are viewing the code verification widget
    When they enter an invalid verification code in to the code input
    And press "Verify"
    Then an error message will display:
      """
      Please check your code and try again. If you’re still having trouble, try resending your code.
      """
    And the partner info modal step is not shown

  @motivating
  Scenario: code-verification sends a 2FA email on first load if it's rendered by itself
    Given `sqm-code-verification` is included in the page's html
    But it is not a child element of `sqm-widget-verification`
    When `sqm-code-verification` loads
    Then it sends a 2FA email to the user's saved publisher email

  @motivating
  Scenario Outline: Email verification prioritises sending to the connected Impact email
    Given a user with participant email <participantEmail>
    And impactConnection <impactConnection>
    When the verification email is sent
    Then <mutation> is called
    And the email is sent to <finalEmail>

    Examples:
      | participantEmail        | impactConnection                       | mutation                       | finalEmail              |
      | null                    | null                                   | N/A                            | N/A                     |
      | participant@example.com | null                                   | requestUserEmailVerification   | participant@example.com |
      | participantEmail        | { user: { email: impact@example.com }} | requestImpactPublisherEmail2FA | impact@example.com      |

  @motivating
  Scenario Outline: Code verification uses different mutations depending on if the user has an impactConnection
    Given a user with participant email <participantEmail>
    And impactConnection <impactConnection>
    And an email was sent with code "123456"
    When the code is submitted
    Then <mutation> is called

    Examples:
      | participantEmail        | impactConnection                       | mutation                          |
      | null                    | null                                   | N/A                               |
      | participant@example.com | null                                   | verifyUserEmail                   |
      | participantEmail        | { user: { email: impact@example.com }} | submitImpactPublisherEmail2FACode |
