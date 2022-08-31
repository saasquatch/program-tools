import { loadFeature, autoBindSteps, StepDefinitions } from "jest-cucumber";
import extractJSONataPaths from "../src";
import jsonataSuiteTests from "./tests.json";
import programTests from "./programTests.json";

const feature = loadFeature("test/paths.feature");

const stepDefinitions: StepDefinitions[] = [
  ({ given, when, then }) => {
    let currentExpression: string | null;
    let currentResult: string[] = [];
    beforeEach(() => {
      currentExpression = null;
      currentResult = [];
    });
    given(/^the JSONata expression "(.*)"$/, (expression) => {
      try {
        currentExpression = expression;
      } catch (e) {}
    });

    when("the paths are extracted", () => {
      currentResult = extractJSONataPaths(currentExpression as string);
    });

    then(/^the result is (.*)$/, (result) => {
      expect(currentResult).toStrictEqual(JSON.parse(result));
    });
  },
];

for (const test of jsonataSuiteTests.concat(programTests)) {
  it(`${test.input}\nOutput:${JSON.stringify(test.expected, null, 2)}`, () => {
    expect(extractJSONataPaths(test.input)).toStrictEqual(test.expected);
  });
}

autoBindSteps([feature], stepDefinitions);
