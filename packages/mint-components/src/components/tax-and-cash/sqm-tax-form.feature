@owner:andy @author:andy
Feature: Tax Form Flow

  Background: A user submits their Tax information

  @minutia
  Scenario Outline: Participants can register as branded partners, provide indirect tax information and submit their tax forms
    Given they are on step 1
    When they input the following information into the form fields
      | First Name               | <firstName>              |
      | Last Name                | <lastName>               |
      | Email                    | <email>                  |
      | Country Code             | <countryCode>            |
      | Currency                 | <currency>               |
      | Allow Banking Collection | <allowBankingCollection> |
    And press "Continue"
    Then they proceed to step 2
    And they see three options
      | I am registered for HST in Canada                                |
      | I am registered for Indirect Tax in a different Country / Region |
      | I am not registered for Indirect Tax                             |
    But <option> is selected by default
    When they complete filling out their indirect tax information
    And press "Continue"
    Then they proceed to <stepX> depending on the <brandCountry> and participants <countryCode>

    Examples: 
      | firstName | lastName | email                  | countryCode | brandCountry | currency | allowBankingCollection | option                               | stepX |
      | Bob       | Johnson  | bob.johnson@email.com  | CA          | US           | CAD      | true                   | I am registered for Indirect Tax     |     3 |
      | Jane      | Moe      | jane.moe@email.com     | CA          | MX           | CAD      | true                   | I am registered for Indirect Tax     |     4 |
      | Dane      | Coe      | dane.coe@email.com     | US          | CA           | USD      | true                   | I am not registered for Indirect Tax |     4 |
      | David     | Renar    | david.renar@email.com  | US          | MX           | USD      | true                   | I am not registered for Indirect Tax |     4 |
      | Jose      | Querv    | jose.querv@email.com   | UK          | US           | GBP      | true                   | I am registered for Indirect Tax     |     3 |
      | David     | Blaine   | david.blaine@email.com | UK          | MX           | GBP      | true                   | I am registered for Indirect Tax     |     4 |
      | Charle    | Buck     | charle.buck@email.com  | EG          | US           | EGP      | true                   | I am not registered for Indirect Tax |     3 |
      | Payton    | Chan     | payton.chan@email.com  | EG          | MX           | EGP      | true                   | I am not registered for Indirect Tax |     4 |

  @minutia
  Scenario: Participant is already registered as partner, provides indirect tax information, and submit their tax forms
    Given the they are already registered as a partner
    Then step 1 displays a banner with "An account with this email already exists with our referral program provider, impact.com" notifying that they are a partner
    And the following fields are pre-filled:
      | First Name   |
      | Last Name    |
      | Email        |
      | Country Code |
      | Currency     |
    And they check "Allow Banking Collection"
    And press "Continue"
    Then they proceed to step 2
    And they see three options
      | I am registered for HST in Canada                                |
      | I am registered for Indirect Tax in a different Country / Region |
      | I am not registered for Indirect Tax                             |
    But <option> is selected by default
    And the <fields> are pre-filled
    And press "Continue"
    Then they proceed to <stepX> depending on the <brandCountry> and participants <countryCode>

    Examples: 
      | countryCode | brandCountry | currency | allowBankingCollection | option                               | fields                                                 | stepX |
      | CA          | US           | CAD      | true                   | I am registered for Indirect Tax     | Country, Province, HST/GST Number, ?QST Number(Quebec) |     3 |
      | CA          | MX           | CAD      | true                   | I am not registered for Indirect Tax | Country, Province, HST/GST Number                      |     4 |
      | US          | CA           | USD      | true                   | I am not registered for Indirect Tax | N/A                                                    |     3 |
      | US          | MX           | USD      | true                   | I am not registered for Indirect Tax | N/A                                                    |     3 |
      | UK          | US           | GBP      | true                   | I am not registered for Indirect Tax | N/A                                                    |     3 |
      | UK          | US           | GBP      | true                   | I am registered for Indirect Tax     | Country, VAT Number                                    |     3 |
      | ES          | US           | EGP      | true                   | I am registered for Indirect Tax     | Country, Sub Region,VAT Number                         |     3 |
      | EG          | MX           | BMD      | true                   | I am not registered for Indirect Tax | N/A                                                    |     4 |

  @minutia
  Scenario Outline: Different indirect tax inputs are shown depending on the country of a participant
    Given they are on step 2
    When <option> is selected based on the participant <country> from step 1
    Then different <inputs> appear

    Examples: 
      | country | option                                               | inputs                                                 |
      | CA      | I am registered for Indirect Tax in a Country/Region | Country, Province, HST/GST Number, ?QST Number(Quebec) |
      | ES      | I am registered for Indirect Tax in a Country/Region | Country, Sub Region, VAT Number, ?Income Tax Number    |
      | UK      | I am registered for Indirect Tax in a Country/Region | Country, VAT Number                                    |
      | IR      | I am registered for Indirect Tax in a Country/Region | Country, GST Number                                    |
      | AU      | I am registered for Indirect Tax in a Country/Region | Country, GST Number                                    |
      | JP      | I am registered for Indirect Tax in a Country/Region | Country, CT Number                                     |
      | US      | I am not registered for Indirect tax                 | N/A                                                    |
      | EG      | I am not registered for Indirect tax                 | N/A                                                    |

  @minutia
  Scenario Outline: Participants based in another country working with non-US brands do not have to fillout docusign forms
    Given a brand based in <brandCountry>
    And the brand is not in the US
    And the user selects a <country> not in the US
    Then they skip to step 4

    Examples: 
      | brandCountry | country |
      | MX           | UK      |
      | AUS          | EGP     |

  @minutia
  Scenario Outline: Participants not based in the US working with US brands have to fillout docusign forms
    Given a brand based in <brandCountry>
    And the user selects <country> and <participantType> in step 1
    When they view step 3
    But are not based in the US
    Then they must select <participantType>
    And the <autoSelectedForm> is displayed

    Examples: 
      | brandCountry | country | participantType       | autoSelectedForm |
      | US           | CA      | individualParticipant | W8-BEN           |
      | US           | CA      | businessEntity        | W8-BEN-E         |
      | US           | MX      | individualParticipant | W8-BEN           |
      | US           | MX      | businessEntity        | W8-BEN-E         |

  @minutia
  Scenario Outline: Participants based in the US working with non-US brands have to fillout the W9 docusign form
    Given a brand based in <brandCountry>
    And the user selects <country>
    When they view step 3
    Then the <autoSelectedForm> is displayed

    Examples: 
      | brandCountry | country | autoSelectedForm |
      | MX           | US      | W9               |
      | UK           | US      | W9               |
      | AUS          | US      | W9               |

  @minutia
  Scenario: Participant finishes tax form flow and skipped Docusign form
    Given they are on step 2
    And they were not required to fillout a tax form
    And they press Continue
    Then they proceed to step 4
    And they see the Tax Document Submitted page with no Tax Document present

  @minutia
  Scenario: Participant finishes tax form flow and sees status of their tax form submission
    Given they are on step 3
    And finishes filling out the Docusign form
    And they check the "completedTaxForm" checkbox
    And they press Continue
    Then they proceed to step 4
    And they see the Tax Document Submitted page

  @minutia
  Scenario: A general error banner appears upon form submission request failing
    When the participant completes a form with their information
    And they press "Continue" to submit the form
    Then a request is made to save the form data
    But the request fails
    Then a general error banner appears with <generalTitle> and <generalDescription>

    Examples: 
      | generalTitle                                    | generalDescription                                                                       |
      | There was a problem submitting your information | Please review your information and try again. If this problem continues, contact Support |
  # Undecided behaviour
  # Scenario: Returning to the docusign iframe page shows the previously selected option from the document type page

  @unknown @minutia
  Scenario Outline: A user from Another Country completes the User Info and Indirect Tax steps with different countries
    Given they are on the User Info Form step
    And they fill out the following form fields with their personal information:
      | First Name               | <firstName>              |
      | Last Name                | <lastName>               |
      | Email                    | <email>                  |
      | Country Code             | <countryCode>            |
      | Currency                 | <currency>               |
      | Participant Type         | <participantType>        |
      | Allow Banking Collection | <allowBankingCollection> |
    When they select "Individual Participant" or "Business Entity" for <participantType>
    And they agree to the terms which sets <allowBankingCollection> to true
    When they press "Continue" to move on to the Indirect Tax Form
    Then they are redirected to the Indirect Tax Form step
    When they are the Indirect Tax Form Step
    Then three options <hstCanada>, <otherRegion>, or <notRegistered> will be presented:
      | <hstCanada>     | I am registered for HST in Canada                                | <province> | <indirectTaxNumber> |
      | <otherRegion>   | I am registered for Indirect Tax in a different Country / Region | <country>  | <vatNumber>         |
      | <notRegistered> | I am not registered for Indirect Tax                             | N/A        | N/A                 |
    And the <otherRegion> radio-option is auto-selected
    And the <country> is auto-filled with the <countryCode> from the User Info Form
    But if the user changes the auto-filled <country> ---------- What happens?
    And the user fills out the <vatNumber>
    And they press "Continue"
    Then they are redirected to the Docusign Form step
