@owner:andy @author:andy
Feature: Tax Form Flow

  Background: A user submits their Tax information

  @minutia
  Scenario Outline: Participants can register as branded partners, provide indirect tax information and submit their tax forms
    Given they are on step 1
    When they input information into the following form fields
      | firstName              |
      | lastName               |
      | email                  |
      | countryCode            |
      | currency               |
      | allowBankingCollection |
    And press "Continue"
    Then they may proceed to step 2
    When they arrive on step 2
    Then they see the following radio options
      | Not registered for indirect tax |
      | Registered for indirect tax     |
    But <option> is selected by default
    When they complete filling out their indirect tax information
    And press "Continue"
    Then they proceed to <stepX> depending on the <brandCountry> and participants <countryCode>

    Examples:
      | firstName | lastName | email                  | countryCode | brandCountry | currency | allowBankingCollection | option                               | stepX |
      | Bob       | Johnson  | bob.johnson@email.com  | CA          | US           | CAD      | true                   | I am registered for Indirect Tax     | 3     |
      | Jane      | Moe      | jane.moe@email.com     | CA          | MX           | CAD      | true                   | I am registered for Indirect Tax     | 4     |
      | Dane      | Coe      | dane.coe@email.com     | US          | CA           | USD      | true                   | I am not registered for Indirect Tax | 4     |
      | David     | Renar    | david.renar@email.com  | US          | MX           | USD      | true                   | I am not registered for Indirect Tax | 4     |
      | Jose      | Querv    | jose.querv@email.com   | UK          | US           | GBP      | true                   | I am registered for Indirect Tax     | 3     |
      | David     | Blaine   | david.blaine@email.com | UK          | MX           | GBP      | true                   | I am registered for Indirect Tax     | 4     |
      | Charle    | Buck     | charle.buck@email.com  | EG          | US           | EGP      | true                   | I am not registered for Indirect Tax | 3     |
      | Payton    | Chan     | payton.chan@email.com  | EG          | MX           | EGP      | true                   | I am not registered for Indirect Tax | 4     |

  Scenario Outline: Default form step on load
    Given the participant just loaded the form
    And participant <hasTax>
    And participant <isConnected>
    And participant <hasRequiredDoc>
    And participant <hasCurrentTaxDoc>
    And participant current tax document has status <status>
    And participant <hasWithdrawalSettings>
    Then they proceed to <stepX>

    Examples:
      | hasTax                 | isConnected      | hasRequiredDoc             | hasCurrentTaxDoc          | status   | hasWithdrawalSettings             | stepX     |
      | does not have tax info | is not connected | n/a                        | n/a                       | n/a      | n/a                               | step 1    |
      | does not have tax info | is connected     | n/a                        | n/a                       | n/a      | n/a                               | step 1    |
      | has tax info           | is not connected | n/a                        | n/a                       | n/a      | n/a                               | step 1    |
      | has tax info           | is connected     | does have required doc     | does not have current doc | n/a      | n/a                               | step 3    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | INACTIVE | n/a                               | step 3    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | NEW      | n/a                               | step 3    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | ACTIVE   | does not have withdrawal settings | step 4    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | ACTIVE   | do have withdrawal settings       | dashboard |
      | has tax info           | is connected     | does not have required doc | does not have current doc | n/a      | does not have withdrawal settings | step 4    |
      | has tax info           | is connected     | does not have required doc | does not have current doc | n/a      | do have withdrawal settings       | dashboard |
  # TODO: Can a publisher have tax info but not be connected

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
    And they see the following radio options
      | Not registered for indirect tax |
      | Registered for indirect tax     |
    But <option> is selected by default
    And the <fields> are pre-filled
    And press "Continue"
    Then they proceed to <stepX> depending on the <brandCountry> and participants <countryCode>

    Examples:
      | countryCode | brandCountry | currency | allowBankingCollection | option                          | fields                                                       | stepX |
      | CA          | US           | CAD      | true                   | Registered for indirect tax     | Country, Province, HST/GST Number, QST Number (optional)     | 3     |
      | CA          | MX           | CAD      | true                   | Not registered for indirect tax | N/A                                                          | 4     |
      | US          | CA           | USD      | true                   | Not registered for indirect tax | N/A                                                          | 3     |
      | US          | MX           | USD      | true                   | Not registered for indirect tax | N/A                                                          | 3     |
      | UK          | US           | GBP      | true                   | Not registered for indirect tax | N/A                                                          | 3     |
      | UK          | US           | GBP      | true                   | Registered for indirect tax     | Country, VAT Number                                          | 3     |
      | ES          | US           | EGP      | true                   | Registered for indirect tax     | Country, Sub Region, VAT Number, Income Tax Number(optional) | 3     |
      | EG          | MX           | BMD      | true                   | Not registered for indirect tax | N/A                                                          | 4     |

  @minutia
  Scenario Outline: Participants based in another country working with non-US brands do not have to fillout docusign forms
    Given a brand based in <brandCountry>
    And the brand is not in the US
    And the user selects a <country> not in the US
    Then they skip to step 4 Payout Details

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
      | US           | CA      | company               | W8-BEN-E         |
      | US           | MX      | individualParticipant | W8-BEN           |
      | US           | MX      | company               | W8-BEN-E         |

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
    And complete their payout details
    And they press Continue
    Then they see the Dashboard page with no Tax Document present

  @minutia
  Scenario: Participant finishes tax form flow and sees status of their tax form submission
    Given they are on step 3
    And finishes filling out the Docusign form
    And they press Continue
    Then they proceed to step 4
    And complete their payout details
    And they press Continue
    Then hey see the Dashboard page

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

  @minutia
  Scenario: A loading error banner appears when a form fails to load
    When the participant views a form step
    Then a request is made to fetch the form data
    But the request fails
    Then a loading error banner appears with <loadingErrorAlertHeader> and <loadingErrorAlertDescription>

    Examples:
      | loadingErrorAlertHeader               | loadingErrorAlertDescription                                                       |
      | There was a problem loading your form | Please refresh the page and try again. If this problem continues, contact Support. |

  @minutia
  Scenario: A general error banner appears upon form load request failing
    Given a participant loads a step of the form
    When any request while loading the form fails
    Then a general loading error banner appears with <generalTitle> and <generalDescription>

    Examples:
      | generalTitle | generalDescription |
      | TODO         | TODO               |

  @minutia
  @landmine
  Scenario: "Submit New Form" on Dashboard resets tax form progress
    Given a user has successfully submitted a tax document
    And they are on the Dashboard step
    When they click the "Submit New Form" button
    Then they are brought to the Docusign form submission step
    And refreshing the page keeps them on the Docusign form submission step

  @minutia
  Scenario: Submitting a tax document with withdrawalSettings saved skips the banking info form step
    Given a user on the Docusign form submission step
    And they have previously saved withdrawal/banking information
    When they successfully submit a tax document
    Then they are sent to the Dashboard step
    And they skip the banking info form step