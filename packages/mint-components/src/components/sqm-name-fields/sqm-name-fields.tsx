import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { NameFieldsView, NameFieldsViewProps } from "./sqm-name-fields-view";
import { useNameFields } from "./useNameFields";

/**
 * @uiName Name Fields
 */
@Component({
  tag: "sqm-name-fields",
})
export class NameFields {
  @State()
  ignored = true;

  /**
   * @uiName First name field label
   */
  @Prop() firstNameLabel: string = "First Name";

  /**
   * @uiName Last name field label
   */
  @Prop() lastNameLabel: string = "Last Name";

  /** @undocumented */
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
        validationErrors: [],
        content: {
          firstNameLabel: "First Name",
          lastNameLabel: "Last Name",
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
