@owner:zach @author:zach
Feature: Banking Information Form

  Background: A participant has submitted a tax form and would like to fill out their banking information

  Scenario: Loading skeletons are shown when the form is loading
    When the participant loads the form
    And they have not selected a payout method
    And the form is in a loading state
    Then the form shows a loading skeleton in place of the payment method checkboxes
    But if they have selected a payment method
    Then the form shows skeletons for the expected number of input fields

  Scenario: A banner is shown at the top of the page if the partner already exists
    Given the participant is already a parter with impact
    Then the payment method option will be selected automatically
    And the form fields with be pre filled with the participants data
    And there will be banner to explain that the account is linked to their referral profile in impact.com

  Scenario Outline: Bank account form fields are dynamically shown
    Given the bank account payment method is selected
    And the selected currency is <currency>
    And the selected bank country is one of <bankCountry>
    Then <fields> are displayed

    Examples: 
      | currency | bankCountry                           | fields                                                                                               |
      | USD      | United States                         | Beneficiary Account Name, Bank Account Type, Bank Account Number, ABA Routing Number                 |
      | USD      | Canada                                | Beneficiary Account Name, Bank Account Number, SWIFT Code                                            |
      | USD      | Spain, Ireland, United Kingdom, Japan | Beneficiary Account Name, IBAN, SWIFT Code                                                           |
      | GBP      | United States                         | Beneficiary Account Name, ABA Routing Number                                                         |
      | GBP      | Canada                                | Beneficiary Account Name, Bank Account Number, SWIFT Code                                            |
      | GBP      | Spain, Ireland, United Kingdom, Japan | Beneficiary Account Name, IBAN, SWIFT Code                                                           |
      | AUD      | United States                         | Beneficiary Account Name, ABA Routing Number                                                         |
      | AUD      | Canada                                | Beneficiary Account Name, Bank Account Number, SWIFT Code                                            |
      | AUD      | Spain, Ireland, United Kingdom, Japan | Beneficiary Account Name, IBAN, SWIFT Code                                                           |
      | CAD      | Canada                                | Beneficiary Account Name, Bank Account Number, Routing Number                                        |
      | EUR      | United States                         | Beneficiary Account Name, ABA Routing Number                                                         |
      | EUR      | Canada                                | Beneficiary Account Name, Bank Account Number, SWIFT Code                                            |
      | EUR      | Spain, Ireland, United Kingdom, Japan | Beneficiary Account Name, IBAN, SWIFT Code                                                           |
      | JPY      | Japan                                 | Beneficiary Account Name, Bank Account Type, Bank Account Number, SWIFT Code, Bank Name, Branch Code |
    # According to mock data currently available

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
      | JPY      | Japan                                                        | EFT Withdrawal    |
    # Not sure what the actual specs for when it's shown are yet

  Scenario Outline: PayPal option is dynamically shown
    Given <currency> is set on the payout partner
    And the currency <currencySupported> supported by PayPal
    Then the paypal option <mayBe> shown as a payment method

    Examples: 
      | currency | currencySupported | mayBe |
      | USD      | is                | is    |
      | GBP      | is                | is    |
      | AUD      | is                | is    |
      | CAD      | is                | is    |
      | EUR      | is                | is    |
      | JPY      | is                | is    |

  Scenario: Error state is shown if the participant tries to submit the form before all the fields have been filled
    Given the participant has selected a payment method
    And they have not filled out all of the required fields
    When they submit the form
    Then there will be a red border with a message underneath each of the inputs that are missing from the form

  @minutia
  Scenario: A loading error banner appears when a form fails to load
    When the participant views a form step
    Then a request is made to fetch the form data
    But the request fails
    Then a loading error banner appears with <loadingErrorAlertHeader> and <loadingErrorAlertDescription>

    Examples: 
      | loadingErrorAlertHeader               | loadingErrorAlertDescription                                                       |
      | There was a problem loading your form | Please refresh the page and try again. If this problem continues, contact Support. |
