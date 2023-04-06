import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { CopyTextViewProps } from "../views/copy-text-view";
import {
  UserIdentifierView,
  UserIdentifierViewProps,
} from "./sqm-user-identifier-view";
import { useUserIdentifier } from "./useUserIdentifer";

/**
 * @uiName User Identifier
 * @exampleGroup Common Components
 * @example User Identifier - <sqm-user-identifier user-identification-text="Showing data for {email}" switch-user-link="www.example.com" switch-user-text="not you?"></sqm-user-identifier>
 */
@Component({
  tag: "sqm-user-identifier",
  shadow: true,
})
export class UserIdentifier {
  /**
   * @required
   * @uiName User Identification Text
   */
  @Prop() userIdentificationText: string = "{email}";
  /**
   * @required
   * @uiName Switch User Link
   */
  @Prop() switchUserLink: string;
  /**
   * @required
   * @uiName Switch User Text
   */
  @Prop() switchUserText: string = "not you?";
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CopyTextViewProps>;

  render() {
    const props = isDemo()
      ? useDemoUserIdentifier(this)
      : useUserIdentifier(this);
    return <UserIdentifierView {...props} />;
  }
}

function useDemoUserIdentifier(props: UserIdentifier): UserIdentifierViewProps {
  const switchUserLink = "https://example.com";
  const userIdentificationText = "user@example.com";
  return deepmerge(
    {
      switchUserLink,
      userIdentificationText,
      switchUserText: props.switchUserText,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
