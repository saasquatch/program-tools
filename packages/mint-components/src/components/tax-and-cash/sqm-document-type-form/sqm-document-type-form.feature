@owner:andy @author:andy
Feature: Document Type Form

  Background: A user has submitted their information in step 1, step2, and wants to change the Tax Form to submit
    Given a user is on the Document Type Form

  @minutia
  Scenario Outline: Participant changes Tax Form to fillout
    When the participant sees three <taxFormType> options with <taxFormDescription>
    And they select a <taxFormType>
    And press Continue
    Then they will be sent back to step 3 with the new <taxFormType> to fillout

    Examples: 
      | taxFormType | <taxFormDescription                                                                                                              |
      | W9          | For participantsbased in the US, joining the referral program of a US-based company.                                             |
      | W8-BEN      | For individuals residing outside of the US, joining the referral program of a US-based company                                   |
      | W8-BEN-E    | For participants residing outside of the US who represent a business entity, joining the referral prorgram of a US-based company |

  @minutia
  Scenario Outline: Participant presses back button
    When they press the Back button
    Then they will arrive at step 3
    And the Docusign form does not change
