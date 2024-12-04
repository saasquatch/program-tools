@author:andy @owner:andy
Feature: Cash payout code verification widget

  Background: User is on the Cash payouts setting page and sent a code to their email
    Given they are on the Cash payouts setting page

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
    Then a new verification code is generated is sent to their email

  @minutia
  Scenario: User changes email for verification
    Given they are viewing the code verification widget
    And they see the link text
      """
        Use a different email
      """
    When they press the link text
    Then they are brought back to the first step
    And the code sent to their first email is now invalid

  @minutia @ui
  Scenario: User enters invalid verification code
    Given they are viewing the code verification widget
    When they enter an invalid verification code in to the code input
    And press "Verify"
    Then an error message will display:
      """
      Please check your code and try again. If you’re still having trouble, try resending your code.
      """
    And they will not gain acess to the Cash payout settings form
