import { h } from "@stencil/core";
import { AddOn } from "@saasquatch/stencilbook";

export const HookStoryAddon: AddOn = ({ story }, children) => {
  const hookStory = (story.story.parameters as any)?.hookStory;
  if (!hookStory) {
    return children;
  }

  const randomInt = Math.round(Math.random() * 100000);
  const RandomTagName = "sqm-hook-story-container-" + randomInt;

  return (
    <RandomTagName>
      <sqm-hook-story-container hookStory={hookStory} />
    </RandomTagName>
  );
};

export function createHookStory(hookStory: Function) {
  const story = () => <div />;
  story.parameters = {
    hookStory,
  };
  return story;
}
