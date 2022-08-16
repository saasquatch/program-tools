import { loadFeature, autoBindSteps, StepDefinitions } from "jest-cucumber";
import extractJSONataPaths from "../src";

const feature = loadFeature("test/paths.feature");

const stepDefinitions: StepDefinitions[] = [
  ({ given, when, then }) => {
    let currentExpression: string | null;
    let currentResult: string[] = [];
    beforeEach(() => {
      currentExpression = null;
      currentResult = [];
    });
    given(/^the JSONata expression "(.*)"$/, expression => {
      try {
        currentExpression = expression;
      } catch (e) {}
    });

    when("the paths are extracted", () => {
      currentResult = extractJSONataPaths(currentExpression as string);
    });

    then(/^the result is (.*)$/, result => {
      expect(JSON.parse(result)).toStrictEqual(currentResult);
    });
  }
];

autoBindSteps([feature], stepDefinitions);
