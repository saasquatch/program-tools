import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { RequiredPropsError } from "../../utils/RequiredPropsError";
import { getMissingProps, getProps } from "../../utils/utils";
import { InputFieldView, InputFieldViewProps } from "./sqm-input-field-view";
import { useInputField } from "./useInputField";

/**
 * @uiName Input Field
 */
@Component({
  tag: "sqm-input-field",
})
export class InputField {
  @State()
  ignored = true;

  /**
   * @uiName Input name attribute
   */
  @Prop() fieldName: string;

  /**
   * @uiName Input label
   */
  @Prop() fieldLabel: string;

  /**
   * @uiName Input Type
   * @uiType string
   * @uiEnum ["text", "date", "tel"]
   */
  @Prop() fieldType: "text" | "date" | "tel" = "text";

  /**
   * @uiName Empty error message
   */
  @Prop() errorMessage: string = "Cannot be empty";

  /**
   * @uiName Optional
   */
  @Prop() fieldOptional?: boolean = false;

  /** @undocumented */
  @Prop() demoData?: DemoData<InputFieldViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const content = {
      ...getProps(this),
    };

    const missingProps = getMissingProps([
      {
        attribute: "field-name",
        value: this.fieldName,
      },
    ]);

    if (missingProps) {
      return <RequiredPropsError missingProps={missingProps} />;
    }

    const { states } = isDemo() ? useInputFieldDemo(this) : useInputField();
    return <InputFieldView states={states} content={content}></InputFieldView>;
  }
}
function useInputFieldDemo(props: InputField): Partial<InputFieldViewProps> {
  return deepmerge(
    {
      states: {
        validationErrors: [],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
