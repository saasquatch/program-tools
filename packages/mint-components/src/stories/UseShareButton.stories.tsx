import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { useShareButton } from "../components/sqm-share-button/useShareButton";

import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";

export default {
  title: "Hooks / useShareButton",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);
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
