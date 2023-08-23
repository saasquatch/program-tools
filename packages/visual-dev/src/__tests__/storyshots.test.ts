import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";

const getMatchOptions = () => {
  return {
    failureThreshold: 0.2,
    failureThresholdType: "percent" as const,
  };
};
const beforeScreenshot = () => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 600)
  );
};

initStoryshots({
  test: imageSnapshot({
    storybookUrl: "http://localhost:9001/",
    getMatchOptions,
    beforeScreenshot,
  }),
  storyKindRegex: /^((?!.*?(Loading|Success|loading|success|tooltip|Tooltip)).)*$/,
  storyNameRegex: /^((?!.*?(Loading|Success|loading|success|tooltip|Tooltip)).)*$/,
});
