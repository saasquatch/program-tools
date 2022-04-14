import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { css } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

type InputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "css" | "label"
> &
  OptionProps;

export interface OptionProps {
  /**
   * Form value supplied to checkbox
   */
  value?: any;
  /**
   * Callback triggered on checkbox click
   */
  onChange?: any;
  /**
   * Label adjacent to checkbox
   */
  label?: string | boolean;
  /**
   * Render in disabled state
   */
  disabled?: boolean;
  /**
   * Checkbox element id
   */
  id?: string;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

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
const CheckboxDiv = styled.div<{ isDisabled?: any }>`
  ${Styles.CheckboxStyle}
  ${(props) => props.isDisabled && Styles.disabled_bg}
`;

export const CheckboxView = React.forwardRef<
  React.ElementRef<"input">,
  InputProps
>((props, forwardedRef) => {
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
        <CheckboxDiv isDisabled={disabled}>
          <IconView icon="checkmark" customCSS={CheckboxTick} />
        </CheckboxDiv>
        {label ? label : ""}
      </CheckboxLabel>
    </ShadowDom>
  );
});

/**
 * @deprecated use {@link CheckboxView} instead
 */
export const Checkbox = CheckboxView;
