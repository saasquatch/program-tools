@owner:andy @author:andy
Feature: Partner Info Modal — country, currency, and T&C collection
  As a cash-program operator
  I want a participant's country, currency, and Tax-&-Banking consent collected
  before they can access cash features
  So that the partner record created in impact.com is valid from the start.

  Background:
    Given a participant whose `impactConnection.connectionStatus` is "NOT_STARTED"

  @motivating
  Scenario: Modal is shown when the connection has not been started
    Given the user data has loaded
    And `impactConnection.connectionStatus` is "NOT_STARTED"
    Then the partner-info modal is open

  @motivating
  Scenario: Modal is hidden once the connection has been started
    Given `impactConnection.connectionStatus` does not equal "NOT_STARTED"
    Then the partner-info modal is not rendered

  @minutia
  Scenario: Modal is hidden while user data is still loading
    Given the GET_USER_PARTNER_INFO query has not resolved yet
    Then the partner-info modal is not rendered

  @minutia
  Scenario: Modal cannot be dismissed by the user
    Given the partner-info modal is open
    When the user presses Escape, clicks the overlay, or otherwise tries to close the dialog
    Then the close is prevented (sl-request-close + sl-hide are intercepted)
    And the modal stays open until a successful submission

  @motivating
  Scenario Outline: Country defaults to the locale-derived country code for a new participant
    Given the participant has no linked Impact publisher
    And the resolved locale is <locale>
    Then the "Country" select is prefilled with <countryCode>
    And the "Country" select is enabled
    And the "Currency" select starts empty and is enabled

    Examples:
      | locale | countryCode |
      | en_US  | US          |
      | fr_CA  | CA          |
      | en_GB  | GB          |

  @motivating
  Scenario: New participant with no connection
    Given a new participant with no linked publisher
    When they open the "Country" select
    Then they see only countries returned by `impactPayoutCountries`
    When they select a country
    Then the "Currency" select is reset to empty
    And the "Currency" select shows only currencies supported by the selected country

  @motivating
  Scenario: User has existing partner and modal prefills country + currency
    Given the participant is already linked to an Impact publisher
    And that publisher has a `countryCode` of "US" and a `currency` of "USD"
    When the modal opens
    Then the "Country" select is prefilled with "US" and disabled
    And the "Currency" select is prefilled with "USD" and disabled
    And the modal header uses the existing-partner copy
    And the description uses the existing-partner copy (including the support email link)
    And the primary button label uses the existing-partner "Confirm" copy

  @motivating
  Scenario: Existing-partner with linked publisher missing country/currency falls back to the new-partner defaults
    Given the participant is linked to an existing publisher
    But the publisher has no `countryCode` or `currency`
    Then the "Country" select defaults to the locale-derived country code (and is enabled)
    And the "Currency" select starts empty (and is enabled)
    And the "Confirm" button submits the locale/user selections via `startImpactConnection`

  @motivating
  Scenario: Tax-and-banking checkbox is required to submit
    Given the partner-info modal is open
    And the "Country" select has a value
    And the "Currency" select has a value
    But the "Tax and banking" checkbox is unchecked
    Then the primary button is disabled
    When the user checks the "Tax and banking" checkbox
    Then the primary button becomes enabled

  @minutia
  Scenario: Submit button is disabled
    Given the partner-info modal is open
    When any one of (country, currency, allowBankingCollection) is missing
    Then the submit button is disabled

  @motivating
  Scenario: Submitting the modal starts the Impact connection and closes the modal
    Given the user has selected country "US", currency "USD", and checked the T&C checkbox
    When they click the primary button
    Then the modal calls the `startImpactConnection` mutation with
      | user.id        | the participant id        |
      | user.accountId | the participant accountId |
      | firstName      | from the user record      |
      | lastName       | from the user record      |
      | countryCode    | "US"                      |
      | currency       | "USD"                     |
    And on success `impactConnection.connectionStatus` changes from "NOT_STARTED" to "STARTED"
    And the modal closes

  @motivating
  Scenario: Existing-partner submission attaches the participant to the linked publisher
    Given the participant is linked to an existing publisher with country "CA" and currency "CAD"
    And the T&C checkbox is checked
    When they click "Confirm"
    Then `startImpactConnection` is called with the publisher's country "CA" and currency "CAD"
    And on success the connection advances to "STARTED" and the modal closes

  @motivating
  Scenario Outline: Submission failure leaves the modal open with a recoverable error
    Given the partner-info modal is open with all fields valid
    When `startImpactConnection` fails with <failure>
    Then the modal stays open
    And `error` is set to <errorText>
    And the an impactConnection is not created

    Examples:
      | failure                                  | errorText                                       |
      | a thrown / network error                 | the `networkErrorText` prop                     |
      | a result with `success: false` + errors  | the joined `validationErrors[].message` strings |
      | a result with `success: false` no errors | the `networkErrorText` prop                     |

  @minutia
  Scenario: All inputs are disabled while submitting
    Given the partner-info modal is open
    When the user clicks the primary button and the mutation is in flight
    Then the "Country", "Currency", and "Tax and banking" inputs are all disabled
    And the primary button shows a loading spinner

  @minutia
  Scenario: Country select has a search input that filters the displayed countries
    Given the "Country" select is open
    When the user types into the search input
    Then the displayed countries is filtered to countries whose `displayName` contains the search text (case-insensitive)

  @minutia
  Scenario: Currency select has a search input that filters the displayed currencies
    Given the "Currency" select is open
    When the user types into the search input
    Then the displayed currencies is filtered to currencies whose `currencyCode` contains the search text (case-insensitive)

  @motivating
  Scenario Outline: A user is filling out the form and selects their currency
    Given a user with countryCode <countryCode>
    When they open the currency dropdown
    Then only <currencies> are displayed
    And USD, AUD, EUR, GBP are displayed regardless of country code

    Examples:
      | countryCode | currencies              |
      | USA         | USD, AUD, EUR, GBP      |
      | CAN         | USD, AUD, EUR, GBP, CAN |
      | IND         | USD, AUD, EUR, GBP, INR |
