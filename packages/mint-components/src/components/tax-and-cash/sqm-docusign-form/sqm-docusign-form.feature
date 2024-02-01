@owner:andy @author:andy
Feature: Docusign Form

  Background: A user has submitted their information in Step 1 and Step 2
    Given a user is on the Docusign Form

  @minutia @ui
  Scenario Outline: Text copies change based on tax form participant fills out
    When they are required to fill out <typeTaxForm>
    Then the <taxFormSubHeader> displays with "<typeTaxForm>"
    And the <taxFormDescriptionCopy> / <changeTaxFormCopy> changes depending on the <typeTaxForm>

    Examples: 
      | typeTaxForm | taxFormSubHeader  | taxFormDescriptionCopy                                                                                                   | changeTaxFormCopy                                                |
      | W9          | W9 Tax Form       | Participants based in the US and partnering with US-based brands need to submit a W9 form.                               | Not based in the US?                                             |
      | W8-BEN      | W8-BEN Tax Form   | Individuals residing outside of the US, joining the referral program of a US-based cmpany, need to submit a W8-BEN form. | Represent a business entity or you're based in the US?           |
      | W8-BEN-E    | W8-BEN-E Tax Form | Participants residing outside of the US who represent a business enttiy need to submit a W8-BEN-E form.                  | Joining this program as an individual or you're based in the US? |
#   @minutia
#   Scenario Outline: Participant changes Tax Form Type
#     When they want to change the Tax Form to be submitted
#     Then they press the <changeTaxFormCopy> text
#     And they are redirected to the Document Type Change form
#     Examples: 
#       | changeTaxFormCopy                                                |
#       | Not based in the US?                                             |
#       | Represent a business entity or you're based in the US?           |
#       | Joining this program as an individual or you're based in the US? |

  @minutia
  Scenario: Docusign iframe is loading
    When the Docusign iframe is loading the Tax Form
    Then the iframe displays a Docusign APIs loader
    When the Docusign iframe loads in the Tax Form
    Then the loader dissapers and the participant can see the Tax Form

  @minutia
  Scenario: Participant sees success notification in iframe after completing Docusign form
    When they fillout the Docusign form
    And submit the form inside the iframe
    Then they will see a Docusigns success notification inside the iframe

  @minutia
  Scenario: Participant's Docusign session expires
    When they have the Docusign form open for more than 20 minutes
    Then the Docusign iframe session expires
    And the Tax Form dissapers
    Then they will see a Docusigns expired session notification and must refresh the page to fillout the form

  @minutia
  Scenario Outline: Participant decides to go back to step 2
    When they press the Back button
    Then the they are sent back to step 2
    And they arrive at the step 2 form with original information initially submitted

  @TODO
  Scenario: Docusign iframe Fails to load
