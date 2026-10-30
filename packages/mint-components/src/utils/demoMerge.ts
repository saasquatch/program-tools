import deepmergeFactory from "@fastify/deepmerge";

const merge = deepmergeFactory({
  // Arrays from the source (demoData) replace target arrays instead of
  // concatenating, matching the previous deepmerge { arrayMerge: (_, a) => a }.
  mergeArray: () => (_target, source) => source,
});

/**
 * Deep-merges demo/preview props with `demoData` overrides.
 *
 * Replaces the `deepmerge` package (unfixed prototype-poisoning advisory);
 * `@fastify/deepmerge` ignores `__proto__`, `constructor` and `prototype` keys.
 */
export function demoMerge<T>(target: Partial<T>, source: Partial<T>): T;
export function demoMerge<T1, T2>(target: Partial<T1>, source: Partial<T2>): T1 & T2;
export function demoMerge(target: unknown, source: unknown) {
  return merge(target, source);
}
