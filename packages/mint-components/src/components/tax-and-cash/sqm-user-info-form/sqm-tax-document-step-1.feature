@owner:andy
@author:andy

Feature: Tax Form Step One


	Background: A user is prompted to enter their personal and initial tax information
		Given a user is on Tax Form Step One


    # AL: Need full list of countries
    @minutia
    Scenario: A user is filling out the form and selects their country
    And the available options are:
        | United States  |
        | Canada         |
        | Australia      |
        | United Kingdom |

    # AL: Need full list of currencies
    @minutia
    Scenario: A user is filling out the form and selects their currency
    And the available options are:
        | CAD |
        | USD |
        | GBP |
        | AUS |

    @minutia
    @ui
    Scenario Outline: A user fills out Tax Form Step One with invalid values
    When they fill out the form with invalid values for the following fields:
        | First Name               | <firstName>             |
        | Last Name                | <lastName>              |
        | Email                    | <email>                 |
        | Country Code             | <countryCode>           |
        | Currency                 | <currency>              |
        | Participant Type         | <participantType>       |
        | Allow Banking Collection | <allowBankingCollection>|
    Then the form displays the respective errors for each field:
        | <firstName>               | Enter a first name        |
        | <lastName>                | Enter a last name         |
        | <email>                   | Enter a valid email       |
        | <countryCode>             | Select a country          |
        | <currency>                | Select a currency         |
        | <participantType>         | Select a participant type |
        | <allowBankingCollection>  | This field is required    |

    @minutia
	Scenario: A general error banner appears upon form submission request failing
	When the user completes the form with their information
	And they press "Continue" to submit the form
	Then a request is sent to the backend with the form data
	But if the request fails
	Then a general error banner appears with <generalTitle> and <generalDescription>
    
    @minutia
    @ui
    Scenario: The loading state is shown when the form is submitted
        Given the form is submitted
        Then the form fields are disabled
        Then a loading spinner appears in the Submit button

    
