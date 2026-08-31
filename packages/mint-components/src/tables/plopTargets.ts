const PLOP_TARGET_TAG = "RAISINS-PLOP-TARGET";

export function isPlopTarget(element: Element): boolean {
  return element.tagName === PLOP_TARGET_TAG;
}

/** Indexes of the column components the widget editor injected as drop zones. */
export function dropZoneColumnIndexes(columnComponents: Element[]): number[] {
  return columnComponents.reduce<number[]>(
    (indexes, component, idx) =>
      isPlopTarget(component) ? [...indexes, idx] : indexes,
    []
  );
}
