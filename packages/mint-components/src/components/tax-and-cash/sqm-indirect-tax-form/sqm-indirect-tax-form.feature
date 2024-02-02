@owner:andy @author:andy
Feature: Indirect Tax Form

  Background: A user has submitted their personal information in Tax Form Step One
    Given a user is on the Indirect Tax Form

  @minutia
  Scenario Outline: Different indirect tax inputs are shown depending on the country of a participant
    When <option> is selected based on based the participant <country> from step 1
    Then different <inputs> appear

    Examples: 
      | country        | option                                                           | inputs                        |
      | Canada         | I am registered for HST in Canada                                | Province, Indirect Tax Number |
      | United States  | I am registered for Indirect Tax in a different Country / Region | Country, VAT Number           |
      | United Kingdom | I am registered for Indirect Tax in a different Country / Region | Country, VAT Number           |
      | Egypt          | I am not registered for Indirect tax                             | N/A, N/A                      |

  @minutia @ui
  Scenario: The province select displays applicable indirect tax provinces
    When the "I am registered for HST in Canada" option is selected
    Then A Province select appears with the available <provinces>

    Examples: 
      | provinces             |
      | Ontario               |
      | Alberta               |
      | British Columbia      |
      | Manitoba              |
      | New Brunswick         |
      | Newfoundland          |
      | Nova Scotia           |
      | Prince Edward Island  |
      | Quebec                |
      | Saskatchewan          |
      | Northwest Territories |
      | Nunavut               |
      | Yukon                 |

  @minutia
  Scenario: The country select displays applicable indirect tax countries from Impacts API
    When the "I am registered for Indirect Tax in a different Country / Region" option is selected
    Then A Country select appears with the available countries provided by Impacts API

  @minutia @ui
  Scenario Outline: Participant from another country has their country value auto selected
    When "I am registered for Indirect Tax in a different Country / Region" is selected
    Then the Country <countryAutoSelectValue> is initialized with their <country> from step 1

    Examples: 
      | country | countryAutoSelectValue |
      | US      | United States          |
      | AUS     | Australia              |

  @minutia
  Scenario Outline: Participant from another country can change the auto selected country
    When the Country <countryAutoSelectValue> is selected with their <country> from step 1
    And they change the Country to <newCountrySelectValue>
    Then the Country <countryAutoSelectValue> changes to the <newCountrySelectValue>

    Examples: 
      | country | countryAutoSelectValue | newCountrySelectValue |
      | US      | United States          | Australia             |
      | UK      | United Kingdom         | Egypt                 |

  @minutia @ui
  Scenario: Participant fills out the Indirect Tax Form with invalid values
    When they fill out the form with invalid values for the following fields:
      | Province     | <province>    |
      | Indirect Tax | <indirectTax> |
      | VAT Number   | <vatNumber>   |
    Then the form displays the respective errors for each field:
      | <province>    | Province is required            |
      | <indirectTax> | Indirect tax number is required |
      | <vatNumber>   | VAT number is required          |

  @minutia
  Scenario: Participant decides to go back to step 1
    When they press the Back button
    Then the they are sent back to step 1
    And they arrive at the step 1 form filled with the information initially submitted
