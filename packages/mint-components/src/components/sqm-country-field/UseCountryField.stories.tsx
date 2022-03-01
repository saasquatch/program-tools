import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
export default {
  title: "Hooks / useCountryField",
};

function setupGraphQL({ token, id }) {
  const accountId = id;

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: token,
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

export const Default = createHookStory(() => {
  setupGraphQL({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoibm9sb2NhbGUiLCJhY2NvdW50SWQiOiJub2xvY2FsZSJ9fQ.ACri_gO_eIdNfh3ifMmbbDp7gZz3yjT_8mfiQ96T-BY",
    id: "nolocale",
  });

  return (
    <sqm-portal-register>
      <sqm-country-field slot="formData"></sqm-country-field>
    </sqm-portal-register>
  );
});

export const English = createHookStory(() => {
  setupGraphQL({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWVuZ2xpc2giLCJpZCI6InNhbWVuZ2xpc2gifX0._6OTVF3gcipu_ibgthUNr5UHwC-2E_lhCENI5HpYvcw",
    id: "samenglish",
  });

  return (
    <sqm-portal-register>
      <sqm-country-field slot="formData"></sqm-country-field>
    </sqm-portal-register>
  );
});

export const French = createHookStory(() => {
  setupGraphQL({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbWZyZW5jaCIsImlkIjoic2FtZnJlbmNoIn19.cwhasHpfU5MLV4vGbCQcazb6p19iSw5pD2zyrVHgePg",
    id: "samfrench",
  });
  return (
    <sqm-portal-register>
      <sqm-country-field slot="formData"></sqm-country-field>
    </sqm-portal-register>
  );
});

export const Turkish = createHookStory(() => {
  setupGraphQL({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbXR1cmtleSIsImlkIjoic2FtdHVya2V5In19.usSMe0RWg8W5FtwcvJayvAlxTw6vMxjTyWXaP8jI8_U",
    id: "samturkey",
  });
  return (
    <sqm-portal-register>
      <sqm-country-field slot="formData"></sqm-country-field>
    </sqm-portal-register>
  );
});
