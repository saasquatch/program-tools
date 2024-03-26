import { nanoid } from "../nanoid";

test("nanoid", () => {
  expect(nanoid().length).toBe(32);
  expect(nanoid(12).length).toBe(12);
  expect(nanoid(64).length).toBe(64);
});
