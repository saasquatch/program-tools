@owner:andy @author:andy
Feature: Connected Partner Connection States and PFT Rules

  Background:
    Given cash payouts use Impact connection functionality and flow

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

  Scenario: NOT_STARTED has no PFT
    Given impactConnection.connectionStatus is "NOT_STARTED"
    Then no PFT exists for the user

  Scenario: STARTED creates a PFT once
    Given impactConnection.connectionStatus is "NOT_STARTED"
    And no PFT exists for the user
    When the user calls startImpactConnection with basic required details
    Then impactConnection.connectionStatus resolves to "STARTED"
    And a PFT is created for the user

  Scenario: STARTED with an existing PFT does not create another
    Given impactConnection.connectionStatus is "STARTED"
    And a PFT already exists for the user
    When the user calls startImpactConnection again
    Then no additional PFT is created

  Scenario: COMPLETED reuses the existing PFT
    Given impactConnection.connectionStatus is "STARTED"
    And a PFT already exists for the user
    When the user calls completeImpactConnection with full address and tax details
    Then impactConnection.connectionStatus resolves to "COMPLETED"
    And no additional PFT is created

  Scenario: Reward earned in NOT_STARTED does not create PFT
    Given impactConnection.connectionStatus is "NOT_STARTED"
    When the user earns a reward
    Then no PFT is created

  Scenario Outline: Reward earned in STARTED or COMPLETED uses existing PFT
    Given impactConnection.connectionStatus is "<connection_status>"
    And a PFT already exists for the user
    When the user earns a reward
    Then no additional PFT is created

    Examples:
      | connection_status |
      | STARTED           |
      | COMPLETED         |
