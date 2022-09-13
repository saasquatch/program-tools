Feature: Locale handling

    Scenario: Initial locale is obtained from the browser
        Given the locale context is started
        When the initial value is set
        And there is no widgetIdent locale
        Then the initial value for the context is the parsed navigator.language

    Scenario: navigator.language is converted to a locale the backend understands
        Given the locale context is started
        And the value of navigator.language is used as the initial value
        When the initial context value is set
        Then is the value of navigator.language with dashes replaced with underscores

    Scenario Outline: Browser locale is validated to work with the backend
        Given the browser's navigator.language is <language>
        When the locale is validated
        Then the value <will> be used

        Examples:
            | language        | will  |
            | en-US           | will  |
            | sr-Latn-SR      | won't |
            | es-419          | will  |
            | en-029          | will  |
            | de-DE-1901-1901 | won't |
            | az-Arab-IR      | won't |
            | en-GB-oxendict  | won't |

    Scenario: Locale is undefined if there is no valid initial value
        Given the locale context is started
        And the browser's locale is not valid
        And there is no widgetIdent locale
        Then the initial value is undefined