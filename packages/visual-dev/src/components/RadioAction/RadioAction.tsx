import * as React from "react";
import root from "react-shadow/styled-components";
import styled from "styled-components";
import * as Styles from "./Styles";

type InputProps = OptionProps & React.ComponentProps<"input">;

interface OptionProps {
  value?: any;
  onChange?: any;
  options?: any;
}

const ShadowDom = styled(root.div)``;

const RadioLabel = styled.label<{ isChecked: boolean }>`
  ${Styles.RadioLabelStyle}
  ${(props) => (props.isChecked ? "background: var(--sq-background);" : "")}
`;
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`;
const RadioButton = styled.div`
  ${Styles.RadioButtonStyle}
`;
const RadioText = styled.div`
  ${Styles.RadioTextStyle}
`;

export const RadioAction = React.forwardRef<
  React.ElementRef<"input">,
  InputProps
>((props, forwardedRef) => {
  const { value, onChange, options, ...rest } = props;

  return (
    <RadioLabel htmlFor={rest.id} isChecked={value}>
      <RadioInput type="radio" checked={value} {...rest} ref={forwardedRef} />
      <RadioButton />
      <RadioText>
        {options.title ? <div> {options.title} </div> : ""}
        {options.text ? (
          <div style={{ color: "var(--sq-text-subdued)", marginTop: 4 }}>
            {" "}
            {options.text}{" "}
          </div>
        ) : (
          ""
        )}
      </RadioText>
    </RadioLabel>
  );
});

export const RadioActionGroup = React.forwardRef<
  React.ElementRef<"div">,
  InputProps
>((props) => {
  const { children } = props;

  return <ShadowDom>{children}</ShadowDom>;
});
