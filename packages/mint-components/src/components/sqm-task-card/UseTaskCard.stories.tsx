import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InNhbStrbGlwQHNhYXNxdWF0LmNoIiwiaWQiOiJzYW0ra2xpcEBzYWFzcXVhdC5jaCIsImVtYWlsIjoic2FtK2tsaXBAc2Fhc3F1YXQuY2giLCJsb2NhbGUiOiJlbiJ9fQ.a2nYYrSJ81FHXlCU-Sqp_-wquQizinHBhzwzULDzimg";

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
      open-new-tab={true}
    ></sqm-task-card>
  );
});

export const TaskCardFeed = createHookStory(() => {
  setupGraphQL();
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-card-feed>
      <sqm-task-card
        reward-amount="75"
        card-title="Refer a Friend"
        description="Invite a friend to Klip and get 75 points when they signup for a free trial or contact our us about an enterprise license."
        button-text="Start referring"
        button-link="https://klip-staging.vercel.app/app/klip-rewards"
        goal={1}
        repeatable
        completed-text=""
        demoData=""
        ended-message=""
        event-key=""
        expiry-message=""
        progress-bar-unit=""
        reward-duration="2022-01-04T08:00:00.000Z/2022-01-20T08:00:00.000Z"
        reward-unit=""
        starts-on-message=""
        stat-type=""
        display-duration="2022-01-04T08:00:00.000Z/2022-01-05T08:00:00.000Z"
      ></sqm-task-card>
      <sqb-program-section program-id="klip-loyalty">
        <sqm-task-card
          reward-amount="50"
          card-title="Follow Us on Twitter"
          description="Earn 50 points when you follow us on Twitter!"
          button-text="Follow"
          button-link="https://twitter.com/"
          goal={1}
          stat-type="/programGoals/count/Follow-on-Social-Media"
          open-new-tab="true"
          event-key="socialFollow"
        ></sqm-task-card>
      </sqb-program-section>
      <sqm-task-card
        reward-amount="250"
        goal={500}
        show-progress-bar="true"
        card-title="Spend $500 on Klip Products"
        description="Earn 250 points when you spend $500 or more on Klip products."
        button-text="See plans"
        button-link="https://klip-staging.vercel.app/app/plans"
        stat-type="/customFields/purchaseTotal"
        open-new-tab="false"
      ></sqm-task-card>
      <sqb-program-section program-id="klip-loyalty">
        <sqm-task-card
          reward-amount="25"
          goal={1}
          card-title="Upload Your First Video"
          description="Earn 25 points for exploring the Klip platform when you upload your first video."
          button-text="Upload"
          button-link="https://klip-staging.vercel.app/app"
          stat-type="/programGoals/count/Record-First-Video"
          open-new-tab="false"
        ></sqm-task-card>
      </sqb-program-section>
      <sqm-task-card
        reward-amount="100"
        goal={5}
        repeatable={true}
        show-progress-bar="true"
        steps={true}
        card-title="Share 5 Videos"
        description="Earn 100 points for collaborating each time you share 5 videos."
        button-text="Share"
        button-link="https://klip-staging.vercel.app/app"
        stat-type="/customFields/videosShared"
        open-new-tab="false"
      ></sqm-task-card>
      <sqb-program-section program-id="klip-loyalty">
        <sqm-task-card
          reward-amount="1"
          reward-unit="Free Month"
          goal={1}
          card-title="Upgrade Your Plan"
          description="Buy a Business or Enterprise plan and get 1 free month of Klip for being a committed customer."
          button-text="Upgrade"
          button-link="https://klip-staging.vercel.app/app/plans"
          stat-type="/programGoals/count/Upgrade-Plan"
          open-new-tab="false"
        ></sqm-task-card>
      </sqb-program-section>
      <sqm-task-card
        reward-amount="200"
        goal={5}
        show-progress-bar=""
        card-title="Purchase 5 Seats"
        description="Earn 200 points when you expand your Klip Team by purchasing 5 or more seats."
        button-text="Purchase seats"
        button-link="https://klip-staging.vercel.app/app/plans"
        stat-type="/customFields/seatCount"
      ></sqm-task-card>
      <sqm-task-card
        reward-amount="250"
        goal={1}
        show-progress-bar=""
        card-title="Upload 1 Hour of Video"
        description="Record and upload an hour of video and get 250 points for being a super user."
        button-text="Upload"
        button-link="https://klip-staging.vercel.app/app"
        stat-type="/customFields/videoHoursCount"
        progress-bar-unit=""
        reward-unit="Points"
      ></sqm-task-card>
      <sqb-program-section program-id="klip-loyalty">
        <sqm-task-card
          reward-amount="100"
          goal={1}
          card-title="Complete an NPS Survey"
          description="Fill out our NPS survey and get 100 points for giving us honest feedback. Be sure to use your Klip account email when completing the survey."
          button-text="Complete survey"
          button-link="https://y5tqgj96plv.typeform.com/to/p6N7lHUk"
          stat-type="/programGoals/count/NPS-Survey"
          reward-unit="Points"
          open-new-tab="true"
        ></sqm-task-card>
      </sqb-program-section>
      <sqb-conditional-section condition="'champion' in user.segments">
        <sqb-program-section program-id="klip-loyalty">
          <sqm-task-card
            reward-amount="$100"
            goal={1}
            card-title="Complete a Case Study"
            description="Write a Klip case study and earn a $100 Visa Gift Card for letting us know how Klip has helped your team succeed."
            button-text="Complete case study"
            button-link="https://y5tqgj96plv.typeform.com/to/CPhkFBBW"
            stat-type="/programGoals/count/Case-Study"
            reward-unit="Visa Gift Card"
            open-new-tab="true"
          ></sqm-task-card>
        </sqb-program-section>
      </sqb-conditional-section>
    </sqm-card-feed>
  );
});
