@owner:coleton @author:coleton

Feature: Veriff Identity Verification

  Scenario: User with IDV_CHECK_REQUIRED hold reason can start flow
    Given a user has successfully completed the tax and cash form
    And 'IDV_CHECK_REQUIRED' is included in their holdReasons
    Then a verification button is displayed in the following components
      | components                 |
      | sqm-payouts-status-alert   |
      | sqm-tax-and-cash-dashboard |
    When they click the button
    Then a Veriff modal will open

  Scenario: Exiting the Veriff flow will refresh components
    Given a user is in the Veriff flow
    But they close the modal before completion
    Then `refreshImpactPublisherFinanceStatus` mutation is called
    And the `sqm:veriff-updated` custom event is fired on the window
    And the following components will refresh
      | components                 |
      | sqm-payouts-status-alert   |
      | sqm-tax-and-cash-dashboard |

  Scenario: Finishing the Veriff flow will refresh components
    Given a user is in the Veriff flow
    When they complete the verification process
    And the modal closes
    Then `refreshImpactPublisherFinanceStatus` mutation is called
    And the `sqm:veriff-updated` custom event is fired on the window
    And the following components will refresh
      | components                 |
      | sqm-payouts-status-alert   |
      | sqm-tax-and-cash-dashboard |
