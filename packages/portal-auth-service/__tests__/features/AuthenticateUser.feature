Feature: Authenticate User

  Scenario: User can authenticate with email and password
    Given there is a configuration for the tenant "test_1234"
    When there is a request to sign in to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    Then the user is authenticated with Google

  Scenario Outline: Error is returned if authentication fails
    Given there is a configuration for the tenant "test_1234"
    Given there was a request to sign in to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    When the user fails to authenticate with Google with the error <error>
    Then a <errorCode> error is thrown on authentication

    Examples:
      | error               | errorCode       |
      | auth/invalid-email  | UNAUTHENTICATED |
      | auth/user-not-found | UNAUTHENTICATED |
      | auth/wrong-password | UNAUTHENTICATED |
      | auth/user-disabled  | FORBIDDEN       |


  Scenario: User Authentication Webhook is called if set
    Given the "AUTHENTICATE_USER_WEBHOOK_URL" is configured for the tenant "test_1234"
    When there is a request to sign in to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    Then there is a request made to the AUTHENTICATE_USER_WEBHOOK_URL with the headers and body
      """
      {
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "x-hook-jws-rfc-7797": "xx..xx"
        },
        "body": {
          "id": "squatchy_123456",
          "accountId": "squatchy_123456",
          "tenantAlias": "test_1234",
          "email": "test@example.com"
        }
      }
      """
    And the sessionData response is returned to the portal from authenticateUser

  Scenario: User Authentication Webhook is optional
    Given the "AUTHENTICATE_USER_WEBHOOK_URL" is not configured for the tenant "test_1234"
    When there is a request to sign in to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    And the sessionData response is returned to the portal from authenticateUser with the value
      """
      {}
      """


  Scenario: SquatchJWT returned
    Given there is a configuration for the tenant "test_1234"
    When there is a request to sign in to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    And the user is authenticated with Google
    Then a JWT is returned from authenticateUser
    And the JWT from authenticateUser is signed with the tenant API key
    And the JWT from authenticateUser payload contains the user
