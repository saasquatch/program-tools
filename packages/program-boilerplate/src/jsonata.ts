import * as jsonata from 'jsonata';

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
  timeout: number,
  maxDepth: number,
) {
  let depth = 0;
  const time = Date.now();

  let checkRunnaway = function() {
    if (depth > maxDepth) {
      // stack too deep
      throw {
        code: 'U1001',
        message:
          'Stack overflow error: Check for non-terminating recursive function.  Consider rewriting as tail-recursive.',
        stack: new Error().stack,
      };
    }
    if (Date.now() - time > timeout) {
      // expression has run for too long
      throw {
        code: 'U1002',
        message: 'Expression evaluation timeout: Check for infinite loop',
        stack: new Error().stack,
      };
    }
  };

  // register callbacks
  expr.assign('__evaluate_entry', function(
    expr: any,
    input: any,
    environment: any,
  ) {
    depth++;
    checkRunnaway();
  });
  expr.assign('__evaluate_exit', function(
    expr: any,
    input: any,
    environment: any,
    result: any,
  ) {
    depth--;
    checkRunnaway();
  });
}
