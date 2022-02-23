import * as React from "react";
import root from "react-shadow/styled-components";
import styled from "styled-components";
import * as Styles from "./Styles";

type RadioProps = OptionProps &
  Omit<React.ComponentProps<"input">, "value" | "css">;

export interface OptionProps {
  /**
   * Value of radio
   */
  value?: any;
  /**
   * Onchange action for radio
   */
  onChange?: any;
  label?: React.ReactNode | "string";
}

const ShadowDom = styled(root.div)``;

const RadioLabel = styled.label`
  ${Styles.RadioLabelStyle}
`;
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`;
const RadioButton = styled.div`
  ${Styles.RadioButtonStyle}
`;

export const Radio = React.forwardRef<React.ElementRef<"input">, RadioProps>(
  (props, forwardRef) => {
    const { value, onChange, label, ...rest } = props;
    return (
      <RadioLabel htmlFor={rest.id}>
        <RadioInput
          {...rest}
          type="radio"
          checked={value}
          onChange={onChange}
          ref={forwardRef}
        />
        <RadioButton />
        {label ? label : ""}
      </RadioLabel>
    );
  }
);

export const RadioGroup = (props: RadioProps) => {
  const { children } = props;

  return <ShadowDom>{children}</ShadowDom>;
};
