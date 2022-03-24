import * as React from "react";
import styled, { CSSProp } from "styled-components";
import root from "react-shadow/styled-components";
import * as Styles from "./Styles";

type SwitchProps = Omit<
  React.ComponentProps<"input">,
  "value" | "css" | "label"
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

const SwitchContainer = styled.div<Required<StyleProps>>`
  ${Styles.wrapper}
  ${(props) => props.customCSS}
`;

const SwitchButton = styled.label`
  ${Styles.base}
`;

const SwitchBackground = styled.input<Required<{ color: string }>>`
  ${Styles.off}
  &:checked + ${SwitchButton} {
    ${(props) =>
      props.color === "critical" ? Styles.critical : Styles.success}
    ${Styles.on}
  }
`;

const ShadowDom = styled(root.div)``;

export const Switch = React.forwardRef<React.ElementRef<"input">, SwitchProps>(
  (props, forwardedRef) => {
    const {
      id,
      color = "success",
      value,
      customCSS = {},
      onChange,
      ...rest
    } = props;

    return (
      <ShadowDom>
        <SwitchContainer customCSS={customCSS}>
          <SwitchBackground
            {...rest}
            color={color}
            checked={value}
            type="checkbox"
            id={id}
            ref={forwardedRef}
            onChange={onChange}
          />
          <SwitchButton htmlFor={id} />
        </SwitchContainer>
      </ShadowDom>
    );
  }
);
