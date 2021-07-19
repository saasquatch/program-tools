import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalProfileView } from "./sqm-portal-profile-view";
import { usePortalProfile } from "./usePortalProfile";

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

  @Prop() firstnametext: string = "First Name";
  @Prop() lastnametext: string = "Last Name";
  @Prop() emailtext: string = "Email";
  @Prop() countrytext: string = "Country";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { states, callbacks } = usePortalProfile(this);
    console.log({states, callbacks});
    return <PortalProfileView states={states} callbacks={callbacks} />;
  }
}
