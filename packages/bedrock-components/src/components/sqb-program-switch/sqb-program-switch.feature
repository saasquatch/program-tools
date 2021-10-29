Feature: Program Switch

  The program switch provides the ability to load different content based on the current programId

  Scenario: Content is displayed without changing programId
    Given the programId is set to "program-a"
    And there is a template tag with programId set to "program-a"
    When the widget renders
    Then the contents for "program-a" will be displayed

  Scenario: Widget load events occur when content with a widget is loaded
    Given the programId is set to "program-a"
    And there is a template tag with programId set to "program-a"
    And there is an sqb-widget set to the widget key for "program-a"
    When the widget renders
    Then the contents for "program-a" will be displayed

  Scenario: Changing programId automatically loads new content
    Given the programId is set to "program-a"
    And there is a template tag with programId set to "program-a"
    And there is a template tag with programId set to "program-b"
    And there is an sqb-widget set to the widget key for "program-a"
    And there is an sqb-widget set to the widget key for "program-b"
    When the widget renders
    Then the contents for "program-a" will be displayed
    When the programId is changed to "program-b"
    Then the contents for "program-b" will be displayed

