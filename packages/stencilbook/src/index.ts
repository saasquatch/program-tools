import { FunctionalComponent } from "@stencil/core";

import { useStencilbook } from "./stencil-storybook";

export { useStencilbook };

/**
 *
 * Based on Component Story Format (CSF)
 *
 * For portability: https://storybook.js.org/docs/web-components/api/csf
 *
 */

export type StorybookDefaultExport = {
  title: string;
  component: FunctionalComponent;
  decorators?: unknown[];
  parameters?: {};
};
export type SubStories = {
  [name: string]: SubStory;
};
export type SubStory = FunctionalComponent & SubStoryFields;
type SubStoryFields = {
  storyName?: string;
  decorators?: unknown[];
  parameters?: {};
};
export type StoryWithSubs = {
  story: StorybookDefaultExport;
  subs?: SubStories;
};
export type OrganisedStoryWithSubs = {
  [key: string]: StoryWithSubs[];
};
type SubStoryWrapper = {
  key: string;
  label: string;
  story: SubStory;
  parent: StorybookDefaultExport;
};
export type AddOn = FunctionalComponent<{ story: SubStoryWrapper }>;

export type Selection = {
  key: string;
  label: string;
  story: SubStory;
  parent: StorybookDefaultExport;
};
