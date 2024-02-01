@owner:andy @author:andy
Feature: Document Type Form

  Background: A user has submitted their information in step 1, step2, is on step 3 and wishes to change the Tax Form they submit
    Given a user is on the Document Type Form

  @minutia
  Scenario Outline: Participant presses back button
    When they press the Back button
    Then they will arrive at step 3
    And the Docusign form does not change
