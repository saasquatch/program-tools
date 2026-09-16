@owner:andy @author:andy
Feature: Partner Connection Status

  Background:
    Given user is on the Microsite or a widget that contains the cash form

  Scenario: New participants with no publisher submits partner modal
    Given a participant with no linked Impact publisher
    When they submit the partner info modal with valid country, currency, and T&C consent
    Then an Impact publisher is created for the participant
    And impactConnection.connectionStatus resolves to "STARTED"

  Scenario: New participants with an existing publisher submits partner modal
    Given a participant whose email is already linked to an Impact publisher
    When they submit the partner info modal with valid country, currency, and T&C consent
    Then the existing Impact publisher is used and not updated
    And impactConnection.connectionStatus resolves to "STARTED"

  Scenario: User has not filled out User Info Form
    Given the user has a publisher
    And the publisher does not contain billing data
    When they submit the user User Info Form with their billing information
    Then impactConnection.connectionStatus resolves to "COMPLETED"

  Scenario: User has pre-existing partner which completed user info form
    Given the user has a publisher
    And the publisher contains complete billing data
    Then the user info form is skipped
    And the data is unchanged
    And impactConnection.connectionStatus resolves to "COMPLETED"
