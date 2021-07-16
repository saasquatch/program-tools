import { Component, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalProfileView } from "./sqm-portal-profile-view";

/**
 * @uiName Portal Profile
 */
@Component({
  tag: "sqm-portal-profile",
  shadow: true,
})
export class PortalProfile {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  //TODO:NEEDS A HOOK
  render() {
    return <PortalProfileView  />;
  }
}
