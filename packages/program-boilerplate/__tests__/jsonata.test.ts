import * as jsonata from "jsonata";
import { silenceLogger } from "../src/logger";
import { timeboxExpression, safeJsonata } from "../src/jsonata";

describe("#timeboxExpression", () => {
  test("infinite loops throw error", () => {
    const infExpr = jsonata("( $inf := function($n){$n+$inf($n-1)};  $inf(5))");
    // maxDepth will fail first
    timeboxExpression(infExpr, 10000, 5);

    let error: any;
    expect(() => {
      try {
        infExpr.evaluate(undefined);
      } catch (e) {
        error = e;
        throw e;
      }
    }).toThrowError();
    expect(error!.code).toBe("U1001");
    expect(error!.message).toBe(
      "Stack overflow error: Check for non-terminating recursive function.  Consider rewriting as tail-recursive."
    );
  });

  test("timeouts loops throw error", () => {
    const infExpr = jsonata("( $inf := function(){$inf()}; $inf())");
    // timeout will fail first
    timeboxExpression(infExpr, 30, 10000);

    let error: any;
    expect(() => {
      try {
        infExpr.evaluate(undefined);
      } catch (e) {
        error = e;
        throw e;
      }
    }).toThrowError();
    expect(error!.code).toBe("U1002");
    expect(error!.message).toBe(
      "Expression evaluation timeout: Check for infinite loop"
    );
  });
});

describe("#safeJsonata", () => {
  beforeAll(() => {
    silenceLogger();
  });

  const infExpr = "( $inf := function(){$inf()}; $inf())";

  const expr = "( event.key = 'purchase' ? 111 )";
  const input = { event: { key: "purchase" } };
  test("infinite loops do not throw, but still exit", () => {
    expect(() => {
      safeJsonata(infExpr, undefined);
    }).not.toThrowError();
  }, 7000);

  test("jsonata is evaluated as normal", () => {
    expect(safeJsonata(expr, input)).toBe(111);
  });
});
