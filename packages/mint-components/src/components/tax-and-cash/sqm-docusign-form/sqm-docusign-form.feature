@owner:andy @author:andy
Feature: Docusign Form

  Background: A user has submitted their information in Step 1 and Step 2
    Given a user is on the Docusign Form

  @minutia
  Scenario: Docusign URL is set in iframe on page load
    When the Docusign Form loads
    And the Docusign URL has been fetched
    Then the URL set is set on the Docusign iframe
    And the iframe loads based on the URL

  @minutia
  Scenario: Web-page fails when Docusign URL cannot be fetched
    When the Docusign Form loads
    And the Docusign URL cannot be fetched
    Then the URL is not set on the Docusign iframe
    And the iframe fails to load

  @minutia
  Scenario Outline: Participant not based in the US working with US brand selects participantType
    Given they are not in the US and the brand is in the US
    When the page loads
    Then <participantType> radio buttons appear
    And the Docusign iframe is hidden
    When they select <participantType>
    Then the Docusign iframe appears
    And an <autoSelectedTaxForm> appears in the Docusign iframe

    Examples: 
      | participantType       | autoSelectedTaxForm |
      | individualParticipant | W8-BEN              |
      | company               | W8-BEN-E            |

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
