Feature: Server

  Scenario Outline: Resolvers are configured for mutations
    When the server is started
    Then the graphql server has a resolver configured for the <mutation>

    Examples:
      | mutation                  |
      | registerUser              |
      | authenticateUser          |
      | requestVerificationEmail  |
      | requestPasswordResetEmail |
      | resetPassword             |
      | verifyEmail               |

  Scenario: GraphQL route is configured
    Given there is a configuration for the tenant "test_123"
    When the server is started
    Then the graphql route is configured for the tenant "test_123"

  Scenario: Well-known JWKS route configured
    When the server is started
    Then the well-known jwks route is configured