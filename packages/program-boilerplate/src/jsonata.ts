import * as jsonata from "jsonata";
import { getLogger } from "./logger";

const TIMEOUT = 5000;
const MAXDEPTH = 1000;

const logger = getLogger(process.env.PROGRAM_LOG_LEVEL || "debug");

/**
 * Protect the process/browser from a runnaway expression
 * i.e. Infinite loop (tail recursion), or excessive stack growth
 *
 * @param {Object} expr - expression to protect
 * @param {Number} timeout - max time in ms
 * @param {Number} maxDepth - max stack depth
 */
export function timeboxExpression(
  expr: jsonata.Expression,
  timeout?: number,
  maxDepth?: number
) {
  const startTime = Date.now();
  const actualTimeout = timeout ?? TIMEOUT;
  const actualMaxDepth = maxDepth ?? MAXDEPTH;

  let currentDepth = 0;

  const checkRunnaway = function () {
    if (currentDepth > actualMaxDepth) {
      // stack too deep
      throw {
        code: "U1001",
        message:
          "Stack overflow error: Check for non-terminating recursive function. Consider rewriting as tail-recursive.",
        stack: new Error().stack,
      };
    }
    if (Date.now() - startTime > actualTimeout) {
      // expression has run for too long
      throw {
        code: "U1002",
        message: "Expression evaluation timeout: Check for infinite loop",
        stack: new Error().stack,
      };
    }
  };

  // register callbacks
  expr.assign("__evaluate_entry", () => {
    currentDepth++;
    checkRunnaway();
  });
  expr.assign("__evaluate_exit", () => {
    currentDepth--;
    checkRunnaway();
  });
}

/**
 * @deprecated Use timeboxedJsonata instead
 */
export function safeJsonata(expression: string, inputData: any) {
  try {
    const jsonataQuery = jsonata(expression);
    timeboxExpression(jsonataQuery);
    return jsonataQuery.evaluate(inputData);
  } catch (e) {
    logger.warn(`Failed to evaluate JSONata expression: ${e.message}`);
  }
}

export function timeboxedJsonata(
  expression: string,
  inputData: any,
  timeout?: number,
  maxDepth?: number
): {
  success: boolean;
  result: any;
} {
  try {
    const jsonataQuery = jsonata(expression);
    timeboxExpression(jsonataQuery, timeout, maxDepth);
    const result = jsonataQuery.evaluate(inputData);
    return { success: true, result };
  } catch (e) {
    if (e instanceof Error) {
      logger.warn(`Failed to evaluate JSONata expression: ${e.message}`);
    }
    return { success: false, result: undefined };
  }
}
