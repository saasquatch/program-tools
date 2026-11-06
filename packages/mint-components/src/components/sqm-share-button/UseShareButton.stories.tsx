import { h } from "@stencil/core";
import { useShareButton } from "./useShareButton";

import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

export default {
  title: "Hooks / useShareButton",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  useCannedEnvironment({ programId, user: { id, accountId } });
}
export const BareBonesView = createHookStory(() => {
  setupGraphQL();
  const programId = "sam-partner-test-2";
  const res = [
    useShareButton({ programId, medium: "facebook" }),
    useShareButton({ programId, medium: "twitter" }),
    useShareButton({ programId, medium: "email" }),
    useShareButton({ programId, medium: "direct" }),
    useShareButton({ programId, medium: "sms" }),
  ];
  return (
    <div>
      {res.map((r) => (
        <div>
          <button onClick={r.onClick}>Share link ({r.medium})</button>
        </div>
      ))}
    </div>
  );
});

export const RegularView = createHookStory(() => {
  setupGraphQL();
  const programId = "sam-partner-test-2";
  const mediums: Array<ReturnType<typeof useShareButton>["medium"]> = [
    "facebook",
    "twitter",
    "email",
    "direct",
    "sms",
  ];
  return (
    <div>
      {mediums.map((medium) => (
        <div>
          <sqm-share-button {...{ programId, medium }}>
            BUTTON_TEXT
          </sqm-share-button>
        </div>
      ))}
    </div>
  );
});
