@owner:andy @author:andy
Feature: Docusign Form

  Background: A user has submitted their information in Step 1 and Step 2
    Given a user is on the Docusign Form

  @minutia
  Scenario: Docusign URL is set in iframe on page load
    When the Docusign Form loads
    And the Docusign URL has been fetched successfully
    Then the URL set is set on the Docusign iframe
    And the iframe loads based on the URL

  @minutia
  Scenario: Web-page fails when Docusign URL cannot be fetched
    When the Docusign Form loads
    And the Docusign URL cannot be fetched
    Then the URL is not set on the Docusign iframe
    And the iframe is hidden
    And an error banner is displayed

  @minutia @ui
  Scenario Outline: Participant not based in the US working with US brand selects participantType
    Given a publisher's country is <publisherCountry>
    And they are linked to a brand that based in <brandCountry>
    And their current tax document type is <currentDocument>
    And their current tax document status is not "ACTIVE" or "NOT_VERIFIED"
    When the page loads
    Then <uiElements> are displayed

    Examples:
      | publisherCountry | brandCountry     | currentDocument | uiElements                                      |
      | a non-US country | US               | null            | participant type radio options                  |
      | a non-US country | US               | populated       | participant type radio options, docusign iframe |
      | US               | a non-US country | null            | docusign iframe                                 |
      | US               | a non-US country | populated       | docusign iframe                                 |

  @minutia
  Scenario Outline: W8 tax forms based on participant type
    Given a publisher's country is a non-US country
    And they are linked to a brand that based in "US"
    And current tax document type is "null"
    Then the participant type radio options are shown
    And the Docusign iframe is hidden
    When they select the <participantType> option
    Then the Docusign iframe appears
    And an <autoSelectedTaxForm> appears in the Docusign iframe

    Examples:
      | participantType       | autoSelectedTaxForm |
      | individualParticipant | W8-BEN              |
      | businessEntity        | W8-BEN-E            |

  @minutia
  Scenario Outline: Participant type radio options are disabled if they have a current tax document
    Given a publisher's country is a non-US country
    And they are linked to a brand that is based in "US"
    And the user field <userField> has value <value>
    Then the participant type radio options are disabled
    And the option <selectedOption> is auto-selected

    Examples:
      | userField                              | value  | selectedOption        |
      | user.publisher.currentTaxDocument.type | W8BEN  | individualParticipant |
      | user.publisher.currentTaxDocument.type | W8BENE | businessEntity        |

  @minutia @ui
  Scenario Outline: Text copies change based on tax form participant fills out
    When they are required to fill out <typeTaxForm>
    And are <participantType>
    Then the <taxFormSubHeader>/<taxFormDescriptionCopy> displays with <typeTaxForm>

    Examples:
      | typeTaxForm | participantType       | taxFormSubHeader  | taxFormDescriptionCopy                                                                                                     |
      | W9          | N/A                   | W9 Tax Form       | Participants based in the US and partnering with US-based brands need to submit a W9 form.                                 |
      | W8-BEN      | individualParticipant | W8-BEN Tax Form   | Participants residing outside of the US, joining the referral program of a US-based company, need to submit a W8-BEN form. |
      | W8-BEN-E    | businessEntity        | W8-BEN-E Tax Form | Participants residing outside of the US who represent a business enttiy need to submit a W8-BEN-E form.                    |

  @minutia
  Scenario: Participant successfully completes Docusign document and is directed to document summary page
    When they successfully fillout and submit the Docusign document within the iframe
    Then the Docusign iframe session completes with one of the following success statuses:
      | signing_complete |
      | viewing_complete |
    And they are redirected to step 4

  @minutia @ui
  Scenario: Docusign iframe is loading
    When the Docusign iframe is loading the Tax Form
    Then the iframe is hidden
    And a loading spinner appears
    When the Docusign iframe loads in the Tax Form
    Then the loading spinner disappears and the participant can see the Tax Form

  @minutia @ui
  Scenario: Participant's Docusign session expires
    When they have the Docusign form open in the iframe
    And they do not interact with the iframe for more than 20 minutes
    Then the Docusign iframe session expires with one of the following expiry statuses:
      | session_timeout |
      | ttl_expired     |
    And the Docusign form is hidden
    Then they see a expired session notification
    And a refresh page button appears inside the notification
    When the participant presses the refresh button
    Then the Docusign form is re-loaded

  @minutia @ui
  Scenario: Docusign iframe throws an error
    When the Docusign iframe throws one of the following error statuses:
      | exception   |
      | decline     |
      | cancel      |
      | fax_pending |
    Then the particpant sees an error notification
    And a "Refresh Page" button appears inside the notification
    When the participant presses the refresh button
    Then the Docusign form is re-loaded

  @minutia
  Scenario: Participant cannot go back to previous steps
    When they view the Docusign form
    Then no back button will be present

  @minutia
  Scenario: Error banner on form load failure
    Given a participant loads the docusign form
    And they have a required tax document type
    And the request to get the docusign url fails
    Then an error banner is shown
    And the banner has title
      """
      There was a problem loading your form
      """
    And the banner has description
      """
      Please refresh the page and try again. If this problem continues, contact Support.
      """

