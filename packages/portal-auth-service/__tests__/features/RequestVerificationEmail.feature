Feature: Request Email Verification email

  Scenario Outline: User can request email verification
    Given there is a configuration for the tenant "test_1234"
    And a user <may> exist with the email "test@example.com"
    When there is a request for a verification email to the tenant "test_1234" with the email "test@example.com"
    Then a email verification email <will> be queued
    And a success response is sent to the portal from requestVerificationEmail

    Examples:
      | may      | will     |
      | does not | will not |
      | does     | will     |


  Scenario: If no oobCode exists an Error is thrown
    Given there is a configuration for the tenant "test_1234"
    And a user does exist with the email "test@example.com"
    When there is a request for a verification email to the tenant "test_1234" and no oobCode is returned
    Then an error will be returned from requestVerificationEmail