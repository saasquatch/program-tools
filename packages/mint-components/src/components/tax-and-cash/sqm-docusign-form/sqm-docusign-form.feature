@owner:andy @author:andy
Feature: Comply Exchange Form

  Background: A user has submitted their information in Step 1 and Step 2
    Given a user is on the Comply Exchange Form

  @minutia
  Scenario: Comply Exchange URL is set in iframe on page load
    When the Comply Exchange Form loads
    And the Comply Exchange URL has been fetched successfully
    Then the URL set is set on the Comply Exchange iframe
    And the iframe loads based on the URL

  @minutia
  Scenario: Web-page fails when Docusign URL cannot be fetched
    When the Comply Exchange Form loads
    But an error occurs in loading the iframe
    And the Comply Exchange URL cannot be fetched
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
    Then the Comply Exchange iframe is displayed

    Examples:
      | publisherCountry | brandCountry     | currentDocument |
      | a non-US country | US               | null            |
      | a non-US country | US               | populated       |
      | US               | a non-US country | null            |
      | US               | a non-US country | populated       |

  @minutia @ui
  Scenario Outline: Text copies change based on tax form participant fills out
    When they are required to fill out <typeTaxForm>
    And are <participantType>
    Then the page header is <header>
    And the description is <description>

    Examples:
      | typeTaxForm | participantType       | header       | description                                                                                                             |
      | W9          | N/A                   | W-9 Tax Form | Participants based in the US need to submit a W-9 form.                                                                 |
      | W8-BEN      | individualParticipant | W-8 Tax Form | Participants residing outside of the US, joining the referral program of a US-based company, need to submit a W-8 form. |
      | W8-BEN-E    | businessEntity        | W-8 Tax Form | Participants residing outside of the US who represent a business entity need to submit a W-8 form.                      |

  @minutia
  Scenario Outline: Participant completes Comply Exchange document and is directed to document summary page
    When they successfully fill out the Comply Exchange forms within the iframe
    And they get to the "Thank you" page in the iframe
    Then the Comply Exchange iframe session completes with the event "Complyexchange Thank you page Exit"
    And a request is sent to mark the document as completed
    When the request <status>
    Then they <may> be redirected to step 4

    Examples:
      | status   | may      |
      | fails    | will not |
      | succeeds | will     |

  @minutia @ui
  Scenario: Comply Exchange iframe is loading
    When the Comply Exchange iframe is loading the Tax Form
    Then the iframe is hidden
    And a loading spinner appears
    When the Comply Exchange iframe loads in the Tax Form
    Then the loading spinner disappears and the participant can see the Tax Form

  @minutia @ui
  Scenario: Participant's Comply Exchange session expires
    When they have the Comply Exchange form open in the iframe
    And they do not interact with the iframe for more than 30 minutes
    Then the Comply Exchange iframe session expires

  @minutia
  Scenario: Participant cannot go back to previous steps
    When they view the Comply Exchange form
    Then no back button will be present

  @minutia
  Scenario: Error banner on form load failure
    Given a participant loads the Comply Exchange form
    And they have a required tax document type
    And the request to get the Comply Exchange url fails
    Then an error banner is shown
    And the banner has title
      """
      There was a problem loading your form
      """
    And the banner has description
      """
      Please refresh the page and try again. If this problem continues, contact Support.
      """

  @minutia
  Scenario: Error banner on form submit failure
    Given a participant loads the Comply Exchange form
    And they correctly fill out all forms in the iframe
    And the "Complyexchange Thank you page Exit" event is fired
    When the document fails to complete
    Then a general error banner is shown
    And the banner has title
      """
      There was a problem submitting your information
      """
    And the banner has description
      """
      Please review your information and try again. If this problem continues, contact Support.
      """