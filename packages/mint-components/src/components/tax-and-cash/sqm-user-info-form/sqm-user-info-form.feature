@owner:andy @author:andy
Feature: Tax Form Step One

  Background: A user is prompted to enter their personal and initial tax information
    Given a user is on Tax Form Step One

  @minutia
  Scenario: The Participant is a partner and cannot change their email
    When they are on the form
    And they are already a partner
    Then the email field is pre-filled with their email
    And the email field is disabled

  @minutia
  Scenario: A user is filling out the form and selects their country
    When they open the country dropdown
    Then the available countries are provided:
      | country        |
      | UNITED STATES  |
      | UK             |
      | AUSTRALIA      |
      | NEWZEALAND     |
      | CANADA         |
      | AUSTRIA        |
      | BELGIUM        |
      | BULGARIA       |
      | CROATIA        |
      | CYPRUS         |
      | CZECHREPUBLIC  |
      | DENMARK        |
      | ESTONIA        |
      | FINLAND        |
      | FRANCE         |
      | GERMANY        |
      | GREECE         |
      | HUNGARY        |
      | IRELAND        |
      | ITALY          |
      | LATVIA         |
      | LITHUANIA      |
      | LUXEMBOURG     |
      | MALTA          |
      | NETHERLANDS    |
      | POLAND         |
      | PORTUGAL       |
      | ROMANIA        |
      | SLOVAKIA       |
      | SLOVENIA       |
      | SPAIN          |
      | SWEDEN         |
      | ICELAND        |
      | INDIA          |
      | ISRAEL         |
      | JAPAN          |
      | MEXICO         |
      | NORWAY         |
      | SINGAPORE      |
      | SOUTHAFRICA    |
      | SOUTHKOREA     |
      | SWITZERLAND    |
      | TAIWAN         |
      | THAILAND       |
      | PHILIPPINES    |
      | MALAYSIA       |
      | UAE            |
      | TURKEY         |
      | RUSSIA         |
      | CANARY_ISLANDS |

  @minutia
  Scenario: A user is filling out the form and selects their currency
    When they open the currency dropdown
    Then the available currencies are provided:
      | currencies |
      | GBP        |
      | AUD        |
      | NZD        |
      | CAD        |
      | EUR        |
      | BGN        |
      | HRK        |
      | CZK        |
      | DKK        |
      | HUF        |
      | PLN        |
      | RON        |
      | SEK        |
      | ISK        |
      | INR        |
      | ILS        |
      | JPY        |
      | MXN        |
      | NOK        |
      | SGD        |
      | ZAR        |
      | KRW        |
      | CHF        |
      | TWD        |
      | THB        |
      | PHP        |
      | MYR        |
      | AED        |
      | TRY        |
      | RUB        |

  @minutia @ui
  Scenario: User comes back to step 1 form after filling out and submitting
    When they have finished filling out the form
    And press "Continue"
    But on step 2 they press the "Back" button
    And arrive back on step 1
    Then the "Country" and "Currency" fields will be disabled

  @minutia
  Scenario: Country select is searchable
    When they press the Country select
    Then there is a searchbar
    And as they type
    Then the available countries get filtered out based on their search

  @minutia
  Scenario: Currency select is searchable
    When they press the Currency select
    Then there is a searchbar
    And as they type a currency abbreviation
    Then the available currencies get filtered out based on their search

  @minutia @ui
  Scenario Outline: A user fills out Tax Form Step One with invalid values
    When they fill out the form with invalid values for the following fields:
      | First Name                 | <firstName>              |
      | Last Name                  | <lastName>               |
      | Country Code               | <countryCode>            |
      | Currency                   | <currency>               |
      | Tax and Banking Collection | <allowBankingCollection> |
    Then the form displays the respective errors for each field:
      | <firstName>              | Enter a first name     |
      | <lastName>               | Enter a last name      |
      | <countryCode>            | Select a country       |
      | <currency>               | Select a currency      |
      | <allowBankingCollection> | This field is required |

  @minutia @ui
  Scenario: The loading state is shown when the form is submitted
    Given the form is submitted
    Then the form fields are disabled
    Then a loading spinner appears in the Submit button
