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
 * @exampleGroup Advanced
 * @example User Attribute - <sqm-user-attribute value="firstName" loading-text="..."></sqm-user-attribute>
 */
@Component({
  tag: "sqm-user-attribute",
  shadow: true,
})
export class UserAttribute {
  @State() ignored = true;

  /**
   * The custom field key to display.
   * @uiName Custom field key
   * @uiWidget customFieldSelector
   */
  @Prop() value: string;

  /**
   * Font size in pixels.
   * @uiName Font size
   * @uiGroup Style
   */
  @Prop() fontsize?: string;
  /**
   * @uiName Color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() color?: string;
  /**
   * @uiName Font weight
   * @uiGroup Style
   */
  @Prop() fontweight?: string;

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
