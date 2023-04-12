import { h } from "@stencil/core";
import scenario from "./sqm-logout-current-user.feature";
import { LogoutCurrentUserView } from "./sqm-logout-current-user-view";

export default {
  title: "Components/User Identifier",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  userIdentificationText:
    "Currently showing referral data for noah.clarke@saasquatch.com",
  onSwitchClick: () => console.log("clicked"),
  switchUserText: "not you?",
};

export const Default = () => {
  return <LogoutCurrentUserView {...defaultProps} />;
};
