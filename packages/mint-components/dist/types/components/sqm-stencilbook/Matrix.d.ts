export declare type Matrix = Record<string, Array<unknown>>;
/**
 * Displays a cartesian product of the input props
 *
 * @returns
 */
export declare function MatrixStory({ matrix, props, Component, }: {
  matrix: Matrix;
  props: Record<string, any>;
  Component: any;
}): any[];
