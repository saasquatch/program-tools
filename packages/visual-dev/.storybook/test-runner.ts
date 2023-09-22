// .storybook/test-runner.js
const { toMatchImageSnapshot } = require("jest-image-snapshot");

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const filterArr = [
  "Loading",
  "Success",
  "loading",
  "success",
  "tooltip",
  "Tooltip",
];

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page, context) {
    if (!filterArr.some((substring) => context?.id?.includes(substring))) {
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir,
        failureThreshold: 0.2,
        failureThresholdType: "percent",
        customSnapshotIdentifier: context.id,
      });
    }
  },
};
