export type GenericError = {
  e: unknown;
  eStr: string;
  eJson: string;
};

export function formatGenericError(e: unknown): GenericError {
  return {
    e,
    // we don't care that the value of e might be weird in the string template, the
    // whole point is to just convert it to a string no matter the type.
    // eslint-disable-next-line -- @typescript-eslint/restrict-template-expressions
    eStr: `${e}`,
    eJson: JSON.stringify(e),
  };
}
