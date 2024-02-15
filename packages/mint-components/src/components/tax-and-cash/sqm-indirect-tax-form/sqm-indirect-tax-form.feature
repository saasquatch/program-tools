@owner:andy @author:andy
Feature: Indirect Tax Form

  Background: A user has submitted their personal information in Tax Form Step One
    Given a user is on the Indirect Tax Form

  @minutia
  Scenario Outline: Different indirect tax inputs are shown depending on the country of a participant
    Given they are on step 2
    When <option> is selected based on the participant <country> from step 1
    And their <participantType> is "businessEntity"
    Then different <inputs> appear

    Examples: 
      | country | option                                               | participantType       | inputs                                                  |
      | CA      | I am registered for Indirect Tax in a Country/Region | businessEntity        | Country, Province, ?HST/GST Number, ?QST Number(Quebec) |
      | ES      | I am registered for Indirect Tax in a Country/Region | businessEntity        | Country, Sub Region, VAT Number, ?Income Tax Number     |
      | UK      | I am registered for Indirect Tax in a Country/Region | businessEntity        | Country, VAT Number                                     |
      | IR      | I am registered for Indirect Tax in a Country/Region | businessEntity        | Country, GST Number                                     |
      | AU      | I am registered for Indirect Tax in a Country/Region | businessEntity        | Country, GST Number                                     |
      | JP      | I am registered for Indirect Tax in a Country/Region | businessEntity        | Country, CT Number                                      |
      | US      | I am not registered for Indirect tax                 | individualParticipant | N/A                                                     |
      | EG      | I am not registered for Indirect tax                 | individualParticipant | N/A                                                     |

  @minutia @ui
  Scenario Outline: The country select displays applicable indirect tax countries and changes the VAT/GST/CT number input
    When the "I am registered for Indirect Tax" option is selected
    Then A Country select appears with available <country>s and corresponding <typeTax>:
      | typeTax | country        |
      | VAT     | UK             |
      | GST     | Australia      |
      | GST     | New Zealand    |
      | VAT     | Austria        |
      | VAT     | Belgium        |
      | VAT     | Bulgaria       |
      | VAT     | Croatia        |
      | VAT     | Cyprus         |
      | VAT     | Czech Republic |
      | VAT     | Denmark        |
      | VAT     | Estonia        |
      | VAT     | Finland        |
      | VAT     | France         |
      | VAT     | Germany        |
      | VAT     | Greece         |
      | VAT     | Hungary        |
      | VAT     | Ireland        |
      | VAT     | Italy          |
      | VAT     | Latvia         |
      | VAT     | Lithuania      |
      | VAT     | Luxembourg     |
      | VAT     | Malta          |
      | VAT     | Netherlands    |
      | VAT     | Poland         |
      | VAT     | Portugal       |
      | VAT     | Romania        |
      | VAT     | Slovakia       |
      | VAT     | Slovenia       |
      | VAT     | Spain          |
      | VAT     | Sweden         |
      | VAT     | Iceland        |
      | GST     | India          |
      | VAT     | Israel         |
      | CT      | Japan          |
      | VAT     | Mexico         |
      | VAT     | Norway         |
      | GST     | Singapore      |
      | VAT     | South Africa   |
      | VAT     | South Korea    |
      | VAT     | Switzerland    |
      | VAT     | Taiwan         |
      | VAT     | Thailand       |
      | VAT     | Philippines    |
      | GST     | Malaysia       |
      | VAT     | UAE            |
      | VAT     | Turkey         |
      | VAT     | Russia         |
    And based on the <typeTax>
    Then <typeTaxInputHeader> changes

    Examples: 
      | typeTax | typeTaxInputHeader |
      | VAT     | VAT Number         |
      | GST     | GST Number         |
      | CT      | CT Number          |

  @minutia @ui
  Scenario: The province select displays applicable indirect tax provinces
    When the "I am registered Indirect Tax" option is selected
    And the country is "Canada"
    Then A Province select appears with the available <provinces>
    And based on the selected <provinces>
    Then a <typeTaxInputs> will appear

    Examples: 
      | provinces             | typeTaxInput      |
      | Ontario               | HST Number        |
      | New Brunswick         | HST Number        |
      | Newfoundland          | HST Number        |
      | Nova Scotia           | HST Number        |
      | Saskatchewan          | HST Number        |
      | Prince Edward Island  | HST Number        |
      | Nunavut               | HST Number        |
      | British Columbia      | HST Number        |
      | Manitoba              | HST Number        |
      | Quebec                | GST + ?QST Number |
      | Yukon                 | GST Number        |
      | Alberta               | GST Number        |
      | Northwest Territories | GST Number        |

  @minutia
  Scenario: QST Number input appears if the province is Quebec
    When the "I am registered Indirect Tax" option is selected with the country as "Canada"
    Then a "GST Number" input will appear
    And a checkbox with "I am registred for QST Tax" will appear
    And if the participant checks the box
    Then a "QST Number" input will appear

  @minutia
  Scenario: Sub Region and Income Tax Number appear if country is Spain
    When the "I am registered Indirect Tax" option is selected
    And the country is "Spain"
    Then a "Sub Region" select appears with available <subRegions>
    And a "I am registered for Income Tax" checkbox will appear
    And if the participant checks <isRegisteredIncomeTax>
    Then a "Income Tax Number" input will appear

    Examples: 
      | subRegions | isRegisteredIncomeTax |
      | Madrid     | true                  |
      | Barcelona  | false                 |
      | Valencia   | true                  |

  @minutia @ui
  Scenario Outline: Participant from another country has their country value auto selected
    When "I am registered for Indirect Tax in a different Country / Region" is selected
    Then the Country <countryAutoSelectValue> is initialized with their <country> from step 1

    Examples: 
      | country | countryAutoSelectValue |
      | US      | United States          |
      | AUS     | Australia              |

  @unknown @minutia
  Scenario Outline: Participant from another country can change the auto selected country
    When the Country <countryAutoSelectValue> is selected with their <country> from step 1
    And they change the Country to <newCountrySelectValue>
    Then the Country <countryAutoSelectValue> changes to the <newCountrySelectValue>

    Examples: 
      | country | countryAutoSelectValue | newCountrySelectValue |
      | US      | United States          | Australia             |
      | UK      | United Kingdom         | Egypt                 |
  # AL: Rough spec of what happen when the participant actually submits

  @TODO @minutia
  Scenario: Participant is registered for indirect tax fills out and submits form
    Given they are registered for indirect tax
    And they fill out the form
    And press "Continue"
    Then their indirect tax details are saved

  @minutia @ui
  Scenario: Participant fills out the Indirect Tax Form with invalid or empty values
    When they fill out the form with invalid or empty for the following fields:
      | Country               | <country             |
      | Province              | <province>           |
      | Sub-region            | <subRegion>          |
      | Indirect Tax Number   | <indirectTaxNumber>  |
      | QST Number            | <qstNumber>          |
      | Sub-Region Tax Number | <subRegionTaxNumber> |
    Then the form displays the respective errors for each field:
      | <country>           | Country is required                                                                                |
      | <province>          | Province is required                                                                               |
      | <subRegion          | Sub-region is required                                                                             |
      | <indirectTaxNumber> | "{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number}} is required" |
      | <qstNumber>         | "QST Number is required"                                                                           |
      | <subRegionTaxNumber | "Income tax number is required                                                                     |

  @minutia
  Scenario: Participant is not registered for indirect tax
    When they select "I am not regisitred for Indirect Tax"
    Then no inputs will appear
    And they can press "Continue"

  @minutia
  Scenario: Participant decides to go back to step 1
    When they press the Back button
    Then the they are sent back to step 1
    And they arrive at the step 1 form filled with the information initially submitted
