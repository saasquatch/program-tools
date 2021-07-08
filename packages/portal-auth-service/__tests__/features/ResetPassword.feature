Feature: Reset Password

  Scenario: User can reset their password with a valid oobCode
    Given there is a configuration for the tenant "test_1234"
    When there is a request to reset a users password to the tenant "test_1234" with a valid oobCode
    Then the users password will be reset
    And a success response is sent to the portal from resetPassword

  Scenario Outline: Errors are sent to the portal if the password fails to update
    Given there is a configuration for the tenant "test_1234"
    When there is a request to reset a users password to the tenant "test_1234"
    And the password reset fails with the <error>
    Then a <errorCode> error is sent to the portal from resetPassword

    Examples:
      | error                    | errorCode             |
      | auth/expired-action-code | UNAUTHENTICATED       |
      | auth/invalid-action-code | UNAUTHENTICATED       |
      | auth/user-not-found      | UNAUTHENTICATED       |
      | auth/user-disabled       | FORBIDDEN             |
      | auth/weak-password       | BAD_USER_INPUT        |
      | some-other-error         | INTERNAL_SERVER_ERROR |