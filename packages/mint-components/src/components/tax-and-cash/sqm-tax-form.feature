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
    Then they proceed to <stepX>
    Examples: 
      | firstName | lastName | email                 | countryCode | currency | participantType       | allowBankingCollection | option                                                           | stepX |
      | Bob       | Johnson  | bob.johnson@email.com | CA          | CAD      | businessEntity        | true                   | I am registered for HST in Canada                                | 3     |
      | Jane      | Moe      | jane.moe@email.com    | CA          | CAD      | individualParticipant | true                   | I am registered for HST in Canada                                | 3     |
      | Dane      | Coe      | dane.coe@email.com    | US          | USD      | individualParticipant | true                   | I am registered for Indirect Tax in a different Country / Region | 3     |
      | David     | Renar    | david.renar@email.com | US          | USD      | businessEntity        | true                   | I am registered for Indirect Tax in a different Country / Region | 3     |
      | Jose      | Querv    | jose.querv@email.com  | MX          | MEX      | individualParticipant | true                   | I am registered for Indirect Tax in a different Country / Region | 3     |
      | Charle    | Buck     | charle.buck@email.com | UK          | GBP      | businessEntity        | true                   | I am not registered for Indirect Tax                             | 3     |
    #Come in here and add more examples for countries and currencies beyond canada
    
    
    Scenario Outline: {talk more about indirect tax and how that works}

    @minutia
    Scenario Outline: Participants based in the US or working with US brands have to fillout docusign forms
    Given a brand based in <brandCountry> 
    And the user selects <country> and <participantType> in step 1
    When they view step 3
    Then the <autoSelectedForm> is displayed
    ##Finish the spec here
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

    @minutia
    Scenario Outline: Participants based another country working with non-US brands do not have to fillout docusign forms
    Given a brand based in <brandCountry>
    And the brand is not in the US 
    And the user selects a <country> not in the US and <participantType> in step 1
    Then they skip step 3
    Examples:
    | brandCountry | country | participantType       |
    | MX           | UK      | individualParticipant |
    | AUS          | EGP     | businessEntity        |

    ##Finish the spec here

    #provide more examples    

    #######################################################
    
    
  @minutia
  Scenario Outline: A Canadian user completes the User Info and Indirect Tax steps
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
    And the <hstCanada> radio option is auto-selected
    Then the user enters their <province> and <indirectTaxNumber>
    And they press "Continue"
    Then they are redirected to the Docusign Form step

    Examples: 
      | firstName | lastName | email                 | countryCode | currency | participantType       | allowBankingCollection | hstCanada | otherRegion | notRegistered | province         | country | indirectTaxNumber | vatNumber |
      | Bob       | Johnson  | bob.johnson@email.com | CA          | CAD      | businessEntity        | true                   | true      | false       | false         | British Columbia | Canada  |            412321 | N/A       |
      | Jane      | Moe      | jane.moe@email.com    | CA          | CAD      | individualParticipant | true                   | true      | false       | false         | British Columbia | Canada  |            412321 | N/A       |

  @minutia
  Scenario Outline: A Canadian user completes the Docusign Form Step
    Given they completed the User Info and Indirect Tax form steps
    When they are on the Docusign Form Step
    And in the User Info Form they selected "Individual Participant" for <participantType>
    Then they must sign and fill out a "W8-BEN" Tax Form as their <selectedTaxForm>
    But if they selected "Business Entity" for <participantType>
    Then they must sign and fill out a "W8-BEN-E" Tax Form as their <selectedTaxForm>
    And they agree to the terms which sets <completedTaxForm> to true
    Then they can press "Continue" and complete the form
    And they are redirected to the Document Submitted Form screen

    Examples: 
      | participantType       | countryCode | country | selectedTaxForm | completedTaxForm |
      | individualParticipant | CA          | Canada  | W8-BEN          | true             |
      | businessEntity        | CA          | Canada  | W8-BEN-E        | true             |

  @minutia
  Scenario Outline: An United States user completes the User Info and Indirect Tax steps
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
    And the user fills out the <vatNumber>
    And they press "Continue"
    Then they are redirected to the Docusign Form step

    Examples: 
      | firstName | lastName | email                 | countryCode | currency | participantType       | allowBankingCollection | hstCanada | otherRegion | notRegistered | province | country       | indirectTaxNumber | vatNumber |
      | Bob       | Johnson  | bob.johnson@email.com | US          | USD      | businessEntity        | true                   | false     | true        | false         | N/A      | United States | N/A               |     90232 |
      | Jane      | Moe      | jane.moe@email.com    | US          | USD      | individualParticipant | true                   | false     | true        | false         | N/A      | United States | N/A               |     11920 |

  @minutia
  Scenario Outline: An United States user completes the Docusign Form Step
    Given they completed the User Info and Indirect Tax form steps
    When they are on the Docusign Form Step
    And in the User Info Form they selected either "Business Entity" or "Individual Participant" for <participantType>
    Then they must sign and fill out a "W9" Tax Form as their <selectedTaxForm>
    And they agree to the terms which sets <completedTaxForm> to true
    Then they can press "Continue" and complete the form
    And they are redirected to the Document Submitted Form screen

    Examples: 
      | participantType       | countryCode | country       | selectedTaxForm | completedTaxForm |
      | individualParticipant | US          | United States | W9              | true             |
      | businessEntity        | US          | United States | W9              | true             |

  @minutia
  Scenario Outline: A user from Another Country completes the User Info and Indirect Tax steps
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
    Then the <country> is auto-filled with the <countryCode> from the User Info Form
    But if the <country> from the User Info Form is not available in the <country> select
    Then the user selects the <notRegistered> radio option
    And the user fills out the <vatNumber>
    And they press "Continue"
    Then they are redirected to the Docusign Form step

    Examples: 
      | firstName | lastName | email                | countryCode | currency | participantType       | allowBankingCollection | hstCanada | otherRegion | notRegistered | province | country          | indirectTaxNumber | vatNumber |
      | Poe       | Smith    | poe.smith@email.com  | UK          | GBP      | businessEntity        | true                   | false     | true        | false         | N/A      | United Kingdom   | N/A               |     90232 |
      | Andy      | Jones    | andy.jones@email.com | UK          | GBP      | individualParticipant | true                   | false     | true        | false         | N/A      | United Kingdom   | N/A               |     11920 |
      | Mang      | Choon    | mang.choon@email.com | MX          | MEX      | individualParticipant | true                   | false     | true        | true          | N/A      | Mexico           | N/A               |     56201 |
      | Mang      | Choon    | mang.choon@email.com | PNG         | PGK      | businessEntity        | true                   | false     | true        | true          | N/A      | Papua New Guinea | N/A               |     72913 |

  @minutia
  Scenario Outline: A user from Another Country completes the Docusign Form Step
    Given they completed the User Info and Indirect Tax form steps
    When they are on the Docusign Form Step
    And in the User Info Form they selected "Individual Participant" for <participantType>
    Then they must sign and fill out a "W8-BEN" Tax Form as their <selectedTaxForm>
    But if they selected "Business Entity" for <participantType>
    Then they must sign and fill out a "W8-BEN-E" Tax Form as their <selectedTaxForm>
    And they agree to the terms which sets <completedTaxForm> to true
    Then they can press "Continue" and complete the form
    And they are redirected to the Document Submitted Form screen

    Examples: 
      | participantType       | countryCode | country        | selectedTaxForm | completedTaxForm |
      | individualParticipant | UK          | United Kingdom | W8-BEN          | true             |
      | businessEntity        | MX          | Mexico         | W8-BEN-E        | true             |

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

    Examples: 
      | firstName | lastName | email                | countryCode | currency | participantType       | allowBankingCollection | hstCanada | otherRegion | notRegistered | province | country | indirectTaxNumber | vatNumber |
      | Poe       | Smith    | poe.smith@email.com  | UK          | GBP      | businessEntity        | true                   | false     | true        | false         | N/A      | Mexico  | N/A               |     90232 |
      | Andy      | Jones    | andy.jones@email.com | UK          | GBP      | individualParticipant | true                   | false     | true        | false         | N/A      | Mexico  | N/A               |     11920 |

  @TODO @minutia
  Scenario Outline: A user from Another Country completes the Docusign Form Step with different countries
    Given they completed the User Info and Indirect Tax form steps
    When they are on the Docusign Form Step
    And in the User Info Form they selected "Individual Participant" for <participantType>
    Then they must sign and fill out a "W8-BEN" Tax Form as their <selectedTaxForm>
    But if they selected "Business Entity" for <participantType>
    Then they must sign and fill out a "W8-BEN-E" Tax Form as their <selectedTaxForm>
    And they agree to the terms which sets <completedTaxForm> to true
    Then they can press "Continue" and complete the form
    And they are redirected to the Document Submitted Form screen

    Examples: 
      | participantType       | countryCode | country | selectedTaxForm | completedTaxForm |
      | individualParticipant | CA          | Canada  | W8-BEN          | true             |
      | businessEntity        | CA          | Canada  | W8-BEN-E        | true             |
    # Not registered - skip to document submitted
    # Dependent on which country they choose and what participanttype they are

  @minutia
  Scenario Outline: A user completes the Document Type Form step
    Given they completed the User Info and Indirect Tax form steps
    When they are on the Document Type Form step
    Then they choose the <selectedTaxForm> type they wish to fill out in the next step:
    And press "Continue" to be redirected to the Docusign Form.

    Examples: 
      | selectedTaxForm |
      | W9              |
      | W8-BEN          |
      | W8-BEN-E        |
