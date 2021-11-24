import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import dashboardTemplate from "../templates/Dashboard.html";

export default {
  title: "Program Menu",
};

export const OneProgram = createHookStory(() => {
  return (
    <sqm-program-menu>
      <sl-menu-item value="referral-program">Referral Program</sl-menu-item>
    </sqm-program-menu>
  );
});

export const TwoProgram = createHookStory(() => {
  return (
    <sqm-program-menu>
      <sl-menu-item value="referral-program">Referral Program</sl-menu-item>
      <sl-menu-item value="partner-program">Partner Program</sl-menu-item>
    </sqm-program-menu>
  );
});

export const FiveProgram = createHookStory(() => {
  return (
    <sqm-program-menu>
      <sl-menu-item value="program1">Program 1</sl-menu-item>
      <sl-menu-item value="program2">Program 2</sl-menu-item>
      <sl-menu-item value="program3">Program 3</sl-menu-item>
      <sl-menu-item value="program4">Program 4</sl-menu-item>
      <sl-menu-item value="program5">Program 5</sl-menu-item>
    </sqm-program-menu>
  );
});

export const ProgramMenuWithSwitch = createHookStory(() => {
  return (
    <div>
      <sqb-program-section program-id="Vacay-referral">
        <sqm-program-menu>
          <sl-menu-item value="Vacay-referral">Vacay-referral</sl-menu-item>
          <sl-menu-item value="vacay-affiliates">vacay-affiliates</sl-menu-item>
        </sqm-program-menu>
        <sqb-program-switch>
          <template program-id="Vacay-referral">
            <sqb-widget
              widget-type="p/Vacay-referral/w/referrerWidget"
              demoData={{
                data: { html: dashboardTemplate },
              }}
            ></sqb-widget>
          </template>
          <template program-id="vacay-affiliates">
            <sqb-widget
              widget-type="p/vacay-affiliates/w/referrerWidget"
              demoData={{
                data: { html: dashboardTemplate },
              }}
            ></sqb-widget>
          </template>
        </sqb-program-switch>
      </sqb-program-section>
    </div>
  );
});
