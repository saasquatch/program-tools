import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type RadioProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"input">, "translate" | "value" | "css">;

export interface OptionProps {
  /**
   * Value for form input
   */
  value?: any;
  /**
   * Callback triggered on radio select/deselect
   */
  onChange?: any;
  /**
   * Label for the radio, appears on the right
   */
  label?: React.ReactNode | "string";
}

export interface StyleProps {
  /**
   * Custom CSS applied to radio
   */
  customLabelCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const RadioLabel = styled.label<Required<StyleProps>>`
  ${Styles.RadioLabelStyle}
  ${(props) => props.customLabelCSS}
`;

const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`;

const RadioButtonDiv = styled.div`
  ${Styles.RadioButtonStyle}
`;

export const RadioView = React.forwardRef<
  React.ElementRef<"input">,
  RadioProps
>((props, forwardRef) => {
  const { value, onChange, label, customLabelCSS = {}, ...rest } = props;
  return (
    <RadioLabel customLabelCSS={customLabelCSS} htmlFor={rest.id}>
      <RadioInput
        {...rest}
        type="radio"
        checked={value}
        onChange={onChange}
        ref={forwardRef}
      />
      <RadioButtonDiv />
      {label ? label : ""}
    </RadioLabel>
  );
});

export const RadioGroupView = (props: RadioProps) => {
  const { children } = props;

  return <ShadowDom>{children}</ShadowDom>;
};

/**
 * @deprecated use {@link RadioView} instead
 */
export const Radio = RadioView;

/**
 * @deprecated use {@link RadioGroupView} instead
 */
export const RadioGroup = RadioGroupView;
