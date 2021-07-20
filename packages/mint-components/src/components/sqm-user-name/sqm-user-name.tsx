import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { UserNameView, UserNameViewProps } from "./sqm-user-name-view";
import { useUserName } from "./useUserName";

/**
 * @uiName Navigation Link
 */
@Component({
  tag: "sqm-user-name",
  shadow: true,
})
export class UserName {
  @State() _ignored: boolean = true;

  @Prop() fallback: string = "";
  @Prop() loadingText: string = "...";

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
  return {
    loading: false,
    loadingText: "...",
    username: "John Smith",
  };
}
