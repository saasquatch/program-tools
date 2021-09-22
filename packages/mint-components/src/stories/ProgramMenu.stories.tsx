import { h } from "@stencil/core";

export default {
  title: "Program Menu",
};

export const OneProgram = () => {
  return (
    <sqm-program-menu>
      <sl-menu-item value="referral-program">Referral Program</sl-menu-item>
    </sqm-program-menu>
  );
};

export const TwoProgram = () => {
  return (
    <sqm-program-menu>
      <sl-menu-item value="referral-program">Referral Program</sl-menu-item>
      <sl-menu-item value="partner-program">Partner Program</sl-menu-item>
    </sqm-program-menu>
  );
};

export const FiveProgram = () => {
  return (
    <sqm-program-menu>
      <sl-menu-item value="program1">Program 1</sl-menu-item>
      <sl-menu-item value="program2">Program 2</sl-menu-item>
      <sl-menu-item value="program3">Program 3</sl-menu-item>
      <sl-menu-item value="program4">Program 4</sl-menu-item>
      <sl-menu-item value="program5">Program 5</sl-menu-item>
    </sqm-program-menu>
  );
};
