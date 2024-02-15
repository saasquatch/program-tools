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

  @minutia @ui
  Scenario Outline: Text copies change based on tax form participant fills out
    When they are required to fill out <typeTaxForm>
    Then the <taxFormSubHeader> displays with <typeTaxForm>
    And the <taxFormDescriptionCopy> / <changeTaxFormCopy> changes depending on the <typeTaxForm>

    Examples: 
      | typeTaxForm | taxFormSubHeader  | taxFormDescriptionCopy                                                                                                   | changeTaxFormCopy                                                |
      | W9          | W9 Tax Form       | Participants based in the US and partnering with US-based brands need to submit a W9 form.                               | Not based in the US?                                             |
      | W8-BEN      | W8-BEN Tax Form   | Individuals residing outside of the US, joining the referral program of a US-based cmpany, need to submit a W8-BEN form. | Represent a business entity or you're based in the US?           |
      | W8-BEN-E    | W8-BEN-E Tax Form | Participants residing outside of the US who represent a business enttiy need to submit a W8-BEN-E form.                  | Joining this program as an individual or you're based in the US? |

  @minutia
  Scenario: Participant successfully submits Docusign document and is directed to summary page
    When they successfully fillout and submit the Docusign document within the iframe
    And they press "Continue" or refresh the page
    Then they will be directed to the Document Submitted page

  @minutia @ui
  Scenario: Docusign iframe is loading
    When the Docusign iframe is loading the Tax Form
    Then the iframe displays a spinnder inside the igrame
    When the Docusign iframe loads in the Tax Form
    Then the loader dissapers and the participant can see the Tax Form

  @minutia
  Scenario: Participant completes Docusign form
    When they fillout and complete the Docusign form inside the iframe
    And submit the form
    Then they are redirected to step 4

  @minutia @ui
  Scenario: Participant's Docusign session expires
    When they have the Docusign form open in the iframe
    And they do not interact with the iframe for more than 20 minutes
    Then the Docusign iframe session expires
    And the Tax Form dissapers
    Then they see a Docusign expired session notification inside the iframe
    And a refresh page button appears inside the iframe
    And they must press the button to restart the Docusign process

  @minutia @ui
  Scenario: Docusign iframe throws an error
    When the Docusign iframe throws an error
    Then an error icon and message show in the iframe
    And a "Refresh Page" button appears
    And the participant presses the refresh button

  @minutia
  Scenario: Participant decides to go back to step 2
    When they press the Back button
    Then the they are sent back to step 2
    And they arrive at the step 2 form with original information initially submitted
