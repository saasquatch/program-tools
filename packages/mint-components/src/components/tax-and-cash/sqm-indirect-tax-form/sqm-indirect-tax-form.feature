@owner:andy @author:andy
Feature: Indirect Tax Form

  Background: A user has submitted their personal information in Tax Form Step One
    Given a user is on the Indirect Tax Form
#   Break into 3 specs

  @minutia
  Scenario Outline: Different indirect tax inputs are shown depending on the country of a participant
    When <option> is selected based on based the participant <country> from step 1
    Then different <inputs> appear

    Examples: 
      | country        | option                                                           | inputs                        |
      | Canada         | I am registered for HST in Canada                                | Province, Indirect Tax Number |
      | United Kingdom | I am registered for Indirect Tax in a different Country / Region | Country, VAT/CT/GST Number    |
      | Egypt          | I am not registered for Indirect tax                             | N/A, N/A                      |

  @minutia @ui
  Scenario: The province select displays applicable indirect tax provinces
    When the "I am registered for HST in Canada" option is selected
    Then A Province select appears with the available <provinces>

    Examples: 
      | provinces            |
      | Ontario              |
      | New Brunswick        |
      | Newfoundland         |
      | Nova Scotia          |
      | Prince Edward Island |

  @minutia
  Scenario: The country select displays applicable indirect tax countries
    When the "I am registered for Indirect Tax in a different Country / Region" option is selected
    Then A Country select appears with available <countries>
      | countries             |
      | UK                    |
      | Australia             |
      | New Zealand           |
      | Canada                |
      | Austria               |
      | Belgium               |
      | Bulgaria              |
      | Croatia               |
      | Cyprus                |
      | Czech Republic        |
      | Denmark               |
      | Estonia               |
      | Finland               |
      | France                |
      | Germany               |
      | Greece                |
      | Hungary               |
      | Ireland               |
      | Italy                 |
      | Latvia                |
      | Lithuania             |
      | Luxembourg            |
      | Malta                 |
      | Netherlands           |
      | Poland                |
      | Portugal              |
      | Romania               |
      | Slovakia              |
      | Slovenia              |
      | Spain                 |
      | Sweden                |
      | Alberta               |
      | British Columbia      |
      | Manitoba              |
      | New Brunswick         |
      | Newfoundland          |
      | Northwest Territories |
      | Nova Scotia           |
      | Nunavut               |
      | Ontario               |
      | Prince Edward Island  |
      | Quebec                |
      | Saskatchewan          |
      | Yukon                 |
      | Iceland               |
      | India                 |
      | Israel                |
      | Japan                 |
      | Mexico                |
      | Norway                |
      | Singapore             |
      | South Africa          |
      | South Korea           |
      | Switzerland           |
      | Taiwan                |
      | Thailand              |
      | Philippines           |
      | Malaysia              |
      | UAE                   |
      | Turkey                |
      | Russia                |
# Undecided behaviour

  @minutia
  Scenario Outline: The country select displays applicable indirect tax countries and changes the VAT/GST/CT number input
    When the "I am registered for Indirect Tax in a different Country / Region" option is selected
    Then A Country select appears with available <country>s and corresponding <vat_acronym>:
      | vat_acronym | country        |
      | VAT         | UK             |
      | GST         | Australia      |
      | GST         | New Zealand    |
      | VAT         | Austria        |
      | VAT         | Belgium        |
      | VAT         | Bulgaria       |
      | VAT         | Croatia        |
      | VAT         | Cyprus         |
      | VAT         | Czech Republic |
      | VAT         | Denmark        |
      | VAT         | Estonia        |
      | VAT         | Finland        |
      | VAT         | France         |
      | VAT         | Germany        |
      | VAT         | Greece         |
      | VAT         | Hungary        |
      | VAT         | Ireland        |
      | VAT         | Italy          |
      | VAT         | Latvia         |
      | VAT         | Lithuania      |
      | VAT         | Luxembourg     |
      | VAT         | Malta          |
      | VAT         | Netherlands    |
      | VAT         | Poland         |
      | VAT         | Portugal       |
      | VAT         | Romania        |
      | VAT         | Slovakia       |
      | VAT         | Slovenia       |
      | VAT         | Spain          |
      | VAT         | Sweden         |
      | VAT         | Iceland        |
      | GST         | India          |
      | VAT         | Israel         |
      | CT          | Japan          |
      | VAT         | Mexico         |
      | VAT         | Norway         |
      | GST         | Singapore      |
      | VAT         | South Africa   |
      | VAT         | South Korea    |
      | VAT         | Switzerland    |
      | VAT         | Taiwan         |
      | VAT         | Thailand       |
      | VAT         | Philippines    |
      | GST         | Malaysia       |
      | VAT         | UAE            |
      | VAT         | Turkey         |
      | VAT         | Russia         |
    And based on the <country>
    Then the VAT/GST/CT number input changes to <typeTaxInputHeader>

    Examples: 
      | vat_acronym | country | typeTaxInputHeader |
      | VAT         | RUSSIA  | VAT number         |
      | GST         | India   | GST Number         |
      | CT          | Japan   | CT Number          |
      # AL: Confirm if this is the correct list of countries impact supports for VAT/GST/CT

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
  Scenario: Participant fills out the Indirect Tax Form with invalid or empty values
    When they fill out the form with invalid or empty for the following fields:
      | Province     | <province>    |
      | Indirect Tax | <indirectTax> |
      | VAT Number   | <vatNumber>   |
    Then the form displays the respective errors for each field:
      | <province>    | Province is required            |
      | <indirectTax> | Indirect tax number is required |
      | <vatNumber>   | VAT number is required          |
	#   AL: Add case that handles errors thrown by backend, depends on the backend if they are doing that validation

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
