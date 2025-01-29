@author:andy @owner:andy
Feature: Cash payout status widget alert

  Background: A user sees alert status banners in the widget related to their tax form status
    Given they are viewing the widget

  @motivating
  Scenario: User has not completed payout and tax form
    Given they have impactConnection as one of the following
      | impactConnection                         |
      | null                                     |
      | { publisher: null }                      |
      | { connected: false, publisher: null }    |
      | { connected: false, publisher: { ... } } |
      | { publisher: { payoutsAccount: null }}   |
    Then a blue info banner appears with a header:
      """
      Payout and tax information required
      """
    And description
      """
      Submit your banking details and tax documents to receive your rewards.
      """
    And the alert contains a button with text
      """
      Payouts & Tax Settings
      """
    When they click the button
    Then the page will scroll to the payouts and tax form

  @motivating
  Scenario: User completes form and payout information required alert dissapears
    Given they have impactConnection as one of the following
      | impactConnection                                                    |
      | { connected: true, publisher: { payoutsAccount: { hold: false } } } |
    And they have completed the payout and tax form flow
    Then the "Payout and tax information required" alert disappears
    And a button appears in the big stat with text:
      """
      Payout & Tax Settings
      """

  @motivating
  Scenario: User has not verified their identity
    Given they have impactConnection as one of the following
      | impactConnection                                                                                      |
      | { connected: true, publisher: { payoutsAccount: { hold: true, holdReasons: [IDV_CHECK_REQUIRED] } } } |
    And they have completed the payout and tax form flow
    Then a yellow warning banner appears with a header:
      """
      Verify your identity
      """
    And description
      """
      Complete your verification to start receiving your cash rewards. It should only take a few minutes verify.
      """
    And the alert contains a button with text
      """
      Start Verification
      """
    When they click the button
    Then a modal opens with an iframe to verify their identity

  @minutia
  Scenario Outline: Alert displays the current state of the verification process
    Given a user has <holdReason> included in their holdReasons
    And they complete the payout and tax form flow
    Then a <color> banner appears
    And the alert has heading <heading>
    And the alert has description <description>

    Examples:
      | holdReason                  | color  | heading                            | description                                                                                                                                             |
      | IDV_CHECK_REQUIRED_INTERNAL | yellow | Verification In Progress           | Verification submission has been received. Our system is currently performing additional checks and analyzing the results. You will be updated shortly. |
      | IDV_CHECK_REVIEW_INTERNAL   | yellow | Verification Under Review          | Verification requires further review due to a potential error. Our team is reviewing the information and will update you shortly.                       |
      | IDV_CHECK_FAILED_INTERNAL   | red    | Identity verification unsuccessful | Identity verification has failed. Our team is reviewing the report and will contact you with further information.                                       |

  @motivating
  Scenario: User has hold reasons
    Given they have impactConnection as one of the following
      | impactConnection                                                   |
      | { connected: true, publisher: { payoutsAccount: { hold: true } } } |
    And hold reasons don't include any of the following
      | holdReason                  |
      | IDV_CHECK_REQUIRED          |
      | IDV_CHECK_REQUIRED_INTERNAL |
      | IDV_CHECK_REVIEW_INTERNAL   |
      | IDV_CHECK_FAILED_INTERNAL   |
    And they have completed the payout and tax form flow
    Then a yellow warning banner appears with a header:
      """
      Your payouts and account are on hold
      """
    And description
      """
      Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to {support email}.
      """

  @minutia
  Scenario: The banner refreshes it's state as the user goes through the tax form
    Given a user filling out the tax form
    When they fill in a form
    And click to submit
    Then a "sqm:tax-form-updated" custom event is fired
    And the banner refreshes

