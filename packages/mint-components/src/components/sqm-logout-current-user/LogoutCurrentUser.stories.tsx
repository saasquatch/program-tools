import { h } from "@stencil/core";
import scenario from "./sqm-logout-current-user.feature";
import { LogoutCurrentUserView } from "./sqm-logout-current-user-view";

export default {
  title: "Components/Logout Current User",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  filledInEmailText:
    "Currently showing referral data for noah.clarke@saasquatch.com",
  onSwitchClick: () => console.log("clicked"),
  switchUserText: "not you?",
  loading: false,
  emailErrorText: "Error fetching email",
};

export const Default = () => {
  return <LogoutCurrentUserView {...defaultProps} />;
};
