export const objectIsFull = (obj: Record<string, unknown>) => {
  const hasUndefined = Object.keys(obj).reduce((prev, k) => {
    return obj[k] == undefined;
  }, false);

  return !hasUndefined;
};
