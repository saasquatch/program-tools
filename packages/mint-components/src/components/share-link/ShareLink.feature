Feature: Share Link

  Share link is a box for getting a user's referral share link

  Background: Environment
    Given there is a valid program ID in the environment
    And there is a valid user ID and account ID in the environment

  Scenario: Normal functionality
    Given tooltiptext is "hello tooltip"
    When the component renders
    Then there will be a textbox with the user's share link
    When the clipboard icon is clicked
    Then the link will be copied to clipboard
    And a tooltip will appear for ~1 second
  
  Scenario: Tooltip lifespan
    Given the tooltip's lifespan is set to 2000
    And there is tooltip text
    When the component renders
    And the clipboard icon is clicked
    Then a tooltip will appear for ~2 seconds

  Scenario: Demo
    Given isDemo() returns true
    Then the share link will be "https://www.example.com/sharelink/abc"
    And the component won't be interactive
    And the tooltip will be hidden

  Scenario: Program ID from prop
    Given the programId prop is set to "program-a"
    And window.widgetIdent.programId is set to "program-b"
    When the component renders
    Then the share link will be for "program-a"

  Scenario: Program ID from window
    Given the programId prop is unset
    And window.widgetIdent.programId is set to "program-b"
    When the component renders
    Then the share link will be for "program-b"
