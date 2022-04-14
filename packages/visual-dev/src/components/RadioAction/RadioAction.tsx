import * as React from "react";
import root from "react-shadow/styled-components";
import styled from "styled-components";
import * as Styles from "./Styles";

type GroupProps = React.ComponentProps<"input"> & GroupOptions;

type InputProps = OptionProps &
  Omit<React.ComponentProps<"input">, "value" | "css">;

export interface GroupOptions {
  /**
   * Display two columns of radio actions
   */
  twoColumns?: boolean;
}
export interface OptionProps {
  /**
   * Current value of radio action form group
   */
  value?: any;
  /**
   * Form value of radio action
   */
  optionValue?: any;
  /**
   * Callback triggered on radio action select/deselect
   */
  onChange?: any;
  /**
   * Title that appears next to the radio
   */
  title: string;
  /**
   * Description that appears below the title, use ReactNodes for custom text styles
   */
  description?: string | React.ReactNode;
}

const ShadowDom = styled(root.div)``;

const ContainerDiv = styled.div<{ twoColumns: boolean }>`
  display: contents;
  ${(props) => props.twoColumns && Styles.RadioTwoColumn}
`;

const RadioLabel = styled.label<{ isChecked: boolean }>`
  ${Styles.RadioLabelStyle}
  ${(props) => (props.isChecked ? "background: var(--sq-background);" : "")}
`;
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`;
const RadioButtonDiv = styled.div`
  ${Styles.RadioButtonStyle}
`;
const RadioTextDiv = styled.div`
  ${Styles.RadioTextStyle}
`;

export const RadioActionView = React.forwardRef<
  React.ElementRef<"input">,
  InputProps
>((props, forwardedRef) => {
  const { value, optionValue, onChange, title, description, ...rest } = props;

  const selected = value === optionValue;
  console.log(selected);

  return (
    <RadioLabel htmlFor={rest.id} isChecked={selected}>
      <RadioInput
        {...rest}
        type="radio"
        checked={selected}
        readOnly
        ref={forwardedRef}
      />
      <RadioButtonDiv />
      <RadioTextDiv>
        {title ? <div> {title} </div> : ""}
        {description ? (
          <div style={{ color: "var(--sq-text-subdued)", marginTop: 4 }}>
            {" "}
            {description}{" "}
          </div>
        ) : (
          ""
        )}
      </RadioTextDiv>
    </RadioLabel>
  );
});

export const RadioActionGroupView = (props: GroupProps) => {
  const { twoColumns = false, children } = props;
  return (
    <ShadowDom>
      <ContainerDiv twoColumns={twoColumns}>{children}</ContainerDiv>
    </ShadowDom>
  );
};

/**
 * @deprecated use {@link RadioActionView} instead
 */
export const RadioAction = RadioActionView;

/**
 * @deprecated use {@link RadioGroupView} instead
 */
export const RadioActionGroup = RadioActionGroupView;
