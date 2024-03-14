@owner:andy @author:andy
Feature: Indirect Tax Form

  Background: A user has submitted their personal information in Tax Form Step One
    Given a user is on the Indirect Tax Form

  @motivating
  Scenario Outline: Indirect Tax form has 2 options for Indirect Tax information
    Given a user
    When they view the Indirect Tax form
    Then they see the text "Step 2 of 4"
    And they see the title "Indirect Tax"
    And they see the subtitle
      """
      Participants representing businesses based in countries that enforce indirect taxes (e.g. VAT, HST, GST) must add their indirect tax details to stay tax compliant.
      """
    Then they are shown the radio option for indirect tax
    And the option <option> has label <label> and description <description>

    Examples: 
      | option        | label                           | description                                                                                                                 |
      | notRegistered | Not registered for Indirect Tax | If you’re joining this referral program as an individual or you’re based in the US, then you’re not registered.             |
      | registered    | Registered for Indirect Tax     | If you represent a business based outside of the US may be registered. Not sure? Contact our Support team to find out more. |

  @motivating @ui
  Scenario Outline: Inputs display based on radio option selected
    Given the option <option> is selected
    Then the field <field> is displayed
    And it has label <label>

    Examples: 
      | option        | field               | label                            |
      | notRegistered | N/A                 | N/A                              |
      | registered    | indirectCountryCode | Country / Region of Indirect Tax |
      | registered    | indirectTaxId       | {taxType} number                 |

  @minutia
  Scenario: "Not registered" is the default option
    Given that a countryCode was selected in Step 1
    When a user loads Step 2
    Then the radio option "notRegistered" is auto-selected regardless of selected country

  @minutia @ui
  Scenario Outline: indirectTaxId field label changes depending on tax type of country selected
    Given the radio option "registered" is selelected
    And the "indirectCountryCode" field has <country> selected
    And the tax type of that country is <taxType>
    Then the label of the "indirectTaxId" field is <label>

    Examples: 
      | country     | taxType       | label               |
      | New Zealand | GST           | GST number          |
      | Malaysia    | SST           | SST number          |
      | Japan       | CT            | CT number           |
      | Italy       | VAT           | VAT number          |
      | Uganda      | Not specified | Indirect tax number |

  @minutia @ui
  Scenario Outline: Additional fields are shown when "Canada" is the selected Indirect Tax Country
    Given the radio option "registered" is selelected
    And the "indirectCountryCode" field has "Canada" selected
    Then the "province" field is displayed
    When the "province" field has value <province>
    Then the "indirectTaxId" field is shown and has label <label>
    And <additionalFields> are shown

    Examples: 
      | province               | label      | additionalFields |
      | Alberta                | GST number | n/a              |
      | British Columbia       | HST number | n/a              |
      | Manitoba               | HST number | n/a              |
      | New Brunswick          | HST number | n/a              |
      | Newfoundland           | HST number | n/a              |
      | North West Territories | GST number | n/a              |
      | Nova Scotia            | HST number | n/a              |
      | Nunavut                | HST number | n/a              |
      | Ontario                | HST number | n/a              |
      | Prince Edward Island   | HST number | n/a              |
      | Quebec                 | GST number | registeredForQST |
      | Saskatchewan           | HST number | n/a              |
      | Yukon                  | GST number | n/a              |

  @minutia @ui
  Scenario: Selecting the "registeredForQST" checkbox shows QST number input
    Given the radio option "registered" is selelected
    And the "indirectCountryCode" field has "Canada" selected
    And the "province" field has value "Quebec"
    Then the "registeredForQST" checkbox with label "I am registered for QST Tax" will appear
    When the "registeredForQST" checkbox is selected
    Then the "qstNumber" field is shown
    And the "qstNumber" field has label "QST number"

  @minutia @ui
  Scenario Outline: Indirect Tax Number label changes based on selected Indirect Tax Country
    Given the user selects the "registered" option
    And they select one of the following <countries> with <typeTax> is the indirect tax country
      | countries      | typeTax |
      | UK             | VAT     |
      | Australia      | GST     |
      | New Zealand    | GST     |
      | Austria        | VAT     |
      | Belgium        | VAT     |
      | Bulgaria       | VAT     |
      | Croatia        | VAT     |
      | Cyprus         | VAT     |
      | Czech Republic | VAT     |
      | Denmark        | VAT     |
      | Estonia        | VAT     |
      | Finland        | VAT     |
      | France         | VAT     |
      | Germany        | VAT     |
      | Greece         | VAT     |
      | Hungary        | VAT     |
      | Ireland        | VAT     |
      | Italy          | VAT     |
      | Latvia         | VAT     |
      | Lithuania      | VAT     |
      | Luxembourg     | VAT     |
      | Malta          | VAT     |
      | Netherlands    | VAT     |
      | Poland         | VAT     |
      | Portugal       | VAT     |
      | Romania        | VAT     |
      | Slovakia       | VAT     |
      | Slovenia       | VAT     |
      | Spain          | VAT     |
      | Sweden         | VAT     |
      | Iceland        | VAT     |
      | India          | GST     |
      | Israel         | VAT     |
      | Japan          | CT      |
      | Mexico         | VAT     |
      | Norway         | VAT     |
      | Singapore      | GST     |
      | South Africa   | VAT     |
      | South Korea    | VAT     |
      | Switzerland    | VAT     |
      | Taiwan         | VAT     |
      | Thailand       | VAT     |
      | Philippines    | VAT     |
      | Malaysia       | SST     |
      | UAE            | VAT     |
      | Turkey         | VAT     |
      | Russia         | VAT     |
    Then <typeTaxInputHeader> changes based on the <typeTax>

    Examples: 
      | country        | typeTax | typeTaxInputHeader |
      | United Kingdom | VAT     | VAT number         |
      | Australia      | GST     | GST number         |
      | Japan          | CT      | CT number          |
  ###############################################################

  @minutia
  Scenario Outline: Extra fields are shown when "Spain" is the selected Indirect Tax Country
    Given "impactCountryCode" has value "Spain"
    Then the field <field> is displayed
    And the field <field> has label <label>

    Examples: 
      | field                  | label                                                                                                                      |
      | withholdingRegion      | Sub region                                                                                                                 |
      | vatNumber              | VAT number                                                                                                                 |
      | withholdingTaxCheckbox | I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me. |

  @minutia
  Scenario: Withholding tax number field
    Given "impactCountryCode" has value "Spain"
    When the "withholdTaxCheckbox" checkbox is set to true
    Then the "withholdingTaxId" field is displayed
    And the "withholdingTaxId" field has label "Income tax number"

  @minutia @ui
  Scenario: Country/Region of Indirect Tax select is searchable
    When the participante presses the Country/Region of Indirect Tax select
    Then there is a searchbar
    And as they type in the searchbar
    Then the available countries get filtered out based on their search

  @motivating
  Scenario Outline: Fields saved
    Given the radio option <option> is selected
    And the indirect tax form is filled out according to <formData>
    When the "Continue" button is pressed
    Then the following user fields are included in the request body
      | field       |
      | firstName   |
      | lastName    |
      | email       |
      | countryCode |
      | currency    |
    And the tax information fields <taxFields> have values in the request body
    And any other fields are "undefined"

    Examples: 
      | option        | indirectCountryCode | indirectTaxId | indirectTaxRegion | additionalTaxId | withholdingTaxId | taxFields                                                               |
      | notRegistered | n/a                 | n/a           | n/a               | n/a             | n/a              | ""                                                                      |
      | registered    | US (United States)  |        123123 | n/a               | n/a             | n/a              | indirectCountryCode, indirectTaxId                                      |
      | registered    | UK (United Kingdom) |        123123 | n/a               | n/a             | n/a              | indirectCountryCode, indirectTaxId                                      |
      | registered    | CA (Canada)         |        123123 | BC                | n/a             | n/a              | indirectCountryCode, indirectTaxId, indirectTaxRegion                   |
      | registered    | CA (Canada)         |        123123 | QU                |             333 | n/a              | indirectCountryCode, indirectTaxId, indirectTaxRegion, additionalTaxId  |
      | registered    | ES (Spain)          |        123123 | SPAINPROPER       | n/a             |              333 | indirectCountryCode, indirectTaxId, indirectTaxRegion, withholdingTaxId |
      | registered    | ES (Spain)          |        123123 | CANARYISLANDS     | n/a             |              333 | indirectCountryCode, indirectTaxId, indirectTaxRegion, withholdingTaxId |

  @minutia
  Scenario: Participant is registered for indirect tax fills out and submits form but request is unsuccessful
    Given they fill out the form
    And press "Continue"
    Then the save request is sent
    When the request is unsuccessful due to an error
    Then an error banner is displayed
    And they are not sent to Step 3

  @minutia
  Scenario: Participant is registered for indirect tax fills out and submits form
    Given they fill out the form correctly
    And press "Continue"
    Then the save request is sent
    When the request is successful
    Then their indirect tax details are saved
    And they are sent to Step 3

  @minutia @ui
  Scenario: Participant fills out the Indirect Tax Form with invalid or empty values
    Given the form has invalid or empty for the following fields:
      | Country               | <country             |
      | Province              | <province>           |
      | Sub-region            | <subRegion>          |
      | Indirect Tax number   | <indirectTaxNumber>  |
      | QST number            | <qstNumber>          |
      | Sub-Region Tax number | <subRegionTaxNumber> |
    When the "Continue" button is clicked
    Then the form displays the respective errors for each field:
      | <country>           | Country is required                 |
      | <province>          | Province is required                |
      | <subRegion          | Sub-region is required              |
      | <indirectTaxNumber> | "VAT/HST/GST/CT number is required" |
      | <qstNumber>         | "QST number is required"            |
      | <subRegionTaxNumber | "Income tax number is required      |
    And no request is sent to the backend
