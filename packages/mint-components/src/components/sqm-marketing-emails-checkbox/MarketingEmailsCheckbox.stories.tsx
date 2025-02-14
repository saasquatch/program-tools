import { h } from "@stencil/core";
import scenario from "./sqm-marketing-emails-checkbox.feature";

export default {
  title: "Components/Marketing Emails Checkbox",
  parameters: {
    scenario,
  },
};

export const Default = () => {
  return <sqm-marketing-emails-checkbox></sqm-marketing-emails-checkbox>;
};
