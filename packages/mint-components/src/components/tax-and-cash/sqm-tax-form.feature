@owner:andy @author:andy
Feature: Tax Form Flow

  Background: A user submits their Tax information

  # Cases:
  # US Brand
  ## US participant - Requires W9
  ## Canadian participant - Requires W8
  ## Other country participant - Requires W8
  # Non US Brand
  ## US participant - Requires W9
  ## Canadian participant - Doesn't require a tax form
  ## Other country participant - Doesn't requore a tax form

  @minutia
  Scenario Outline: Participants can register as branded partners, provide indirect tax information and submit their tax forms
    Given they are on step 1
    When they input the following information into the form fields
      | First Name               | <firstName>              |
      | Last Name                | <lastName>               |
      | Email                    | <email>                  |
      | Country Code             | <countryCode>            |
      | Currency                 | <currency>               |
      | Participant Type         | <participantType>        |
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
      | firstName | lastName | email                  | countryCode | brandCountry | currency | participantType       | allowBankingCollection | option                                                           | stepX |
      | Bob       | Johnson  | bob.johnson@email.com  | CA          | US           | CAD      | businessEntity        | true                   | I am registered for HST in Canada                                | 3     |
      | Jane      | Moe      | jane.moe@email.com     | CA          | MX           | CAD      | individualParticipant | true                   | I am registered for HST in Canada                                | 4     |
      | Dane      | Coe      | dane.coe@email.com     | US          | CA           | USD      | individualParticipant | true                   | I am registered for Indirect Tax in a different Country / Region | 3     |
      | David     | Renar    | david.renar@email.com  | US          | MX           | USD      | businessEntity        | true                   | I am registered for Indirect Tax in a different Country / Region | 3     |
      | Jose      | Querv    | jose.querv@email.com   | UK          | US           | GBP      | individualParticipant | true                   | I am registered for Indirect Tax in a different Country / Region | 3     |
      | David     | Blaine   | david.blaine@email.com | UK          | MX           | GBP      | individualParticipant | true                   | I am registered for Indirect Tax in a different Country / Region | 4     |
      | Charle    | Buck     | charle.buck@email.com  | EG          | US           | EGP      | businessEntity        | true                   | I am not registered for Indirect Tax                             | 3     |
      | Pam       | Herd     | pam.herd@email.com     | EG          | MX           | BMD      | businessEntity        | true                   | I am not registered for Indirect Tax                             | 4     |

  @minutia
  Scenario Outline: Different indirect tax inputs are shown depending on the country of a participant
    When <option> is selected based on based the participant <country> from step 1
    Then different <inputs> appear

    Examples:
      | country | option                                                           | inputs                        |
      | CA      | I am registered for HST in Canada                                | Province, Indirect Tax Number |
      | US      | I am registered for Indirect Tax in a different Country / Region | Country, VAT Number           |
      | UK      | I am registered for Indirect Tax in a different Country / Region | Country, VAT Number           |
      | EG      | I am not registered for Indirect tax                             | N/A, N/A                      |

  @minutia
  Scenario Outline: Participants based in the US or working with US brands have to fillout docusign forms
    Given a brand based in <brandCountry>
    And the user selects <country> and <participantType> in step 1
    When they view step 3
    Then the <autoSelectedForm> is displayed

    Examples:
      | brandCountry | country | participantType       | autoSelectedForm |
      | US           | US      | individualParticipant | W9               |
      | CA           | US      | businessEntity        | W9               |
      | US           | CA      | individualParticipant | W8-BEN           |
      | US           | CA      | businessEntity        | W8-BEN-E         |
      | US           | MX      | individualParticipant | W8-BEN           |
      | US           | MX      | businessEntity        | W8-BEN-E         |

  @minutia
  Scenario Outline: Participants based in the US working with non-US brands have to fillout the W9 docusign form
    Given a brand based in <brandCountry>
    And the user selects <country> and <participantType> in step 1
    When they view step 3
    Then the <autoSelectedForm> is displayed

    Examples:
      | brandCountry | country | participantType       | autoSelectedForm |
      | MX           | US      | individualParticipant | W9               |
      | UK           | US      | businessEntity        | W9               |
      | AUS          | US      | businessEntity        | W9               |

  @minutia
  Scenario Outline: Participants based another country working with non-US brands do not have to fillout docusign forms
    Given a brand based in <brandCountry>
    And the brand is not in the US
    And the user selects a <country> not in the US and <participantType> in step 1
    Then they skip to step 4

    Examples:
      | brandCountry | country | participantType       |
      | MX           | UK      | individualParticipant |
      | AUS          | EGP     | businessEntity        |

  @minutia
  Scenario Outline: Participant changes Tax Form to fillout in step 3
    Given they are on step 3
    And they press the <changeTaxFormCopy> text
    Then they will proceed to the Document Type Change form
    And they see three tax form type options
    When they select the <taxFormTypeOption> option
    And press "Continue"
    Then they will be sent back to step 3
    And the Docusign iframe will load the <newTaxForm> to fill out

    Examples:
      | changeTaxFormCopy                                                | taxFormTypeOption | newTaxForm |
      | Not based in the US?                                             | W8-BEN-E          | W8-BEN-E   |
      | Represent a business entity or you're based in the US?           | W9                | W9         |
      | Joining this program as an individual or you're based in the US? | W8-BEN            | W8-BEN     |

  # Undecided behaviour
  # Scenario: Returning to the docusign iframe page shows the previously selected option from the document type page

  @minutia @ui
  Scenario: Participant finishes tax form flow and sees status of their tax form submission
    Given they are on step 3
    And finishes filling out the Docusign form
    And they check the "completedTaxForm" checkbox
    And they press Continue
    Then they proceed to step 4
    And they see the Tax Document Submitted page

  # Scenario: Skipping the docusign page (some users don't need to sign a tax form) - Submission page spec

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

  @TODO @minutia
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
