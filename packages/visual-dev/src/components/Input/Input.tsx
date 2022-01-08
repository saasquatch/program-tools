import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";
import React from "react";

type InputProps = OptionProps & Omit<React.ComponentProps<"input">, "value"|"css">;

export interface OptionProps {
  value?: any;
  onChange?: any;
  disabled?: boolean;
  type?: string;
  errors?: any;
  icon?: IconKey;
  buttons?: React.ReactElement;
  position?: "left" | "right";
  customCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const InputBox = styled.input<{
  isInvalid: boolean;
  position: string;
  customCSS: CSSProp;
}>`
  ${Styles.InputBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : "")}
  ${(props) => (props.position == "left" ? "text-indent: 40px;" : "")}
  ${(props) => props.customCSS}
`;

const ExtrasDiv = styled.div<{ position: string }>`
  ${Styles.ExtrasDiv}
  ${(props) => (props.position == "left" ? "left: 12px;" : "right: 12px;")}
`;

const Container = styled.div`
  ${Styles.Container}
`;

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (props, forwardedRef) => {
    const {
      icon,
      position = "right",
      type = "text",
      buttons = false,
      errors: rawErrors,
      customCSS = {},
      ...rest
    } = props;

    return (
      <ShadowDom>
        <Container>
          <InputBox
            {...rest}
            type={type}
            position={position}
            ref={forwardedRef}
            isInvalid={rawErrors}
            customCSS={customCSS}
          />
          {icon && (
            <ExtrasDiv position={position}>
              <Icon icon={icon} size={"22px"} color="var(--sq-text-subdued)" />
            </ExtrasDiv>
          )}
          <ExtrasDiv position={position}>{buttons}</ExtrasDiv>
        </Container>
      </ShadowDom>
    );
  }
);
