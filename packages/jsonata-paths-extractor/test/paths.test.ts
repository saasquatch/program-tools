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
    given(/^the JSONata expression "(.*)"$/, expression => {
      try {
        currentExpression = expression;
      } catch (e) {}
    });

    when("the paths are extracted", () => {
      currentResult = extractJSONataPaths(currentExpression as string);
    });

    then(/^the result is (.*)$/, result => {
      expect(currentResult).toStrictEqual(JSON.parse(result));
    });
  }
];

// .filter(
//   test =>
//     test.input ===
//     '(\n    /* Payouts for different countries and different products */\n    $payouts := {\n        "US": {\n            "express": 2500,\n            "x1": 2500,\n            "x2": 10000,\n            "x3": 10000,\n            "x4": 10000,\n            "x5": 10000,\n            "x6": 10000,\n            "x7": 10000,\n            "x8": 10000\n        },\n        "GB": {\n            "express": 1000,\n            "x1": 1000,\n            "x2": 5000,\n            "x3": 5000,\n            "x4": 5000,\n            "x5": 5000,\n            "x6": 5000,\n            "x7": 5000,\n            "x8": 5000\n        },\n        "CA": {\n            "express": 0,\n            "x1": 2500,\n            "x2": 10000,\n            "x3": 10000,\n            "x4": 10000,\n            "x5": 10000,\n            "x6": 10000,\n            "x7": 10000,\n            "x8": 10000\n        }\n    };\n\n    $amtFor := function($product) {(     \n        /* Get the number of the product purchased from the event */                               \n        $num := $lookup(event.fields, $product);                    \n\n        /* Calculate the total for the product */    \n        $lookup($lookup($payouts, user.countryCode), $product) * $num\n    )};\n\n    /* Set max to $15,000 USD/CAD or £10,000 */\n    $maxTotal := user.countryCode in ["US", "CA"] ? 1500000 : 1000000;\n\n    /* Sum up the totals for each product */\n    $total := $sum([\n        $amtFor("express"),\n        $amtFor("x1"),\n        $amtFor("x2"),\n        $amtFor("x3"),\n        $amtFor("x4"),\n        $amtFor("x5"),\n        $amtFor("x6"),\n        $amtFor("x7"),\n        $amtFor("x8")\n    ]);\n\n    /* Apply the maximum to the result */\n    $min([$maxTotal, $total])\n)'
// )
for (const test of jsonataSuiteTests.concat(programTests)) {
  it(`${test.input}\nOutput:${JSON.stringify(test.expected, null, 2)}`, () => {
    expect(extractJSONataPaths(test.input)).toStrictEqual(test.expected);
  });
}

autoBindSteps([feature], stepDefinitions);
