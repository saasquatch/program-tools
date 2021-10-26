Feature: Program Switch

  The program switch provides the ability to load different program widgets based on the current programId

  Scenario: Default programId
    Given the programId is set to "program-a"
    And there is an sqb-widget set to the widget key for "program-a"
    When the widget renders
    Then the contents for "program-a" will be displayed
    And a widget load event will occur

  Scenario: Changing programId
    Given the programId is set to "program-a"
    And there is an sqb-widget set to the widget key for "program-a"
    And there is an sqb-widget set to the widget key for "program-b"
    When the widget renders
    Then the contents for "program-a" will be displayed
    And a widget load event will occur
    When the programId is changed to "program-b"
    Then the contents for "program-b" will be displayed
    And a widget load event will occur

