import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";

test("Visual Test", async () => {
  initStoryshots({
    test: imageSnapshot({ storybookUrl: "http://localhost:6006/" }),
  });
});
