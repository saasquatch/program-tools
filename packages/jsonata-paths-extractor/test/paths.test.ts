import { loadFeature, autoBindSteps, StepDefinitions } from 'jest-cucumber';
import jsonata, { ExprNode } from 'jsonata';
import extractJSONataPaths from '../src';

const feature = loadFeature('test/paths.feature');

const stepDefinitions: StepDefinitions[] = [
  ({ given, when, then }) => {
    let currentAST: ExprNode | null;
    let currentResult: string[] = [];
    beforeEach(() => {
      currentAST = null;
      currentResult = [];
    });
    given(/^the JSONata ast for the expression "(.*)"$/, expression => {
      try {
        currentAST = jsonata(expression).ast();
      } catch (e) {}
    });

    when('the paths are extracted', () => {
      currentResult = extractJSONataPaths(currentAST as ExprNode);
    });

    then(/^the result is (.*)$/, result => {
      expect(JSON.parse(result)).toStrictEqual(currentResult);
    });
  },
];

autoBindSteps([feature], stepDefinitions);
