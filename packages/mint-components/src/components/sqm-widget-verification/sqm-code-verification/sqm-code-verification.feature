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

  Example:
      | number | next |
      | 1      | 2    |
      | 2      | 3    |
      | 3      | 4    |
      | 4      | 5    |
      | 5      | 6    |

  @minutia
  Scenario: Clicking a code input highlights its contents
    Given a code input with a character already entered
    When a user clicks on the code input
    Then the character is highlighted

  @minutia
  Scenario: Successful code verification fires an event
    Given a valid code is entered
    And the mutation `verifyUserEmail` is successful
    And an access key is recieved
    Then a "sq:code-verified" event is dispatched
    And it has detail
      """
      { token: <accessKey> }
      """

  @motivating
  Scenario: User enters verification code and proceed to setup
    Given they are viewing the code verification widget
    And they received a code in their email from the first step
    When they enter the code provided in their email in to the code input
    And press "Verify"
    Then they will gain access to the Cash payout settings form
    And the Cash payout settings form appears

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
    Then a success alert appears with text:
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
    And they will not gain access to the Cash payout settings form
