import * as React from "react";
import styled, { CSSProp } from "styled-components";
import root from "react-shadow/styled-components";
import * as Styles from "./Styles";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

type SwitchProps = Partial<
  Omit<React.ComponentProps<"input">, "value" | "css" | "label">
> &
  OptionProps &
  StyleProps;

export interface OptionProps {
  /**
   * Callback triggered on switch state change
   */
  onChange?: any;
  /**
   * Current form value of the switch
   */
  value?: boolean;
  /**
   * Indicte a positive action (success) or negative action (critical)
   */
  color?: "success" | "critical";
  /**
   * Switch element id
   */
  id?: string;
}

export interface StyleProps {
  /**
   * CSS applied to switch
   */
  customCSS?: CSSProp;
}

const SwitchContainerDiv = styled.div<Required<StyleProps>>`
  ${Styles.wrapper}
  ${(props) => props.customCSS}
`;


const UICLSwitch = styled(wrapWc("uicl-checkbox"))`
`;

export const SwitchView = React.forwardRef<
  React.ElementRef<"input">,
  SwitchProps
>((props, forwardedRef) => {
  const {
    id,
    color = "success",
    value,
    checked,
    customCSS = {},
    onChange,
    ...rest
  } = props;

  return (
  <SwitchContainerDiv customCSS={customCSS}>
        <UICLSwitch
          {...rest}
          color={color}
          type="checkbox"
          modelValue={value || checked ? "true" : null}
          isToggleDisplay={wcBoolean(true)}
          update:model-value={(e: any) => onChange(e)}
          id={id}
          ref={forwardedRef}
        />
  </SwitchContainerDiv>
  );
});

/**
 * @deprecated use {@link SwitchView} instead
 */
export const Switch = SwitchView;
