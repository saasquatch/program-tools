@author:johan
@owner:johan
Feature: Share Link

  The share link component is a box that allows users to see and copy their share link for a given program

  Background: Environment
    Given there is a valid program ID in the environment
    And there is a valid user ID and account ID in the environment

  @motivating
  Scenario: A Users sharelink can be copied to their clipboard
    Given tooltiptext is "hello tooltip"
    When the component renders
    Then there is a textbox with the user's share link
    When the clipboard icon is clicked
    Then the link is copied to clipboard
    And a tooltip appears for ~1 second

  @minutae
  Scenario: Tooltip lifespan defaults to 2000
    Given the tooltip's lifespan is set to 2000
    And there is tooltip text
    When the component renders
    And the clipboard icon is clicked
    Then a tooltip appears for ~2 seconds

  @minutae
  Scenario: Demo
    Given isDemo() returns true
    Then the share link is "https://www.example.com/sharelink/abc"
    And the component won't be interactive
    And the tooltip is hidden

  @minutae
  Scenario: Program ID can be sourced from prop
    Given the programId prop is set to "program-a"
    And window.widgetIdent.programId is set to "program-b"
    When the component renders
    Then the share link is for "program-a"

  @minutae
  Scenario: Program ID can be sourced from window
    Given the programId prop is unset
    And window.widgetIdent.programId is set to "program-b"
    When the component renders
    Then the share link is for "program-b"

  @minutae
  Scenario: An analytic event is fired when a user copies their sharelink
    Given a user viewing the share link component
    And the component is rendered for "program-a"
    When they click to copy their link
    Then an "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT" analytic event is fired
    And it is for "program-a"
    And it has share medium "DIRECT"
