import { inferType, numToEquality } from "../src/utils";

describe("#inferType", () => {
  test("Booleans are inferred", () => {
    expect(inferType("true")).toBe(true);
    expect(inferType("false")).toBe(false);
  });

  test("Numbers are inferred", () => {
    expect(inferType("3.1415")).toBe(3.1415);
    expect(inferType("29")).toBe(29);
    expect(inferType("0")).toBe(0);
    expect(inferType("NaN")).toBe(NaN);
    expect(inferType("Infinity")).toBe(Infinity);
    expect(inferType("-Infinity")).toBe(-Infinity);
  });

  test("undefined and null are inferred", () => {
    expect(inferType("undefined")).toBe(undefined);
    expect(inferType("null")).toBe(null);
  });

  test("objects are inferred", () => {
    expect(inferType("[true, false]")).toStrictEqual([true, false]);
    expect(inferType('{"key1":true,"key2":false}')).toStrictEqual({
      key1: true,
      key2: false,
    });
    expect(inferType('{"key1": 3.14, "key2": "3.14" }')).toStrictEqual({
      key1: 3.14,
      key2: "3.14",
    });
  });

  test("otherwise input is inferred as a string", () => {
    expect(inferType("UNDEFINED")).toBe("UNDEFINED");
    expect(inferType("Null")).toBe("Null");
    // this is failing v
    // expect(inferType("{:-)]")).toBe("{:-)}");
    expect(inferType("yes")).toBe("yes");
    expect(inferType(":D")).toBe(":D");
  });
});

describe("#numToEquality", () => {
  test("number is converted to equality string", () => {
    expect(numToEquality(0)).toBe("eq");
    expect(numToEquality(1)).toBe("gte");
    expect(numToEquality(2)).toBe("lte");
  });
  test("default return is 'eq'", () => {
    expect(numToEquality(-1)).toBe("eq");
    expect(numToEquality(666)).toBe("eq");
    expect(numToEquality("testAString" as any)).toBe("eq");
  });
});

describe("#getTriggerSchema", () => {
  //todo
});

describe("#getGoalAnalyticTimestamp", () => {
  //todo
});

describe("#setRewardSchedule", () => {
  //todo
});
