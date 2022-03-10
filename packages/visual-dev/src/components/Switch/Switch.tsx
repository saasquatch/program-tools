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
  onChange?: any;
  value?: boolean;
  color?: "success" | "critical";
  id?: string;
}

export interface StyleProps {
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
