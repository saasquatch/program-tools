import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { useDropdownField } from "../sqm-dropdown-field/useDropdownField";
import {
  CountryFieldView,
  CountryFieldViewProps,
} from "./sqm-country-field-view";
import { useCountryField } from "./useCountryField";

/**
 * @uiName Country Field
 */
@Component({
  tag: "sqm-country-field",
})
export class CountryField {
  @State()
  ignored = true;

  /**
   * @uiName Country name attribute
   */
  @Prop() dropdownName: string = "country";

  /**
   * @uiName Country Dropdown label
   */
  @Prop() dropdownLabel: string = "Country";
  /**
   * @uiName Unselected error message
   */
  @Prop() errorMessage: string = "Select a country";

  /**
   * @uiName Required
   */
  @Prop() dropdownRequired?: boolean = true;

  /**
   * @uiName Country name locale override
   */
  @Prop() locale: string | null = null;

  /** @undocumented */
  @Prop() demoData?: DemoData<CountryFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const content = {
      ...getProps(this),
      selectOptions: <slot></slot>,
    };

    const { states } = useDropdownField();

    const { data } = isDemo()
      ? useCountryFieldDemo(this)
      : useCountryField(this);
    return (
      <CountryFieldView
        states={states}
        content={content}
        data={data}
      ></CountryFieldView>
    );
  }
}
function useCountryFieldDemo(
  props: CountryField
): Partial<CountryFieldViewProps> {
  return deepmerge(
    {
      states: {
        validationErrors: [],
      },
      data: {
        countries: [],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
