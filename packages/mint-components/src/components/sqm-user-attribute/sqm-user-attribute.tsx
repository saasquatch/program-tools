import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  UserAttributeView,
  UserAttributeViewProps,
} from "./sqm-user-attribute-view";
import { useUserAttribute } from "./useUserAttribute";

/**
 * @uiName User Attribute
 * @exampleGroup Advanced Components
 * @example User Attribute - <sqm-user-attribute value="firstName" loading-text="..."></sqm-user-attribute>
 */
@Component({
  tag: "sqm-user-attribute",
  shadow: true,
})
export class UserAttribute {
  @State() ignored = true;

  /**
   * Text displayed while the participant’s name is loading.
   * @uiName Loading text
   */
  @Prop() loadingText: string = "...";
  /**
   * The custom field key to display.
   * @uiName Custom field key
   */
  @Prop() value: string;
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UserAttributeViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useCustomFieldsDemo(this) : useUserAttribute(this);
    return <UserAttributeView {...props} />;
  }
}

function useCustomFieldsDemo(props: UserAttribute): UserAttributeViewProps {
  return deepmerge(
    {
      loading: false,
      value: "Custom Field Value",
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a },
  );
}
