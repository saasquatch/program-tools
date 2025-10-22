import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { NameFieldsView, NameFieldsViewProps } from "./sqm-name-fields-view";
import { useNameFields } from "./useNameFields";

/**
 * @uiName Form Name Fields
 * @validParents ["sqm-portal-register","sqm-portal-registration-form", "sqm-portal-google-registration-form"]
 * @exampleGroup Microsite Components
 * @example Form Name Fields - <sqm-name-fields first-name-label="First Name" last-name-label="Last Name"></sqm-name-fields>
 */
@Component({
  tag: "sqm-name-fields",
  shadow: true,
})
export class NameFields {
  @State()
  ignored = true;

  /**
   * @uiName First name label
   */
  @Prop() firstNameLabel: string = "First Name";

  /**
   * @uiName Last name label
   */
  @Prop() lastNameLabel: string = "Last Name";

  /**
   * @uiName Optional
   * @uiWidget
   */
  @Prop() optional: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<NameFieldsViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states } = isDemo() ? useNameFieldsDemo(this) : useNameFields(this);
    return <NameFieldsView states={states}></NameFieldsView>;
  }
}
function useNameFieldsDemo(props: NameFields): Partial<NameFieldsViewProps> {
  return deepmerge(
    {
      states: {
        optional: props.optional,
        validationErrors: [],
        content: {
          firstNameLabel: props.firstNameLabel,
          lastNameLabel: props.lastNameLabel,
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
