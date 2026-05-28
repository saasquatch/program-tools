import jsonata from "jsonata";
import * as assert from "node:assert";
import { describe, test } from "node:test";
import { safeJsonata, timeboxExpression } from "../src/jsonata.ts";

describe("#timeboxExpression", () => {
  const infExpr = jsonata("( $inf := function(){$inf()}; $inf())");

  test("infinite loops throw error", { timeout: 7000 }, () => {
    timeboxExpression(infExpr);

    let error: any;
    assert.throws(() => {
      try {
        infExpr.evaluate(undefined);
      } catch (e) {
        error = e;
        throw e;
      }
    });

    assert.strictEqual(
      error!.code === "U1001" || error!.code === "U1002",
      true,
    );
  });
});

describe("#safeJsonata", () => {
  const infExpr = "( $inf := function(){$inf()}; $inf())";

  const expr = "( event.key = 'purchase' ? 111 )";
  const input = { event: { key: "purchase" } };
  test("infinite loops do not throw, but still exit", { timeout: 7000 }, () => {
    assert.doesNotThrow(() => {
      safeJsonata(infExpr, undefined);
    });
  });

  test("jsonata is evaluated as normal", () => {
    assert.strictEqual(safeJsonata(expr, input), 111);
  });
});
