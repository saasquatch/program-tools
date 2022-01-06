import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoic2FtK2tsaXBAc2Fhc3F1YXQuY2giLCJhY2NvdW50SWQiOiJzYW0ra2xpcEBzYWFzcXVhdC5jaCJ9fQ.FMNZ6oajyr6SiCcRqKKdyPqvNTvWROQ60MKAyfvWGfc";

export default {
  title: "Hooks / useTaskCard",
};

function setupGraphQL() {
  const id = "sam+klip@saasquat.ch";
  const accountId = id;
  const programId = "klip-referral-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: JWT,
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

export const TaskCard = createHookStory(() => {
  setupGraphQL();
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-task-card
      card-title="Comment on 5 articles"
      button-text="Start reading"
      goal={5}
      steps={true}
      show-progress-bar={true}
      event-key="testEvent"
    ></sqm-task-card>
  );
});
