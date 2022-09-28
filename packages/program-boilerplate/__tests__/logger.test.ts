import { getLogger, setLogLevel } from "../src/logger";

const logger = getLogger("notice");
describe("#getLogger", () => {
  test("first call initializes the logger at the given level", () => {
    expect(logger);
    expect(logger.level).toBe("notice");
  });

  test("logger is only initialized once", () => {
    expect(getLogger("warn")).toBe(logger);
  });
});

describe("#setLogLevel", () => {
  test("sets the log level of an initialized logger", () => {
    setLogLevel("crit");
    expect(logger.level).toBe("crit");
  });
});
