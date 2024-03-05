@owner:andy @author:andy
Feature: Tax Form Step One

  Background: A user is prompted to enter their personal and initial tax information
    Given a user on the User Information form

  @motivating
  Scenario Outline: Form fields
    Given a user on the User Information form
    Then they see the text "Step 1 of 4"
    And they see the title "Personal Information"
    And they are shown a number of fields
    And each field has label <label>
    And is input type <inputType>
    And they see a "Continue" button

    Examples:
      | label                      | inputType |
      | First name                 | text      |
      | Last name                  | text      |
      | Email                      | text      |
      | Country                    | select    |
      | Currency                   | select    |
      | Tax and banking collection | checkbox  |

  @motivating
  Scenario: The Participant is an Impact partner and form fields are disabled
    Given they have the following Impact user fields
      | firstName |
      | lastName  |
      | email     |
    And they have the following Impact publisher fields
      | countryCode |
      | currency    |
    Then the firstName, lastName, email, countryCode, and currency fields cannot be changed
    And the corresponding input fields have been autofilled with the Impact values
    And the corresponding input fields are disabled

  @motivating
  Scenario: The Participant is an Impact user but not an Impact parter and form fields are disabled
    Given they have the following Impact user fields
      | firstName |
      | lastName  |
      | email     |
    But no publisher information
    Then the firstName, lastName, and email cannot be changed
    And the corresponding input fields have been autofilled with the Impact values
    And the corresponding input fields are disabled
    But all other fields are enabled

  @motivating
  Scenario: Email field is disabled for a fresh user
    Given they have no Impact user information
    And they have no Impact publisher information
    But they have the following fields saved on their participant
      | firstName   |
      | lastName    |
      | email       |
      | countryCode |
      | currency    |
    Then the user's email cannot be changed
    And the corresponding input fields are autofilled with the participant values
    And the email field is disabled
    But all other fields are enabled

  @motivating
  Scenario: A user is filling out the form and selects their country
    When they open the country dropdown
    Then they see a list of country names
    And the countries are only those in which Impact supports cash payouts

  @minutia
  Scenario: Country select is searchable
    When they press the Country select
    Then there is a searchbar
    And as they type in the searchbar
    Then the available countries get filtered out based on their search

  @minutia
  Scenario: Country field defaults to US
    Given a user with no saved countryCode
    When they load the form
    Then the "Country" input defaults to "US"

  @motivating
  Scenario: A user is filling out the form and selects their currency
    Given a user with countryCode <countryCode>
    When they open the currency dropdown
    Then only currencies supported in that country are shown
    But the following currencies are always shown
      | USD |
      | AUD |
      | EUR |
      | GBP |

  @minutia
  Scenario: Currency select is searchable
    When they press the Currency select
    Then there is a searchbar
    And as they type a currency abbreviation in the searchbar
    Then the available currencies get filtered out based on their search

  @minutia
  Scenario: Non-partner user comes back to step 1 form after filling out and submitting
    Given a non-partner user
    When they have finished filling out all enabled fields
    And press "Continue"
    But on step 2 they press the "Back" button
    And arrive back on step 1
    Then the data they inputted persists
    And the step 1 fields can still be edited

  @minutia
  Scenario: Participant that is a partner comes back to step 1 form after submitting
    Given a user that is an Impact partner
    When they press "Continue"
    But on step 2 they press the "Back" button
    And arrive back on step 1
    Then the step 1 fields are disabled

  @minutia @ui
  Scenario Outline: A user fills out Tax Form Step One with invalid values
    Given invalid values for the following fields:
      | First Name                 | <firstName>              |
      | Last Name                  | <lastName>               |
      | Country Code               | <countryCode>            |
      | Currency                   | <currency>               |
      | Tax and Banking Collection | <allowBankingCollection> |
    And they click "Continue"
    Then the form displays the respective errors for each field:
      | <firstName>              | Firstname is required            |
      | <lastName>               | Lastname is required             |
      | <countryCode>            | Country is required              |
      | <currency>               | Currency is required             |
      | <allowBankingCollection> | Terms and Conditions is required |
    And no save request is sent to the backend
    And they are not sent to the next step

  @minutia @ui
  Scenario: User Info Form is loading
    When the form is loading
    Then all inputs are disabled
    And the "Continue" button is disabled

  @minutia
  Scenario: Selecting a country clears the currency value
    Given the "Currency" field has a value selected
    And the "Country" field has a value selected
    When the "Country" field is changed
    Then the "Currency" field has nothing selected
