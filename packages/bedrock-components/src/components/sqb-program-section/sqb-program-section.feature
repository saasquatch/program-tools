@owner:sam
@author:sam

Feature: Program Section

  Program Section is used to provide a program to a child component that will take precedence over a globally defined programId

  @motivating
  Scenario: Setting a programId on program section overrides the environment's programId
    Given the program id is "referral-program-a"
    And the "program-id" prop is set to "referral-program-b" on the program section component
    And there is a share button inside of the Program Section
    Then the share button will provide a link for the "referral-program-b" program
    And any share links outside of the container will be for "referral-program-a"

  @minutae
  Scenario: Non-existent programId's are not validated in the component
  Given the "program-id" prop is set to "FAKE-PROGRAM-1" on the program section component
  And there is a share button inside of the Program section
  Then the query for the share button's link will fail
  And there will not be an error shown by this component

  @minutae
  Scenario: Invalid programId's are not validated in the component
  Given the "program-id" prop is set to "VIP-PROGRAM-1" on the program section component
  And there is a share button inside of the Program section
  Then the query for the share button's link will fail
  And there will not be an error shown by this component
