import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { UserNameView, UserNameViewProps } from "./sqm-user-name-view";
import { useUserName } from "./useUserName";

/**
 * @uiName User Name
 * @example User Name Display - <sqm-user-name fallback="Anonymous User"></sqm-user-name>
 */
@Component({
  tag: "sqm-user-name",
  shadow: true,
})
export class UserName {
  @State() _ignored: boolean = true;

  /**
   * Fallback name for unknown users
   * @uiName Fallback Name
   */
  @Prop() fallback: string = "Anonymous User";

  /**
   * @uiName Loading Text
   */
  @Prop() loadingText: string = "...";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UserNameViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useUserNameDemo(this) : useUserName(this);
    return <UserNameView {...props} />;
  }
}

function useUserNameDemo(props: UserName): UserNameViewProps {
  return deepmerge(
    {
      loading: false,
      loadingText: "...",
      username: "John Smith",
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
