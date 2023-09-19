import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

type InputProps = OptionProps &
  Omit<Partial<React.ComponentProps<"input">>, "translate" | "value" | "css">;

export interface OptionProps {
  /**
   * Form value supplied to checkbox
   */
  value?: any;
  /**
   * Callback triggered on checkbox click
   */
  onChange?: (e: any) => void;
  /**
   * Label adjacent to checkbox
   */
  label?: string | boolean | React.ReactNode;
  /**
   * Render in disabled state
   */
  disabled?: boolean;
  /**
   * Checkbox element id
   */
  id?: string;
  /**
   * Custom CSS applied to the checkbox container
   */
  customContainerCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const StyleWrapperDiv = styled.div<{ customContainerCSS?: CSSProp }>`
  display: inline;
  ${(props) => props.customContainerCSS}
`;

const CheckboxLabel = styled.label<{
  isDisabled?: any;
}>`
  ${Styles.CheckboxLabelStyle}
  ${(props) => props.isDisabled && Styles.disabled_color}
`;

const UICLCheckbox = styled(wrapWc("uicl-checkbox"))`
  ${Styles.CheckboxStyle}
`;

export const CheckboxView = React.forwardRef<HTMLElement, InputProps>(
  (props, forwardedRef) => {
    const {
      id,
      value,
      label = "",
      disabled,
      customContainerCSS = {},
      onChange = (e) => console.log("change", e),
      ...rest
    } = props;

    return (
      <StyleWrapperDiv customContainerCSS={customContainerCSS}>
        <ShadowDom>
          <CheckboxLabel htmlFor={id} isDisabled={disabled}>
            <UICLCheckbox
              id={id}
              isReadOnly={wcBoolean(disabled)}
              ref={forwardedRef}
              modelValue={value ? "true" : null}
              update:model-value={(e: any) => onChange(e)}
              {...rest}
            />
            <div>{label ? label : ""}</div>
          </CheckboxLabel>
        </ShadowDom>
      </StyleWrapperDiv>
    );
  }
);

/**
 * @deprecated use {@link CheckboxView} instead
 */
export const Checkbox = CheckboxView;
