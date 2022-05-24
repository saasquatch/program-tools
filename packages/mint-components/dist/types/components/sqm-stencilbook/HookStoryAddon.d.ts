import { AddOn } from "@saasquatch/stencilbook";
export declare const HookStoryAddon: AddOn;
export declare function createHookStory(hookStory: Function): {
  (): any;
  parameters: {
    hookStory: Function;
  };
};
