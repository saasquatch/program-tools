Feature: Register User

  Scenario: User can sign up
    Given there is a configuration for the tenant "test_1234"
    Given A user with the email "test@example.com" does not exist
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    Then the user is registered with Google

  Scenario: Error is returned if user already exists
    Given there is a configuration for the tenant "test_1234"
    Given A user with the email "test@example.com" already exists
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    Then a "FORBIDDEN" error is thrown on registration

  Scenario: Error is returned if the password is too weak
    Given there is a configuration for the tenant "test_1234"
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "1"
      }
      """
    Then a "BAD_USER_INPUT" error is thrown on registration

  Scenario: Error is returned if unknown error occurs
    Given there is a configuration for the tenant "test_1234"
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "fails@example.com",
        "password": "123444444"
      }
      """
    Then a "INTERNAL_SERVER_ERROR" error is thrown on registration

  Scenario: Register User Webhook is called if set
    Given the "REGISTER_USER_WEBHOOK_URL" is configured for the tenant "test_1234"
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234",
        "formData": {
          "firstName": "Bob",
          "lastName": "Test"
        }
      }
      """
    Then there is a request made to the REGISTER_USER_WEBHOOK_URL with the headers and body
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
          "email": "test@example.com",
          "firstName": "Bob",
          "lastName": "Test"
        }
      }
      """
    And the userUpsert response is sent to Saasqutach core
    And the sessionData response is returned to the portal from registerUser

  Scenario: Register User Webhook is optional
    Given the "REGISTER_USER_WEBHOOK_URL" is not configured for the tenant "test_1234"
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234",
        "formData": {
          "firstName": "Bob",
          "lastName": "Test"
        }
      }
      """
    And the sessionData response is returned to the portal from registerUser with the value
      """
      {}
      """


  Scenario: SquatchJWT returned
    Given there is a configuration for the tenant "test_1234"
    When there is a request to sign up to the tenant "test_1234" with the input
      """
      {
        "email": "test@example.com",
        "password": "test1234"
      }
      """
    And the user is registered with Google
    Then a JWT is returned from registerUser
    And the JWT from registerUser is signed with the tenant API key
    And the JWT from registerUser payload contains the user
