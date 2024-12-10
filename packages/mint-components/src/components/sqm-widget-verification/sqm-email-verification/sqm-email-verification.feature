@author:andy @owner:andy
Feature: Cash payout email verification widget

  Background: A user is on requires email verification to access the Cash payout form
    Given they are on the Cash payouts setting page

  @motivating
  Scenario: User enters an email and a code is sent to that email
    Given they enter a valid email in the input
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
  Scenario: Email verification widget is loading
    When the widget is loading
    Then skeleton loaders will display
