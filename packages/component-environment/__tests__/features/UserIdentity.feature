@author:coleton
@owner:coleton
Feature: User identity session management

  Background:
    Given a user identity context is started

  @motivating
  Scenario Outline: User identity is initialised based on the environment
    Given the context is within <SdkEnvironment>
    When the context is initialised
    Then is it initialised based on user information with <initialisationSource>

    Examples:
      | SdkEnvironment | initialisationSource             |
      | SquatchIOS     | N/A                              |
      | SquatchAndroid | N/A                              |
      | SquatchJS2     | widgetIdent                      |
      | SquatchPortal  | localStorage or jwt search param |
      | SquatchAdmin   | N/A                              |
      | None           | N/A                              |

  Scenario: If no user identity exists on initialisation, no user identity is set
    Given the context is within either SquatchJS2, or SquatchPortal environments
    When the context cannot be initialised
    Then the user identity will not be set

  Scenario: User identity context persists sessions if run within SquatchPortal environment
    Given the context is within the SquatchPortal environment
    When the user identity is set via the user identity context
    Then the "sq:user-identity" localStorage key/value pair is updated
    And it contains the updated user identity information

  Scenario: User identity is emptied if the identity jwt has expired
    Given the context is being updated with a user jwt
    And the jwt has expired
    When the context is being updated
    And the jwt is parsed
    Then the context is set to undefined

  Scenario: User identity is emptied if the identity jwt contains no user information
    Given the context is being updated with a jwt
    And the jwt has no or invalid user information
    When the context is being updated
    And the jwt is parsed
    Then the context is set to undefined

  Scenario: User identity is emptied if the identity jwt is invalid
    Given the context is being updated with a jwt
    And the jwt is invalid
    When the context is being updated
    And the jwt is parsed
    Then the context is set to undefined