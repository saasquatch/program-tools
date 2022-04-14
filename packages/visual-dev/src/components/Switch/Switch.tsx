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

const SwitchContainerDiv = styled.div<Required<StyleProps>>`
  ${Styles.wrapper}
  ${(props) => props.customCSS}
`;

const SwitchButtonLabel = styled.label`
  ${Styles.base}
`;

const SwitchBackgroundInput = styled.input<Required<{ color: string }>>`
  ${Styles.off}
  &:checked + ${SwitchButtonLabel} {
    ${(props) =>
      props.color === "critical" ? Styles.critical : Styles.success}
    ${Styles.on}
  }
`;

const ShadowDom = styled(root.div)`
  display: contents;
`;

export const SwitchView = React.forwardRef<
  React.ElementRef<"input">,
  SwitchProps
>((props, forwardedRef) => {
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
      <SwitchContainerDiv customCSS={customCSS}>
        <SwitchBackgroundInput
          {...rest}
          color={color}
          checked={value}
          type="checkbox"
          id={id}
          ref={forwardedRef}
          onChange={onChange}
        />
        <SwitchButtonLabel htmlFor={id} />
      </SwitchContainerDiv>
    </ShadowDom>
  );
});

/**
 * @deprecated use {@link SwitchView} instead
 */
export const Switch = SwitchView;
