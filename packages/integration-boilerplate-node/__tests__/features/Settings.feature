Feature: Settings

    #
    # Required settings
    #

    Scenario: Required settings resolve from the provider
        Given a config with a required string setting for key "GREETING"
        And the provider has "GREETING" set to "hello"
        When the configuration is loaded
        Then the config value will be "hello"

    Scenario: Loading fails when a required setting is absent
        Given a config with a required string setting for key "GREETING"
        When the configuration is loaded
        Then loading will fail with an error containing:
            """
            Missing required configuration key "GREETING"
            """

    Scenario: Loading fails even if the provider silently returns nothing for missing keys
        Given a provider that returns undefined instead of throwing for missing keys
        And a config with a required string setting for key "GREETING"
        When the configuration is loaded
        Then loading will fail with an error containing:
            """
            Missing required configuration key "GREETING"
            """

    #
    # Defaults and optional settings
    #

    Scenario: The default is used when the key is absent
        Given a config with a string setting for key "GREETING" and default "hi"
        When the configuration is loaded
        Then the config value will be "hi"

    Scenario: The provider value overrides the default
        Given a config with a string setting for key "GREETING" and default "hi"
        And the provider has "GREETING" set to "hello"
        When the configuration is loaded
        Then the config value will be "hello"

    Scenario: The default is returned as-is, without being transformed
        Given a config with a number setting for key "LIMIT" and default 10
        When the configuration is loaded
        Then the config value will be the number 10

    Scenario: Optional settings resolve to undefined when the key is absent
        Given a config with an optional string setting for key "GREETING"
        When the configuration is loaded
        Then the config value will be undefined

    Scenario: Optional settings resolve from the provider when the key is present
        Given a config with an optional string setting for key "GREETING"
        And the provider has "GREETING" set to "hello"
        When the configuration is loaded
        Then the config value will be "hello"

    #
    # Transforms
    #

    Scenario: asNumber converts the raw value to a number
        Given a config with a number setting for key "PORT"
        And the provider has "PORT" set to "8080"
        When the configuration is loaded
        Then the config value will be the number 8080

    Scenario Outline: asBoolean converts the raw value to a boolean
        Given a config with a boolean setting for key "ENABLED"
        And the provider has "ENABLED" set to "<raw>"
        When the configuration is loaded
        Then the config value will be the boolean <expected>

        Examples:
            | raw   | expected |
            | true  | true     |
            | TRUE  | true     |
            | false | false    |
            | yes   | false    |

    Scenario: trim strips surrounding whitespace
        Given a config with a trimmed string setting for key "TOKEN"
        And the provider has "TOKEN" set to "  secret  "
        When the configuration is loaded
        Then the config value will be "secret"

    Scenario: split turns the raw value into an array
        Given a config with a comma-split setting for key "HOSTS"
        And the provider has "HOSTS" set to "a,b,c"
        When the configuration is loaded
        Then the config value will be the array:
            """
            ["a", "b", "c"]
            """

    Scenario: Transforms receive the raw value and the key
        Given a config with a custom transform setting for key "GREETING"
        And the provider has "GREETING" set to "hello"
        When the configuration is loaded
        Then the config value will be "GREETING=hello"

    #
    # Nested configs
    #

    Scenario: Nested configs are loaded from the same provider
        Given a config with a nested config containing a required string setting for key "DB_HOST"
        And the provider has "DB_HOST" set to "localhost"
        When the configuration is loaded
        Then the nested config value will be "localhost"

    Scenario: Missing required settings in nested configs fail loading
        Given a config with a nested config containing a required string setting for key "DB_HOST"
        When the configuration is loaded
        Then loading will fail with an error containing:
            """
            Missing required configuration key "DB_HOST"
            """

    #
    # Loader behavior
    #

    Scenario: Plain fields are left untouched by loading
        Given a config with a plain field set to "unchanged"
        And a config with a required string setting for key "GREETING"
        And the provider has "GREETING" set to "hello"
        When the configuration is loaded
        Then the plain field will still be "unchanged"
