@owner:andy @author:andy
Feature: Tax Form Step One

  Background: A user is prompted to enter their personal and initial tax information
    Given a user on the User Information form

  @motivating
  Scenario Outline: User Information form requires specific user fields
    Given a user on the User Information form
    Then they see the text "Step 1 of 4"
    And they see the title "Personal Information"
    And they are shown a number of fields
    And each field has label <label>
    And is input type <inputType>
    And they see a "Continue" button

    Examples:
      | label                        | inputType |
      | First name                   | text      |
      | Last name                    | text      |
      | Email                        | text      |
      | Country                      | select    |
      | (Phone extension - no label) | text      |
      | Phone number                 | text      |
      | Address                      | text      |
      | City                         | text      |
      | State                        | select    |
      | Postal code                  | text      |
      | Currency                     | select    |
      | Tax and banking collection   | checkbox  |

  @motivating
  Scenario: The Participant is an Impact partner and form fields are disabled
    Given they have the following Impact user fields
      | firstName |
      | lastName  |
      | email     |
    And they have the following Impact publisher fields
      | countryCode            |
      | billingAddress         |
      | billingCity            |
      | billingState           |
      | billingCountryCode     |
      | billingPostalCode      |
      | phoneNumberCountryCode |
      | phoneNumber            |
      | currency               |
    And the firstName, lastName, email, countryCode, phoneNumberCountryCode, phoneNumber, billingAddress, billingState, billingCity, and currency fields cannot be changed
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
      | firstName              |
      | lastName               |
      | email                  |
      | countryCode            |
      | billingAddress         |
      | billingCity            |
      | billingState           |
      | billingCountryCode     |
      | billingPostalCode      |
      | phoneNumberCountryCode |
      | phoneNumber            |
      | currency               |
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
    # Invalid values are an empty string, or only spaces
    Given invalid values for the following fields:
      | First Name                 | <firstName>              |
      | Last Name                  | <lastName>               |
      | Country Code               | <countryCode>            |
      | Phone number               | <phoneNumber>            |
      | Extension                  | <extension>              |
      | Address                    | <address>                |
      | City                       | <city>                   |
      | State                      | <state>                  |
      | Postal code                | <postalCode>             |
      | Tax and Banking Collection | <allowBankingCollection> |
    And they click "Continue"
    Then the form displays the respective errors for each field:
      | <firstName>              | Firstname is required            |
      | <lastName>               | Lastname is required             |
      | <countryCode>            | Country is required              |
      | <phoneNumber>            | Phone number is required         |
      | <extension>              |                                  |
      | <address>                | Address is required              |
      | <city>                   | City is required                 |
      | <state>                  | State is required                |
      | <postalCode>             | Postal code is required          |
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

  @minutia
  Scenario: Selecting a country selects the same country option in the "Extension" field
    Given the "Currency" field has a value selected
    And the "Country" field has a value selected
    When the "Country" field is changed
    Then the "Extension" field has the same country's value selected
    But changing the "Extension" field does not change the "Country" field's value

  @minutia
  Scenario Outline: "Address" and "City" fields do not allow non-ASCII characters
    Given the <fieldName> field is not empty
    And the value includes <string>
    When the "Continue" button is clicked
    Then the following error message <may> be displayed
      """
      {fieldName} contains invalid characters.
      """

    # Note: SPACE and NUL mean the characters. Both are for documentation purposes.
    Examples:
      | fieldName | string                                               | may      |
      | Address   | SPACE                                                | will not |
      | Address   | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | will not |
      | Address   | 0123456789                                           | will not |
      | Address   | !"#$%&'()*+'-,/:;<=>?@[\]^_`~                        | will not |
      | Address   | æùíöêø                                               | will not |
      | Address   | ぁ ㍿ ・                                             | will     |
      | Address   | NUL                                                  | will     |
      | City      | SPACE                                                | will not |
      | City      | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | will not |
      | City      | 0123456789                                           | will not |
      | City      | !"#$%&'()*+'-,/:;<=>?@[\]^_`~                        | will not |
      | City      | æùíöêø                                               | will not |
      | City      | ぁ ㍿ ・                                             | will     |
      | City      | NUL                                                  | will     |

  @minutia
  Scenario: "Phone number" field does not allow alphabetical characters
    Given the "Phone number" field is not empty
    And the value includes <string>
    When the "Continue" button is clicked
    Then the following error message <may> be displayed
      """
      Phone number is invalid.
      """

    Examples:
      | string                                               | may      |
      | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | will     |
      | 0123456789                                           | will not |
      | !"#$%&'()*+'-,/:;<=>?@[\]^_`~                        | will not |

  @minutia
  Scenario Outline: "State" field changes based on country selected
    Given the "Country" field
    When <country> is selected via the dropdown
    Then the "State" select menu updates to the valid states of that country
    And the "State" field's label changes to <label>

    Examples:
      | country       | label    |
      | Canada        | Province |
      | Australia     | State    |
      | United States | State    |
      | Spain         | Region   |

  @minutia
  Scenario Outline: "State" field is hidden if there are no states for the selected country
    Given the "Country" field has value <country>
    Then the "State" select <isHidden>

    Examples:
      | country       | isHidden      |
      | Austria       | is hidden     |
      | Canada        | is not hidden |
      | Australia     | is not hidden |
      | United States | is not hidden |
      | Spain         | is not hidden |

  @minutia
  Scenario Outline: Prefilled user email prioritises their managed identity email if it has been verified
    Given a user with participant email <participantEmail>
    And managed identity email <miEmail>
    And their managed identity is <verified>
    Then the prefilled email in the user info form is <email>

    Examples:
      | participantEmail | miEmail        | verified     | email          |
      | p@example.com    | null           | N/A          | p@example.com  |
      | p@example.com    | mi@example.com | not verified | p@example.com  |
      | p@example.com    | mi@example.com | verified     | mi@example.com |
