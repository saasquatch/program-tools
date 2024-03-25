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
    And the "notRegistered" option is selected by default
    When they complete filling out their indirect tax information
    And press "Continue"
    Then they proceed to <stepX> depending on the <brandCountry> and participants <countryCode>
    Examples: 
      | countryCode | brandCountry | stepX |
      | CA          | US           |     3 |
      | CA          | MX           |     4 |
      | US          | CA           |     3 |
      | US          | MX           |     3 |
      | UK          | US           |     3 |
      | UK          | MX           |     4 |
      | EG          | US           |     3 |
      | EG          | MX           |     4 |

  @motivating
  Scenario Outline: Default form step is dependent on publisher connection status and saved publisher information
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
      | has tax info           | is connected     | does have required doc     | does have current doc     | INACTIVE | n/a                               | step 4    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | NEW      | n/a                               | step 3    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | ACTIVE   | does not have withdrawal settings | step 4    |
      | has tax info           | is connected     | does have required doc     | does have current doc     | ACTIVE   | do have withdrawal settings       | dashboard |
      | has tax info           | is connected     | does not have required doc | does not have current doc | n/a      | does not have withdrawal settings | step 4    |
      | has tax info           | is connected     | does not have required doc | does not have current doc | n/a      | do have withdrawal settings       | dashboard |

  @minutia
  Scenario Outline: Participant is already registered as partner, provides indirect tax information, and submit their tax forms
    Given the they are already registered as a partner
    Then step 1 displays a banner with "An account with this email already exists with our referral program provider, impact.com" notifying that they are a partner
    And the following fields are pre-filled:
      | First name   |
      | Last name    |
      | Email        |
      | Country code |
      | Currency     |
    And they check "Allow Banking Collection"
    When they press "Continue"
    Then they proceed to step 2
    And they see the following radio options
      | Not registered for indirect tax |
      | Registered for indirect tax     |
    And the radio option is auto-selected based on their saved Indirect Tax Country
    And the following fields are pre-filled if they exist
      | Indirect tax Country   |
      | Indirect tax Number    |
      | Sub-region             |
      | Withholding tax number |
      | Withholding tax Region |
      | QST Number             |
    When they press "Continue"
    Then they proceed to <stepX> depending on their <brandCountry> and participants <countryCode>

    Examples: 
      | countryCode | brandCountry | stepX |
      | CA          | US           |     3 |
      | CA          | MX           |     4 |
      | US          | CA           |     3 |
      | US          | MX           |     3 |
      | UK          | US           |     3 |
      | UK          | US           |     3 |
      | ES          | US           |     3 |
      | EG          | MX           |     4 |

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
    Then a general error banner appears
    And the banner has the following title
      """
      There was a problem submitting your information
      """
    And the banner has the following description
      """
      Please review your information and try again. If this problem continues, contact Support.
      """

  @minutia
  Scenario: A loading error banner appears when a form fails to load
    When the participant views a form step
    Then a request is made to fetch the form data
    But the request fails
    Then a loading error banner appears
    And the banner has the following title
      """
      There was a problem loading your form
      """
    And the banner has the following description
      """
      Please refresh the page and try again. If this problem continues, contact Support.
      """

  @minutia @landmine
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

  @minutia
  Scenario: "Edit Payout Information" button redirects to Banking Info step and shows "Back" button
    Given a user is on the Dashboard step
    When they click the "Edit Payout Information" button if they can
    And they are redirected to the Banking Info step
    Then they will see a "Back" button
    And they may click the "Back" button to return to the Dashboard step

  @minutia
  Scenario: "Submit New Form" button redirects to Docusign step and shows "Back" button
    Given a user is on the Dashboard step
    When they click the "Submit New Form" button if they can
    And they are redirected to the Docusign step
    Then they will see a "Back" button
    And they may click the "Back" button to return to the Dashboard step

  @minutia
  Scenario: Error banner is shown if impact user graphql request has an error
    Given a user is viewing the component
    And the request for the user returns with errors
    Then the form / dashboard is not shown
    And an error banner is shown
