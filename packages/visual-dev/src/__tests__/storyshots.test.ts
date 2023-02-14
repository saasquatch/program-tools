import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";

initStoryshots({
  test: imageSnapshot({ storybookUrl: "http://localhost:9001/" }),
  storyKindRegex: /^((?!.*?(Loading|Success|loading|success|tooltip|Tooltip)).)*$/,
  storyNameRegex: /^((?!.*?(Loading|Success|loading|success|tooltip|Tooltip)).)*$/,
});
