Feature: Configuration

  Scenario Outline: Config returns common configurations regardless of tenant
    Given there are configurations for the tenants "test_123, test_456, test_789"
    When there is a config loaded with the tenant "test_123"
    Then the <variable> will be taken from the default configuration

    Examples:
      | variable                             |
      | FIREBASE_API_KEY                     |
      | FIREBASE_DB_URL                      |
      | GOOGLE_APPLICATION_CRENDENTIALS_JSON |

  # Scenario Outline: Config returns tenant specfic configuration
  #   Given there are configurations for the tenants "test_123, test_456, test_789"
  #   When there is a config loaded with the tenant "test_456"
  #   Then the <variable> will be taken from the "test_456" configuration

  #   Examples:
  #     | variable                           |
  #     | FIREBASE_AUTH_TENANT_ID            |
  #     | FIREBASE_AUTH_DOMAIN               |
  #     | PORTAL_DOMAIN                      |
  #     | VERIFY_EMAIL_EMAIL_KEY             |
  #     | RESET_PASSWORD_EMAIL_KEY           |
  #     | FIREBASE_APP_ID                    |
  #     | SQUATCH_API_KEY                    |
  #     | SQUATCH_BASE_URL                   |
  #     | ID_PREFIX                          |
  #     | AUTHENTICATE_USER_WEBHOOK_URL      |
  #     | USER_UPSERT_JSONATA_TRANSFORMATION |
  #     | REGISTER_USER_WEBHOOK_URL          |

  Scenario Outline: Required Config Variables
    Given there is a configuration for the tenant "test_123"
    And the "<variable>" is not configured for the tenant "test_123"
    When there is a config loaded with the tenant "test_123"
    Then an Error will be thrown from the config

    Examples:
      | variable                            |
      | FIREBASE_AUTH_TENANT_ID             |
      | FIREBASE_AUTH_DOMAIN                |
      | PORTAL_DOMAIN                       |
      | VERIFY_EMAIL_EMAIL_KEY              |
      | RESET_PASSWORD_EMAIL_KEY            |
      | FIREBASE_APP_ID                     |
      | SQUATCH_API_KEY                     |
      | SQUATCH_BASE_URL                    |
      | FIREBASE_API_KEY                    |
      | FIREBASE_DB_URL                     |
      | GOOGLE_APPLICATION_CREDENTIALS_JSON |

  Scenario Outline: Optional Config Variables
    Given there is a configuration for the tenant "test_123"
    And the "<variable>" is not configured for the tenant "test_123"
    When there is a config loaded with the tenant "test_123"
    Then the <variable> will have the default value <default>

    Examples:
      | variable                           | default    |
      | ID_PREFIX                          | "squatch_" |
      | AUTHENTICATE_USER_WEBHOOK_URL      | ""         |
      | USER_UPSERT_JSONATA_TRANSFORMATION | ""         |
      | REGISTER_USER_WEBHOOK_URL          | ""         |