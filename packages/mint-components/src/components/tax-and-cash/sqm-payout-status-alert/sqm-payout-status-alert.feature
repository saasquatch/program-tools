@author:andy @owner:andy
Feature: Cash payout status widget alert

  Background: A user sees alert status banners in the widget related to their tax form status
    Given they are viewing the widget

  @motivating
  Scenario: User has not completed payout and tax form
    Given they are viewing the widget
    And they have not completed the payout and tax form flow
    Then a blue info banner appears with a header:
      """
      Payout and tax information required
      """
    And the alert contains a button with text
      """
      Payouts & Tax Settings
      """
    When they click the button
    Then the page will scroll to the payouts and tax form

  @motivating
  Scenario: User completes form and payout information required alert dissapears
    Given they are viewing the widget
    And they have completed the payout and tax form flow
    Then the "Payout and tax information required" alert dissapears
    And a button appears in the big stat with text:
      """
      Payout & Tax Settings
      """

  @motivating
  Scenario: User has not verified their identity
    Given they are viewing the widget
    And they have completed the payout and tax form flow
    Then a yellow warning banner appears with a header:
      """
      Verify your identity
      """
    And the alert contains a button with text
      """
      Start Verification
      """
    When they click the button
    Then a modal opens with an iframe to verify their identity

  @motivating
  Scenario: User has hold reasons
    Given they are viewing the widget
    And they have completed the payout and tax form flow
    Then a yellow warning banner appears with a header:
      """
      Verify your identity
      """
    And the alert contains a button with text
      """
      Start Verification
      """
    When they click the button
    Then a modal opens with an iframe to verify their identity
