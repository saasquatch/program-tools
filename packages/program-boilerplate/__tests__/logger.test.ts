import { getLogger, setLogLevel } from "../src/logger";

const logger = getLogger("silly");
describe("#getLogger", () => {
  test("first call initializes the logger at the given level", () => {
    expect(logger);
    expect(logger.level).toBe("silly");
  });

  test("logger is only initialized once", () => {
    expect(getLogger("warn")).toBe(logger);
  });
});

describe("#setLogLevel", () => {
  test("sets the log level of an initialized logger", () => {
    setLogLevel("info");
    expect(logger.level).toBe("info");
  });
});
