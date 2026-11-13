import { h } from "@stencil/core";
import { ShareLinkView } from "./sqm-share-link-view";
import { useShareLink } from "./useShareLink";

import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

export default {
  title: "Hooks / useShareLink",
};

function setupGraphQL() {
  const id = "zach.harrison@referralsaasquatch.com";
  const accountId = id;
  const programId = "klip-referral-program";

  useCannedEnvironment({ programId, user: { id, accountId } });
}
export const BareBonesView = createHookStory(() => {
  setupGraphQL();
  const res = useShareLink({
    programId: "klip-referral-program",
    tooltiplifespan: 0,
    tooltiptext: "",
  });
  return (
    <div>
      Sharelink:{" "}
      <code
        style={{ borderStyle: "solid", borderWidth: "1px", padding: "2px" }}
      >
        {res.copyTextViewProps.copyString}
      </code>
    </div>
  );
});

export const RegularView = createHookStory(() => {
  setupGraphQL();
  return (
    <ShareLinkView
      {...useShareLink({
        programId: "klip-referral-program",
        tooltiptext: "Copied to clipboard",
        tooltiplifespan: 1000,
      })}
    />
  );
});

export const FastTooltip = createHookStory(() => {
  setupGraphQL();
  return (
    <ShareLinkView
      {...useShareLink({
        programId: "klip-referral-program",
        tooltiptext: "Copied to clipboard",
        tooltiplifespan: 500,
      })}
    />
  );
});

export const CustomizeUrlEnabled = createHookStory(() => {
  setupGraphQL();
  return (
    <ShareLinkView
      {...useShareLink({
        programId: "klip-referral-program",
        tooltiptext: "Copied to clipboard",
        tooltiplifespan: 1000,
        allowCustomization: true,
      })}
    />
  );
});
