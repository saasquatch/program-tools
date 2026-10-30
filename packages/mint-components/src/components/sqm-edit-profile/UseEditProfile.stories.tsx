import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

function setupGraphQL() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";

  useCannedEnvironment({ programId, user: { id, accountId } });
}

export default {
  title: "Hooks / useEditProfile",
};

export const RegularView = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-edit-profile
      {...{
        editprofileheader: "HEADER",
        editprofiletext: "TEXT",
        firstnametext: "FIRST NAME",
        lastnametext: "LAST NAME",
        canceltext: "CANCEL",
        updatetext: "UPDATE",
        currentregiontext: "CURRENT REGION TEXT",
      }}
    ></sqm-edit-profile>
  );
});
