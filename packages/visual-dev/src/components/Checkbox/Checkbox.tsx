import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { css, CSSProp } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

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
  onChange?: any;
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

const ShadowDom = styled(root.div)<{ customContainerCSS?: CSSProp }>`
  display: contents;
  ${(props) => props.customContainerCSS}
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
  const {
    id,
    value,
    onChange,
    label = "",
    disabled,
    customContainerCSS = {},
    ...rest
  } = props;
  return (
    <ShadowDom customContainerCSS={customContainerCSS}>
      <CheckboxLabel htmlFor={id} isDisabled={disabled}>
        <CheckboxInput
          {...rest}
          checked={value}
          type="checkbox"
          isDisabled={disabled}
          id={id}
          ref={forwardedRef}
          onChange={() => onChange()}
        />
        <CheckboxDiv isDisabled={disabled}>
          <IconView icon="checkmark" customCSS={CheckboxTick} />
        </CheckboxDiv>
        <div
          style={{
            marginTop: "calc(-1*var(--sq-spacing-xxx-small))",
          }}
        >
          {label ? label : ""}
        </div>
      </CheckboxLabel>
    </ShadowDom>
  );
});

/**
 * @deprecated use {@link CheckboxView} instead
 */
export const Checkbox = CheckboxView;
