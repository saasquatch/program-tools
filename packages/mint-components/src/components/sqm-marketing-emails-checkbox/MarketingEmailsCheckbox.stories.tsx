import { h } from "@stencil/core";
// import scenario from "./sqm-link-button.feature";
import { MarketingEmailsCheckbox } from "./sqm-marketing-emails-checkbox";

export default {
  title: "Components/Marketing Emails Checkbox",
  //   parameters: {
  //     scenario,
  //   },
};

// const defaultProps: MarketingEmailsCheckbox = {
//   link: "https://example.com",
//   openInNewTab: false,
//   buttonText: "Button Text",
// };

export const Default = () => {
  return <sqm-marketing-emails-checkbox></sqm-marketing-emails-checkbox>;
};
