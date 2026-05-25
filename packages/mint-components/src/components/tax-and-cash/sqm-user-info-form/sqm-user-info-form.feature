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
      | Address   |                                           0123456789 | will not |
      | Address   | !"#$%&'()*+'-,/:;<=>?@[\\]^_`~                       | will not |
      | Address   | æùíöêø                                               | will not |
      | Address   | ぁ ㍿ ・                                             | will     |
      | Address   | NUL                                                  | will     |
      | City      | SPACE                                                | will not |
      | City      | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | will not |
      | City      |                                           0123456789 | will not |
      | City      | !"#$%&'()*+'-,/:;<=>?@[\\]^_`~                       | will not |
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
      |                                           0123456789 | will not |
      | !"#$%&'()*+'-,/:;<=>?@[\\]^_`~                       | will not |

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

  @minutia
  Scenario Outline: Indirect tax step is skipped if the user or the tenant do not qualify for indirect tax
    Given the user has filled out values for all required fields
    And the user has selected <userCountryCode>
    And the tenant has selected <brandCountryCode>
    And the tenant has indirect tax set up in <indirectTaxCountryCode>
    When the user clicks the "Next" button
    Then the publisher <mayBe> created
    And step 2 <mayBe> skipped

    Examples:
      | userCountryCode | tenantCountryCode | indirectTaxCountryCode | mayBe  |
      | GB              | GB                | GB                     | is not |
      | GB              | DE                | DE                     | is     |
      | DE              | DE                | DE                     | is     |
      | CA              | CA                | N/A                    | is     |
      | N/A             | CA                | N/A                    | is     |
      | US              | AU                | AU                     | is     |
      | ES              | ES                | ES                     | is not |
      | CA              | US                | CA                     | is not |
      | US              | US                | CA                     | is     |
      | US              | N/A               | N/A                    | is     |

  @minutia
  Scenario: Participants with pre-existing partners can patch missing data
    Given a user on the User Information form
    And they have a pre-existing partner with Impact
    But their partner is missing data for a form field
    Then field without pre-filled data is not disabled
    When they try to submit the form without providing the missing data
    Then they see a field level validation error
    When they complete the form with the missing data
    And click "Continue"
    Then the missing data is patched on the partner when they are upserted

  @motivating
  Scenario: Early partner creation pre-fills country and currency only
    Given the user had no Impact connection before opening sqm-partner-info-modal
    And they completed the modal and a new publisher was created
    And the new publisher only has the following fields populated
      | countryCode |
      | currency    |
    When they navigate to the User Information form
    Then the "Country" field is autofilled with the publisher's countryCode
    And the "Currency" field is autofilled with the publisher's currency
    And the "Country" and "Currency" fields are disabled
    And the firstName, lastName, and email fields are autofilled from the participant / managed identity
    And the firstName, lastName, and email fields are disabled per existing rules
    But all remaining publisher-derived fields (phoneNumberCountryCode, phoneNumber, billingAddress, billingCity, billingState, billingPostalCode) are empty and enabled
    And the user can fill in the missing fields and click "Continue"
    And on submit the missing fields are patched onto the existing publisher (no new publisher is created)

  @motivating
  Scenario: Linked existing partner whose user-info form is already complete skips the form entirely
    Given the user confirmed an existing Impact partner via sqm-partner-info-modal
    And the pre-existing partner has already filled out and saved their User Information form
    And the existing publisher therefore has every required field populated
      | countryCode            |
      | currency               |
      | phoneNumberCountryCode |
      | phoneNumber            |
      | billingAddress         |
      | billingCity            |
      | billingState           |
      | billingPostalCode      |
    When the new user enters the tax-and-cash flow
    Then the User Information form (step 1) is skipped entirely
    And the user is taken directly to the next applicable step (tax form, or banking if tax form is not required)
    And no fields from step 1 need to be re-entered or re-submitted
    And no new publisher is created and no patch request is sent for step 1 data

  @motivating
  Scenario: Linked existing partner with only country and currency populated still requires the rest
    Given the user confirmed an existing Impact partner via sqm-partner-info-modal
    And the existing publisher only has the following fields populated
      | countryCode |
      | currency    |
    When they navigate to the User Information form
    Then the "Country" field is autofilled and disabled
    And the "Currency" field is autofilled and disabled
    But the phoneNumberCountryCode, phoneNumber, billingAddress, billingCity, billingState, and billingPostalCode fields are empty and enabled
    When they try to submit without providing the missing fields
    Then they see a field-level validation error for each missing required field
    When they complete the missing fields and click "Continue"
    Then the missing data is patched onto the existing publisher (no new publisher is created)

  @minutia
  Scenario: The "0000000" / "DZ" placeholder phone values from publisher-creation are treated as empty
    # Impact API returns phoneNumber "0000000" and phoneNumberCountryCode "DZ" when we send null fields
    # during publisher creation  
    Given the user reaches the User Information form via either entry path (modal-created or linked existing)
    And the linked publisher's phoneNumber is "0000000"
    And the linked publisher's phoneNumberCountryCode is "DZ"
    Then the "Phone number" field is empty and enabled
    And the "Extension" (phoneNumberCountryCode) field is empty and enabled
    And the user must provide a real phone number before "Continue" will succeed
