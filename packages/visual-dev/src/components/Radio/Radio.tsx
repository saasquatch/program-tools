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
  options?: any;
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
    const { value, onChange, options, ...rest } = props;
    return (
      <RadioLabel htmlFor={rest.id}>
        <RadioInput
          type="radio"
          checked={value}
          onChange={onChange}
          {...rest}
          ref={forwardRef}
        />
        <RadioButton />
        {options.text ? options.text : ""}
      </RadioLabel>
    );
  }
);

export const RadioGroup = React.forwardRef<React.ElementRef<"div">, RadioProps>(
  (props) => {
    const { children } = props;

    return <ShadowDom>{children}</ShadowDom>;
  }
);
