@author:andy @owner:andy
Feature: Cash payout email verification widget

  Background: A user is on requires email verification to access the Cash payout form
    Given they are on the Cash payouts setting page

  @motivating
  Scenario: User enters an email and a code is sent to that email
    Given no email is saved
    And they enter a valid email in the input
    When they press "Send Code"
    Then a verification code is sent to the specified email
    And they are directed to the code verification step

  @minutia @ui
  Scenario: User enters an invalid email
    When they enter an invalid email in the input
    And they press "Send Code"
    Then the following error message is displayed under the input:
      """
      Please enter a valid email
      """

  @minutia @ui
  Scenario: Verification code fails to send
    Given the user has a valid email in the input
    And they press "Send Code"
    And the code is unsuccessfully sent
    Then the following error alert appears above the input
      """
      There Was an error sending your code.
      Please try again. If this problem continues, contact our program support team.
      """

  @minutia @ui
  Scenario: Email verification widget is loading
    When the widget is loading
    Then skeleton loaders will display

  @minutia
  Scenario: User's cannot edit their email
    Given a user with email "test@example.com"
    When they load `sqm-email-verification`
    Then the email input is disabled
    And the email input is prefilled with "test@example.com"
    When they click the "Send Code" button
    Then a 2FA email is sent to "test@example.com"