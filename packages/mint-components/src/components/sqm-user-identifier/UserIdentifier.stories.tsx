import { h } from "@stencil/core";
import scenario from "./sqm-user-identifier.feature";
import { UserIdentifierView } from "./sqm-user-identifier-view";

export default {
  title: "Components/User Identifier",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  userIdentificationText:
    "Currently showing referral data for noah.clarke@saasquatch.com",
  switchUserLink: "example.com",
  switchUserText: "not you?",
};

export const Default = () => {
  return <UserIdentifierView {...defaultProps} />;
};
