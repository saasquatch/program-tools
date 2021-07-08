import { StepDefinitions } from "jest-cucumber";
import jsonata from "jsonata";
import { safeJsonata, timeboxExpression } from "../../../src/util/safeJSONata";

export const JSONataSteps: StepDefinitions = ({ given, when, then }) => {
  let currentExpression: any;
  let currentResult: any;
  let currentError: any;
  afterEach(() => {
    currentExpression = null;
    currentResult = null;
    currentError = null;
  });

  when("safeJSONata evaluates a normal expression", () => {
    try {
      const expr = "( event.key = 'purchase' ? 111 )";
      const input = { event: { key: "purchase" } };
      currentResult = safeJsonata(expr, input);
    } catch (e) {
      currentError = e;
    }
  });

  when("safeJSONata evaluates an infinite loop", () => {
    try {
      const expr = "( $inf := function($n){$n+$inf($n-1)};  $inf(5))";
      currentResult = safeJsonata(expr, undefined);
    } catch (e) {
      currentError = e;
    }
  });

  then("undefined is returned", () => {
    expect(currentResult).toEqual(undefined);
    expect(currentError).toBeNull();
  });

  then("the expression is evaluated", () => {
    expect(currentResult).toEqual(111);
    expect(currentError).toBeNull();
  });
};
