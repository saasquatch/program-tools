import * as React from "react";
import styled, { CSSProp } from "styled-components";

import * as Styles from "./Styles";

type SwitchProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate"|"css">;

export interface OptionProps {
  checked?: boolean;
  color?: "success" | "critical";
}

export interface StyleProps {
  customCSS?: CSSProp;
}

const SwitchBox = styled.div<Required<StyleProps>>`
  ${Styles.wrapper}
  ${(props) => props.customCSS}
`;

const SwitchButton = styled.label`
  ${Styles.base}
`;

const SwitchBackground = styled.input<Required<{ color: string }>>`
  ${Styles.off}
  &:checked + ${SwitchButton} {
    ${(props) => Styles[props.color]}
    ${Styles.on}
  }
`;

export const Switch = React.forwardRef<React.ElementRef<"div">, SwitchProps>(
  (props, forwardedRef) => {
    const { id, color = "success", checked = false, customCSS = {}, ...rest } = props;

    return (
      <SwitchBox {...rest} ref={forwardedRef} customCSS={customCSS}>
        <SwitchBackground
          color={color}
          id={id}
          type="checkbox"
          checked={checked}
        />
        <SwitchButton htmlFor={id} />
      </SwitchBox>
    );
  }
);
