import * as React from "react";
import root from "react-shadow/styled-components";
import styled from "styled-components";
import * as Styles from "./Styles";

type GroupProps = React.ComponentProps<"input"> & GroupOptions;

type InputProps = OptionProps & Omit<React.ComponentProps<"input">, "value">;

export interface GroupOptions {
  /**
   * Display two columns of radios
   */
  twoColumns?: boolean;
}
export interface OptionProps {
  /**
   * Current value of radio group
   */
  value?: any;
  /**
   * Value of radio action
   */
  optionValue?: any;
  /**
   * Onchange action for radio action
   */
  onChange?: any;
  /**
   * Action title
   */
  title: string;
  /**
   * Action description
   */
  description?: string | React.ReactNode;
}

const ShadowDom = styled(root.div)``;

const Container = styled.div<{ twoColumns: boolean }>`
  display: contents;
  ${(props) =>
    props.twoColumns &&
    `display: grid;
    width: 100%;
    display: grid;
    grid-auto-columns: 1fr 1fr;
    grid-auto-flow: column;
    grid-gap: var(--sq-spacing-small)`}
`;

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
  const { value, optionValue, onChange, title, description, ...rest } = props;

  const selected = value === optionValue;

  return (
    <RadioLabel htmlFor={rest.id} isChecked={selected}>
      <RadioInput
        type="radio"
        checked={selected}
        readOnly
        {...rest}
        ref={forwardedRef}
      />
      <RadioButton />
      <RadioText>
        {title ? <div> {title} </div> : ""}
        {description ? (
          <div style={{ color: "var(--sq-text-subdued)", marginTop: 4 }}>
            {" "}
            {description}{" "}
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
  GroupProps
>((props) => {
  const { twoColumns = false, children } = props;
  console.log(twoColumns);
  return (
    <ShadowDom>
      <Container twoColumns={twoColumns}>{children}</Container>
    </ShadowDom>
  );
});
