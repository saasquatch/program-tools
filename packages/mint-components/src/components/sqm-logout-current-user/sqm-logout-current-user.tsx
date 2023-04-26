import { isDemo, setUserIdentity } from "@saasquatch/component-boilerplate";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { CopyTextViewProps } from "../views/copy-text-view";
import {
  LogoutCurrentUserView,
  LogoutCurrentUserViewProps,
} from "./sqm-logout-current-user-view";
import { useLogoutCurrentUser } from "./useLogoutCurrentUser";

/**
 * @uiName Logout Current User
 * @exampleGroup Common Components
 * @compatibility Built for instant access
 * @example Logout Current User - <sqm-logout-current-user user-identification-text="{email}" switch-user-link="#" switch-user-text="not you?"></sqm-logout-current-user>
 */
@Component({
  tag: "sqm-logout-current-user",
  shadow: true,
})
export class LogoutCurrentUser {
  /**
   * @required
   * @uiName User identification text
   */
  @Prop() userIdentificationText: string = "{email}";
  /**
   * @required
   * @uiName Switch user button label
   */
  @Prop() switchUserText: string = "not you?";
  /**
   * @required
   * @uiName Switch user button link
   */
  @Prop() switchUserLink: string = "#";
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CopyTextViewProps>;

  render() {
    const props = isDemo()
      ? useDemoLogoutCurrentUser(this)
      : useLogoutCurrentUser(this);
    return <LogoutCurrentUserView {...props} />;
  }
}

function useDemoLogoutCurrentUser(
  props: LogoutCurrentUser
): LogoutCurrentUserViewProps {
  return deepmerge(
    {
      onSwitchClick: () => setUserIdentity(undefined),
      userIdentificationText: props.userIdentificationText,
      switchUserText: props.switchUserText,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
