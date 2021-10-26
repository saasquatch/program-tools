Feature: Program Switch

  The program switch provides the ability to load different content based on the current programId

  Scenario: Default programId
    Given the programId is set to "program-a"
    And there is a template tag with programId set to "program-a"
    When the widget renders
    Then the contents for "program-a" will be displayed

  Scenario: Default programId with a program widget
    Given the programId is set to "program-a"
    And there is a template tag with programId set to "program-a"
    And there is an sqb-widget set to the widget key for "program-a"
    When the widget renders
    Then the contents for "program-a" will be displayed
    And a widget load event will occur

  Scenario: Changing programId
    Given the programId is set to "program-a"
    And there is a template tag with programId set to "program-a" and "program-b"
    And there is an sqb-widget set to the widget key for "program-a" and "program-b"
    When the widget renders
    Then the contents for "program-a" will be displayed
    And a widget load event will occur
    When the programId is changed to "program-b"
    Then the contents for "program-b" will be displayed
    And a widget load event will occur

