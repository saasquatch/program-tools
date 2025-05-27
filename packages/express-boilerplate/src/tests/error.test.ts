import { formatGenericError } from "../error";

test("formatGenericError", () => {
  const error = new Error("Error message");
  const formatted = formatGenericError(error);

  expect(formatted.e).toBeInstanceOf(Error);
  expect(typeof formatted.eStr).toBe("string");
  expect(formatted.eStr).toBe("Error: Error message");
  expect(typeof formatted.eJson).toBe("string");
});
