import { types } from "@saasquatch/program-boilerplate";
import { sync as globSync } from "glob";
import { autoBindSteps, loadFeature, StepDefinitions } from "jest-cucumber";
import builtinSteps from "./steps";
import { getWorld } from "./world";

export { default as jestConfig } from "./jest.config";
export { getWorld } from "./world";

export function runProgramTests(
  program: types.rpc.Program,
  featurePath: string,
  steps: StepDefinitions[],
  schemaFile: string,
  templateFile: string,
  rulesFile: string,
  featureFilterTags?: string[]
) {
  getWorld().setProgram(program);
  getWorld().loadDefaults(templateFile, schemaFile, rulesFile);

  const features: ReturnType<typeof loadFeature>[] = [];
  const featureFiles = globSync(`${featurePath}/**/*.feature`);

  if (!featureFiles.length) {
    throw new Error(`No feature files found at path "${featurePath}"`);
  }

  for (let featureFile of featureFiles) {
    try {
      const feature = loadFeature(featureFile);
      const keep = featureFilterTags?.length
        ? featureFilterTags.every((tag) => feature.tags.includes(tag))
        : true;
      if (keep) features.push(feature);
    } catch (e: any) {
      console.error(`Failed to load feature file "${featureFile}":`, e.message);
      throw e;
    }
  }

  for (let feature of features) {
    // Put the tags of the scenarios into the title so we can find the tags later
    for (let scenario of feature.scenarios) {
      if (scenario.tags.length)
        scenario.title = `${scenario.title} :: [${scenario.tags.join(",")}]`;
    }
    for (let scenarioOutline of feature.scenarioOutlines) {
      if (scenarioOutline.tags.length) {
        scenarioOutline.title = `${
          scenarioOutline.title
        } :: [${scenarioOutline.tags.join(",")}]`;
      }
      for (let scenario of scenarioOutline.scenarios) {
        if (scenarioOutline.tags.length) {
          scenario.title = `${scenario.title} :: [${scenarioOutline.tags.join(
            ","
          )}]`;
        }
      }
    }
  }

  autoBindSteps(features, [...steps, ...builtinSteps]);
}
