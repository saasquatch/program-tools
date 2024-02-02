@owner:andy
@author:andy

Feature: Tax Form Step One


	Background: A user is prompted to enter their personal and initial tax information
		Given a user is on Tax Form Step One

    @minutia
    Scenario: The email input is pre-filled and cannot be changed
    When the user is filling out the form
    Then they see the email input has already been filled with their email
    And the field is disabled


    # AL: Need full list of countries
    @minutia
    Scenario: A user is filling out the form and selects their country
    And the available options are the list of countries provided by Impact:
        | United States  |
        | Canada         |
        | Australia      |
        | United Kingdom |

    # AL: Need full list of currencies
    @minutia
    Scenario: A user is filling out the form and selects their currency
    And he available options are the list of currencies provided by Impact:
        | CAD |
        | USD |
        | GBP |
        | AUS |

    @minutia
    @ui
    Scenario Outline: A user fills out Tax Form Step One with invalid values
    When they fill out the form with invalid values for the following fields:
        | First Name                 | <firstName>             |
        | Last Name                  | <lastName>              |
        | Country Code               | <countryCode>           |
        | Currency                   | <currency>              |
        | Participant Type           | <participantType>       |
        | Tax and Banking Collection | <allowBankingCollection>|
    Then the form displays the respective errors for each field:
        | <firstName>               | Enter a first name        |
        | <lastName>                | Enter a last name         |
        | <countryCode>             | Select a country          |
        | <currency>                | Select a currency         |
        | <participantType>         | Select a participant type |
        | <allowBankingCollection>  | This field is required    |
    
    @minutia
    @ui
    Scenario: The loading state is shown when the form is submitted
        Given the form is submitted
        Then the form fields are disabled
        Then a loading spinner appears in the Submit button

    
