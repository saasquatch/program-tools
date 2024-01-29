@owner:andy
@author:andy

Feature: Tax Form Step One


	Background: A user is prompted to enter their personal and initial tax information
		Given a user is on Tax Form Step One


    @minutia
    Scenario Outline: A user fills out Tax Form Step One with the required information
    When they fill out the form with:
        | First Name               | <firstName>             |
        | Last Name                | <lastName>              |
        | Email                    | <email>                 |
        | Country Code             | <countryCode>           |
        | Currency                 | <currency>              |
        | Participant Type         | <participantType>       |
        | Allow Banking Collection | <allowBankingCollection>|
    And they agree to the terms which sets <allowBankingCollection> to true
    When they press the Submit button
    Then the form succesfully submits
    Examples:
        | FirstName | LastName | Email                | CountryCode | Currency | ParticipantType         | AllowBankingCollection |
        | John      | Doe      | john.doe@email.com   | US          | USD      | individualParticipant   | true                   |
        | Bob       | Johnson  | bob.johnson@email.com| CA          | CAD      | businessEntity          | true                   |
        | Martin    | Renny    | bob.johnson@email.com| UK          | GBP      | individualParticipant   | true                   |

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
    @ui
    Scenario: The loading state is shown when the form is submitted
        Given the form is submitted
        Then the form fields are disabled
        Then a loading spinner appears in the Submit button
