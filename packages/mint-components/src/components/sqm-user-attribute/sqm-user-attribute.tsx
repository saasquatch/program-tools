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
 * @example User Attribute - <sqm-user-attribute value="lastSeenDate"></sqm-user-attribute>
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
   * Number in pixels.
   * @uiName Font size
   * @uiGroup Style
   */
  @Prop() fontSize?: number;
  /**
   * @uiName Color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() color?: string;
  /**
   * Font weight
   * @uiName Font weight
   * @uiGroup Style
   * @uiEnum [100, 200, 300, 400, 500, 600, 700, 800, 900]
   * @uiEnumNames ["Thin", "Extra Light", "Light", "Normal", "Medium", "Semi Bold", "Bold", "Extra Bold", "Heavy"]
   */
  @Prop() fontWeight?: number;

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
      fontSize: props.fontSize,
      color: props.color,
      fontWeight: props.fontWeight,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
