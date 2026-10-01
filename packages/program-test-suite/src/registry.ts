import {
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
  type Expression,
} from "@cucumber/cucumber-expressions";

export type StepHandler = (...args: any[]) => void | Promise<void>;

interface StepDefinition {
  expression: Expression;
  handler: StepHandler;
}

const parameterTypeRegistry = new ParameterTypeRegistry();
const steps: StepDefinition[] = [];

function register(pattern: string | RegExp, handler: StepHandler) {
  const expression =
    typeof pattern === "string"
      ? new CucumberExpression(pattern, parameterTypeRegistry)
      : new RegularExpression(pattern, parameterTypeRegistry);
  steps.push({ expression, handler });
}

// Cucumber does not use Given/When/Then when matching a step definition;
// the keyword is only descriptive. See:
// https://cucumber.io/docs/gherkin/reference#steps
export const Given = register;
export const When = register;
export const Then = register;

export interface StepMatch {
  handler: StepHandler;
  args: unknown[];
}

export function findMatch(text: string): StepMatch {
  const matches: StepMatch[] = [];
  for (const step of steps) {
    const match = step.expression.match(text);
    if (match) {
      matches.push({
        handler: step.handler,
        args: match.map((arg) => arg.getValue(null)),
      });
    }
  }
  if (matches.length === 0) {
    throw new Error(`No step definition matches: "${text}"`);
  }
  if (matches.length > 1) {
    throw new Error(`Multiple step definitions match: "${text}"`);
  }
  return matches[0];
}
