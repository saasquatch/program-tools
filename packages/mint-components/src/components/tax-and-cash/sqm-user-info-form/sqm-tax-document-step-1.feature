@owner:andy
@author:andy

Feature: Tax Form Step One


	Background: A user is prompted to enter their personal and initial tax information
		Given a user is on the First step of the tax form


    @minutia
    Scenario Outline: A user fills out Tax Form Step One with the required information
    Given the user is on Tax Form Step One
    When the user fills out the form with:
      | First Name               | <firstName>             |
      | Last Name                | <lastName>              |
      | Email                    | <email>                 |
      | Country Code             | <countryCode>           |
      | Currency                 | <currency>              |
      | Participant Type         | <participantType>       |
      | Allow Banking Collection | <allowBankingCollection>|
    And the user agrees to the terms which sets <allowBankingCollection> to true
    Then the user can press the Submit button
    Then the form succesfully submits
    Examples:
    | FirstName | LastName | Email                | CountryCode | Currency | ParticipantType         | AllowBankingCollection |
    | John      | Doe      | john.doe@email.com   | US          | USD      | individualParticipant   | true                   |
    | Bob       | Johnson  | bob.johnson@email.com| UK          | GBP      | individualParticipant   | true                   |


    @minutia
    @ui
    Scenario Outline: A user fills out Tax Form Step One with invalid values
    Given the user is on Tax Form Step One
    When the user fills out the form with invalid values for the follow fields:
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
        And the form fields are disabled
        Then a loading spinner appears in the Submit button
