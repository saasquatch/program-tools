/**
 * Util function for getting just the props with a certain prefix.
 * @param props Text props on stencil component
 * @param prefix Prefix denoting which group the text prop belongs to
 * @returns A new object with all keys with the prefix provided. The prefix is removed from each key.
 */
export function extractProps<X extends object, T extends string>(
  props: X,
  prefix: T
): PickPrefix<X, T> {
  const keys = Object.keys(props).filter((k) => k.startsWith(prefix));

  const formattedProps = keys.reduce((prev, k) => {
    const key = k.replace(prefix, "");
    return {
      ...prev,
      [key]: props[k],
    };
  }, {});

  return formattedProps as PickPrefix<X, T>;
}

type PickPrefix<Object, Prefix extends string> = {
  [K in keyof Object as K extends `${Prefix}${infer Suffix}`
    ? `${Suffix}`
    : never]: Object[K];
};
