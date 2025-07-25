@owner:zach @author:zach
Feature: Banking Information Form

  Background: A participant has submitted a tax form and would like to fill out their banking information

  @minutia
  Scenario: Loading skeletons are shown when the form is loading
    When the participant loads the form
    And they have not selected a payout method
    And the form is in a loading state
    Then the form shows a loading skeleton in place of the payment method checkboxes
    But if they have selected a payment method
    Then the form shows skeletons for the expected number of input fields

  @minutia
  Scenario: A banner is shown at the top of the page if the partner already exists
    Given the participant is already a partner with impact
    And the user is not editing existing payout settings
    Then the payment method option will be selected automatically
    And the form fields with be pre filled with the participants data
    And there will be banner to explain that the account is linked to their referral profile in impact.com

  @motivating
  Scenario Outline: Bank account form fields are dynamically shown
    Given the bank account payment method is selected
    And the selected currency is <currency>
    And the selected bank country is one of <bankCountry>
    Then <fields> are displayed
    Examples:
      | currency | bankCountry                           | fields                                                                                               |
      | USD      | United States                         | Beneficiary account name, Bank account type, Bank account number, ABA routing number                 |
      | USD      | Canada                                | Beneficiary account name, Bank account number, SWIFT code, Routing number                            |
      | USD      | Spain, Ireland, United Kingdom, Japan | Beneficiary account name, IBAN, SWIFT code                                                           |
      | USD      | Japan                                 | Beneficiary account name, Bank account number, SWIFT code                                            |
      | GBP      | United States                         | Beneficiary account name, Bank account type, Bank account number, SWIFT code, ABA routing number     |
      | GBP      | Canada                                | Beneficiary account name, Bank account number, SWIFT code, Routing number                            |
      | GBP      | Spain, Ireland, United Kingdom,       | Beneficiary account name, IBAN, SWIFT code                                                           |
      | GBP      | Japan                                 | Beneficiary account name, Bank account number, SWIFT code                                            |
      | AUD      | United States                         | Beneficiary account name, Bank account type, Bank account number, SWIFT code, ABA routing number     |
      | AUD      | Canada                                | Beneficiary account name, Bank account number, SWIFT code, Routing number                            |
      | AUD      | Spain, Ireland, United Kingdom        | Beneficiary account name, IBAN, SWIFT code                                                           |
      | AUD      | Japan                                 | Beneficiary account name, Bank account number, SWIFT code                                            |
      | CAD      | Canada                                | Beneficiary account name, Bank account number, Routing number                                        |
      | EUR      | United States                         | Beneficiary account name, Bank account type, Bank account number, SWIFT code, ABA routing number     |
      | EUR      | Canada                                | Beneficiary account name, Bank account number, SWIFT code, Routing number                            |
      | EUR      | Spain, Ireland, United Kingdom        | Beneficiary account name, IBAN, SWIFT code                                                           |
      | EUR      | Japan                                 | Beneficiary account name, Bank account number, SWIFT code                                            |
      | JPY      | Japan                                 | Beneficiary account name, Bank account type, Bank account number, SWIFT code, Bank name, Branch code |
      | MAD      | Western Sahara, Morocco               | Beneficiary account name, Bank account number, SWIFT code                                            |

  @minutia
  Scenario Outline: Bank country dropdown list is dynamic depending on the partner's currency
    Given the bank account payment method is selected
    And the selected currency is <currency>
    Then the bank country options are <countries>
    Examples:
      | currency | countries                                                    |
      | USD      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
      | GBP      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
      | AUD      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
      | CAD      | Canada                                                       |
      | EUR      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
      | JPY      | Japan                                                        |

  @minutia
  Scenario Outline: Payment Method text is dynamic depending on the currency and country selected
    Given the bank account payment method is selected
    And the selected currency is <currency>
    And the selected bank country is one of <bankCountry>
    Then <paymentMethodText> is shown
    And the withdrawal fee is shown

    Examples:
      | currency | bankCountry                                                  | paymentMethodText |
      | USD      | United States                                                | EFT Withdrawal    |
      | USD      | Canada, Spain, Ireland, United Kingdom, Japan                | FX Wire           |
      | GBP      | United Kingdom                                               | EFT Withdrawal    |
      | GBP      | United States, Canada, Spain, Ireland, Japan                 | FX Wire           |
      | AUD      | United States, Canada, Spain, Ireland, United Kingdom, Japan | FX Wire           |
      | CAD      | Canada                                                       | EFT Withdrawal    |
      | EUR      | Spain, Ireland,  United Kingdom                              | EFT Withdrawal    |
      | EUR      | United States, Canada, Japan                                 | FX Wire           |
      | JPY      | Japan                                                        | FX Wire           |

  @minutia
  Scenario Outline: PayPal option is dynamically shown
    Given <currency> is set on the payout partner
    And the currency <currencySupported> supported by PayPal
    Then the paypal option <mayBe> shown as a payment method
    Examples:
      | currency | currencySupported | mayBe  |
      | USD      | is                | is     |
      | GBP      | is                | is     |
      | AUD      | is                | is     |
      | CAD      | is                | is     |
      | EUR      | is                | is     |
      | JPY      | is                | is     |
      | MAD      | is not            | is not |

  @minutia
  Scenario: Error state is shown if the participant tries to submit the form before all the fields have been filled
    Given the participant has selected a payment method
    And they have not filled out all of the required fields
    When they submit the form
    Then there will be a red border with a message underneath each of the inputs that are missing from the form

  @minutia
  Scenario: A loading error banner appears when the form fails to load
    When the participant views the form
    Then a request is made to fetch the form data
    But the request fails
    Then a loading error banner appears

  @motivating
  Scenario: Editting withdrawal settings requires a 2FA code
    Given a user already has withdrawal settings
    And the user has a verified email
    When they submit the form
    Then a 2FA email is sent to their verified publisher email
    And they are shown the `sqm-code-verification` component
    When they verify their 2FA code
    Then the withdrawal settings form tries to save their changes

  @minutia
  Scenario: Editing withdrawal settings opens a confirmation modal when the form is submitted
    Given a user already has withdrawal settings
    And the user has a verified email
    When they submit the form
    Then a confirmation modal is shown
    And the modal contains the text "Updating payment information places your account and payouts on hold for up to 48 hours while we verify your change. Payments scheduled during the hold period are skipped."
    When they click the confirmation button
    Then the modal is closed
    And the `sqm-code-verification` component is shown