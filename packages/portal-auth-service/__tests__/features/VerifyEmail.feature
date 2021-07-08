Feature: Reset Password

  Scenario: User can verify thier email with a valid oobCode
    Given there is a configuration for the tenant "test_1234"
    When there is a request to verify a users email to the tenant "test_1234" with a valid oobCode
    Then the users email will be verified
    And a success response is sent to the portal from verifyEmail

  Scenario Outline: Errors are sent to the portal if the email fails to verify
    Given there is a configuration for the tenant "test_1234"
    When there is a request to verify a users email to the tenant "test_1234"
    And the email verification fails with the <error>
    Then a <errorCode> error is sent to the portal from verifyEmail

    Examples:
      | error                    | errorCode             |
      | auth/expired-action-code | UNAUTHENTICATED       |
      | auth/invalid-action-code | UNAUTHENTICATED       |
      | auth/user-not-found      | UNAUTHENTICATED       |
      | auth/user-disabled       | FORBIDDEN             |
      | some-other-error         | INTERNAL_SERVER_ERROR |