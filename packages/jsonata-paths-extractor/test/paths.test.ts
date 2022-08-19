// import { loadFeature, autoBindSteps, StepDefinitions } from "jest-cucumber";
// import extractJSONataPaths from "../src";
// import regressionTests from "./tests.json";

// const feature = loadFeature("test/paths.feature");

// const stepDefinitions: StepDefinitions[] = [
//   ({ given, when, then }) => {
//     let currentExpression: string | null;
//     let currentResult: string[] = [];
//     beforeEach(() => {
//       currentExpression = null;
//       currentResult = [];
//     });
//     given(/^the JSONata expression "(.*)"$/, expression => {
//       try {
//         currentExpression = expression;
//       } catch (e) {}
//     });

//     when("the paths are extracted", () => {
//       currentResult = extractJSONataPaths(currentExpression as string);
//     });

//     then(/^the result is (.*)$/, result => {
//       expect(currentResult).toStrictEqual(JSON.parse(result));
//     });
//   }
// ];

// let count = 0;
// for (const test of regressionTests) {
//   if (count < 100)
//     // && test.input === "$[].content.origin.$lowercase(name)")
//     it(`${test.input}\nOutput:${JSON.stringify(
//       test.expected,
//       null,
//       2
//     )}`, () => {
//       // console.log(JSON.stringify(extractJSONataPaths(test.input)));
//       expect(extractJSONataPaths(test.input)).toStrictEqual(test.expected);
//     });
//   count++;
// }

// autoBindSteps([feature], stepDefinitions);
