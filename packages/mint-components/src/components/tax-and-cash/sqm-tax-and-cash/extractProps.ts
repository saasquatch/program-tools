/**
 * Util function for getting just the props with a certain prefix.
 * @param props Text props on stencil component
 * @param prefix Prefix denoting which group the text prop belongs to
 * @returns A new object with all keys with the prefix provided. The prefix is removed from each key.
 */
export function extractProps(props: object, prefix: string) {
  const keys = Object.keys(props).filter((k) => k.startsWith(prefix));

  const formattedProps = keys.reduce((prev, k) => {
    const key = k.replace(prefix, "");
    return {
      ...prev,
      [key]: props[k],
    };
  }, {});

  return formattedProps;
}
