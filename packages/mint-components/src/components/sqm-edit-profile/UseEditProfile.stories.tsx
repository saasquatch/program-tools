import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

function setupGraphQL() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0In19.ziDWbdCwsTo1ijxl8d2__Ga-6iFOVShaJUPp2ZBMeO0",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);
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
