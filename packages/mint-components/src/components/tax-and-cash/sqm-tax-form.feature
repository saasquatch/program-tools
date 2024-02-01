@owner:andy
@author:andy

Feature: Tax Form Flow

  Background: A user submits their Tax information

  @minutia
  Scenario Outline: A user completes the User Info and Indirect Tax steps
    When they are on the User Info Form step
    Then they fill out the following form fields with their personal information:
      | First Name               | <firstName>              |
      | Last Name                | <lastName>               |
      | Email                    | <email>                  |
      | Country Code             | <countryCode>            |
      | Currency                 | <currency>               |
      | Participant Type         | <participantType>        |
      | Allow Banking Collection | <allowBankingCollection> |
    And  they agree to the terms which sets <allowBankingCollection> to true
    Then they can press "Continue" to move on to the Indirect Tax Form
    When they are redirected to the Indrect Tax Form step
    Then they select <hstCanada>, <otherRegion>, or <notRegistered> and fill out one of the following information:
      | <hstCanada>     | I am registered for HST in Canada                                | <province> | <indirectTaxNumber> |
      | <otherRegion>   | I am registered for Indirect Tax in a different Country / Region | <country>  | <vatNumber>         |
      | <notRegistered> | I am not registered for Indirect Tax                             | N/A        | N/A                 |
    Then press "Continue" to be redirected to the Document Type Form
    Examples:
      | firstName | lastName | email                 | countryCode | currency | participantType       | allowBankingCollection | hstCanada | otherRegion | notRegistered | province         | country       | indirectTaxNumber | vatNumber |
      | John      | Doe      | john.doe@email.com    | US          | USD      | individualParticipant | true                   | true      | false       | false         | N/A              | United Stated | N/A               | 10829     |
      | Bob       | Johnson  | bob.johnson@email.com | CA          | CAD      | businessEntity        | true                   | false     | true        | false         | British Columbia | N/A           | 412321            | N/A       |
      | Martin    | Renny    | bob.johnson@email.com | UK          | GBP      | individualParticipant | true                   | false     | false       | false         | N/A              | N/A           | N/A               | N/A       |

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

  @minutia
  Scenario Outline: A user completes the Docusign Form Step
    Given they completed the User Info, Indirect Tax, and Document Type Form steps
    When they are redirected to the Docusign Form step
    Then a Docusign iframe appears with the specified <selectedTaxForm> from the last step
    Then they must complete and sign the form in the Docusign iframe
    And  they agree to the terms which sets <completedTaxForm> to true
    Then they can press "Continue" and complete the form.
    Examples:
      | selectedTaxForm | completedTaxForm |
      | W9              | true             |
      | W8-BEN          | true             |
      | W8-BEN-E        | true             |


