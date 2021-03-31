import { h } from "@stencil/core";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";

function setupGraphQL() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    token:
      // you have to change this if you change the id or accountId
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQifX0.-WGV4_bzGCFp-OTIO-h-yp0MlgtkdufT_GgI4T691OY",
    userId: id,
    accountId,
    programId,
  };
  return { id, accountId };
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
