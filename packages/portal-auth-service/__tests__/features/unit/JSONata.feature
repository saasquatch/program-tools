Feature: JSONata

  Scenario: JSONata is evaluated
    When safeJSONata evaluates a normal expression
    Then the expression is evaluated

  Scenario: safeJSONata supressed Errors
    When safeJSONata evaluates an infinite loop
    Then undefined is returned
