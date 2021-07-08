Feature: Webhook Error Handling

  Scenario: Ok responses are ignored
    Given the response is ok
    When handleWebhookResponseError is called with the response
    Then no error is thrown

  Scenario: 400 Errors are translated into UserInput Errors
    Given the response has a status of "400"
    When handleWebhookResponseError is called with the response
    Then a "BAD_USER_INPUT" error is thrown


  Scenario: 500 Errors are translated into ServiceUnavailable Errors
    Given the response has a status of "500"
    When handleWebhookResponseError is called with the response
    Then a "SERVICE_UNAVAILABLE" error is thrown

  Scenario Outline: Other Errors are thrown
    Given the response has a status of "<code>"
    When handleWebhookResponseError is called with the response
    Then a "INTERNAL_SERVER_ERROR" error is thrown

    Examples:
      | code |
      | 401  |
      | 403  |
      | 404  |


