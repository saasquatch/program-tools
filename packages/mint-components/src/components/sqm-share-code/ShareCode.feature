@author:johan
@owner:johan
Feature: Share Code

  The share code component is a box that allows users to see and copy their referral code for a given program

  Background: Environment
    Given there is a valid program ID in the environment
    And there is a valid user ID and account ID in the environment

  @motivating
  Scenario: A Users referral code can be copied to their clipboard
    Given tooltiptext is "hello tooltip"
    When the component renders
    Then there is a textbox with the user's share code
    When the clipboard icon is clicked
    Then the code is copied to clipboard
    And a tooltip will appear for ~1 second

  @minutia
  Scenario: Tooltip lifespan defaults to 2000
    Given the tooltip's lifespan is set to 2000
    And there is tooltip text
    When the component renders
    And the clipboard icon is clicked
    Then a tooltip will appear for ~2 seconds

  @minutia
  Scenario: Demo
    Given isDemo() returns true
    Then the share code is "https://www.example.com/sharelink/abc"
    And the component won't be interactive
    And the tooltip is hidden

  @minutia
  Scenario: Program ID can be sourced from prop
    Given the programId prop is set to "program-a"
    And window.widgetIdent.programId is set to "program-b"
    When the component renders
    Then the share code is for "program-a"

  @minutia
  Scenario: Program ID can be sourced from window
    Given the programId prop is unset
    And window.widgetIdent.programId is set to "program-b"
    When the component renders
    Then the share code is for "program-b"

  @minutia
  Scenario: An analytic event is fired when a user copies their code
    Given a user viewing the share code component
    And the component is rendered for "program-a"
    When they click to copy their code
    Then an "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT" analytic event is fired
    And it is for "program-a"
    And it has share medium "DIRECT"


  @ui
  Scenario: user can edit the alignment of the share code text
    Given a user is editing the share code component
    Then they see "Align text" props
    And the default value is "left"
    When they change the option to <option>
    Then they see the text in <position>
    Examples:
      | option | position |
      | left   | left     |
      | center | center   |
      | right  | right    |

  @ui
  Scenario Outline: The position of the copy button can be changed
    Given a user is editing the share code component
    Then they see "Style" props
    And the default value is "icon"
    When they change the option to <option>
    Then they see the copy button in <position>
    Examples:
      | option         | position                        |
      | button outside | outside the input, on the right |
      | button below   | outside the input, below        |
      | icon           | inside the input as an icon     |
