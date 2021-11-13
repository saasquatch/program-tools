import { h } from "@stencil/core";

export type Matrix = Record<string, Array<unknown>>;

/**
 * Displays a cartesian product of the input props
 * 
 * @returns 
 */
export function MatrixStory({
  matrix,
  props,
  Component,
}: {
  matrix: Matrix;
  props: Record<string, any>;
  Component: any; // Should be: FunctionalComponent<unknown>;
}) {
  const propMatrix = Object.keys(matrix).map((propKey) => {
    const propValues = matrix[propKey];
    return propValues.map((val) => {
      return {
        [propKey]: val,
      };
    });
  });

  const combinations = cartesian(...propMatrix) as Record<string, any>[][];
  const propsCombinations = combinations.map((combo) => {
    return combo.reduce((props, prop) => {
      return {
        ...props,
        ...prop,
      };
    }, {} as Record<string, any>);
  });

  return propsCombinations.map((combo) => {
    const example = { ...props, ...combo };
    return (
      <div>
        <PropsTable values={example} />
        <hr />
        <Component {...example} />
      </div>
    );
  });
}
function PropsTable({ values }: { values: Record<string, any> }) {
  return (
    <table>
      <tbody>
        {Object.keys(values).map((key) => {
          return (
            <tr>
              <th>{key}</th>
              <td>{JSON.stringify(values[key])}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/**
 * Source: https://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements
 * 
 * TODO: Could replace with a fork of https://www.npmjs.com/package/cartesian
 *
 * @param args - an array of arrays
 * @returns combinations of the elements in those array
 */
function cartesian(...args: unknown[][]): unknown[][] {
  var r = [],
    max = args.length - 1;
  function helper(arr: unknown[], i: number) {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}
