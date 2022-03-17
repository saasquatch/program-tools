import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { css } from "styled-components";
import { Icon } from "../Icon";
import * as Styles from "./Styles";

type InputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "css" | "label"
> &
  OptionProps;

export interface OptionProps {
  /**
   * Checkbox form value
   */
  value?: any;
  /**
   * Onchange callback
   */
  onChange?: any;
  /**
   * Checkbox label
   */
  label?: string | boolean;
  /**
   * Render in disabled state
   */
  disabled?: boolean;
  /**
   * Form element id
   */
  id?: string;
}

const ShadowDom = styled(root.div)``;

const CheckboxLabel = styled.label<{ isDisabled?: any }>`
  ${Styles.CheckboxLabelStyle}
  ${(props) => props.isDisabled && Styles.disabled_color}
`;
const CheckboxTick = css`
  ${Styles.CheckboxTickStyle}
`;
const CheckboxInput = styled.input<{ isDisabled?: any }>`
  ${Styles.CheckboxInputStyle}
  ${(props) =>
    props.isDisabled == true ? Styles.checked_disabled : Styles.checked_border}
`;
const CheckboxBox = styled.div<{ isDisabled?: any }>`
  ${Styles.CheckboxStyle}
  ${(props) => props.isDisabled && Styles.disabled_bg}
`;

export const Checkbox = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (props, forwardedRef) => {
    const { id, value, onChange, label = "", disabled, name, ...rest } = props;
    return (
      <ShadowDom>
        <CheckboxLabel htmlFor={id} isDisabled={disabled}>
          <CheckboxInput
            {...rest}
            checked={value}
            type="checkbox"
            isDisabled={disabled}
            id={id}
            ref={forwardedRef}
            onChange={onChange}
          />
          <CheckboxBox isDisabled={disabled}>
            <Icon icon="checkmark" customCSS={CheckboxTick} />
          </CheckboxBox>
          {label ? label : ""}
        </CheckboxLabel>
      </ShadowDom>
    );
  }
);
