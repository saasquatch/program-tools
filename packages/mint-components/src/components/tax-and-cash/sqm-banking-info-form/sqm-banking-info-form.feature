@owner:zach
@author:zach
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

    Scenario: Bank account form fields are dynamically shown
        Given the bank account payment method is selected

    # According to mock data currently available
    Scenario: Bank country dropdown list is dynamic depending on the partner's currency
        Given the bank account payment method is selected
        And the selected currency is <currency>
        Then the bank country options are <countries>
            | currency | countries                                                    |
            | USD      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
            | GBP      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
            | AUD      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
            | CAD      | Canada                                                       |
            | EUR      | United States, Canada, Spain, Ireland, United Kingdom, Japan |
            | JPY      | Japan                                                        |


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



