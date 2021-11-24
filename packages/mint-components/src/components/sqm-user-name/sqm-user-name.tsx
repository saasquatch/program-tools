import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { UserNameView, UserNameViewProps } from "./sqm-user-name-view";
import { useUserName } from "./useUserName";

/**
 * @uiName User Name
 */
@Component({
  tag: "sqm-user-name",
  shadow: true,
})
export class UserName {
  @State() _ignored: boolean = true;

  /**
   * @uiName Fallback name for nameless users
   */
  @Prop() fallback: string = "Anonymous User";

  /**
   * @uiName Loading text
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
