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
import { withHooks } from "@saasquatch/stencil-hooks";

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
  @Prop() demoData?: DemoData<CopyTextViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useDemoLogoutCurrentUser(this)
      : useLogoutCurrentUser(this);

    const content = {
      userIdentificationText: this.userIdentificationText,
      switchUserText: this.switchUserText,
    };

    return <LogoutCurrentUserView {...props} {...content} />;
  }
}

function useDemoLogoutCurrentUser(
  props: LogoutCurrentUser
): LogoutCurrentUserViewProps {
  return deepmerge(
    {
      onSwitchClick: () => setUserIdentity(undefined),
      filledInEmailText: "john@example.com",
      switchUserText: props.switchUserText,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
