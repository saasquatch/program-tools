import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";
import React from "react";

type InputProps = OptionProps &
  Omit<React.ComponentProps<"input">, "value" | "css">;

type InputWidthType = boolean | string;

export interface OptionProps {
  /**
   * Input value
   */
  value?: any;
  /**
   * Onchange action for input
   */
  onChange?: any;
  /**
   * Disable input
   */
  disabled?: boolean;
  /**
   * Input type
   */
  type?: string;
  /**
   * Errors on input
   */
  errors?: any;
  /**
   * Icon displayed with input
   */
  icon?: IconKey;
  /**
   * Button displayed with input
   */
  buttons?: React.ReactElement;
  /**
   * Position on icons/buttons
   */
  position?: "left" | "right";
  /**
   * Custon CSS applied to input
   */
  customCSS?: CSSProp;
  /**
   * Limit input with (to default or custom value)
   */
  limitWidth?: InputWidthType;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const InputBox = styled.input<{
  isInvalid: boolean;
  position: string;
  hasIcon: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.InputBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : "")}
  ${(props) => props.hasIcon && "padding-right: var(--sq-spacing-xxx-large)"}
  ${(props) => (props.position == "left" ? "text-indent: 40px;" : "")}
  ${(props) => props.customCSS}
`;

const ExtrasDiv = styled.div<{ position: string }>`
  ${Styles.ExtrasDiv}
  ${(props) => (props.position == "left" ? "left: 12px;" : "right: 12px;")}
`;

const Container = styled.div<{ limitWidth: InputWidthType }>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
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
      limitWidth = true,
      required = false,
      ...rest
    } = props;

    return (
      <ShadowDom>
        <Container limitWidth={limitWidth}>
          <InputBox
            {...rest}
            type={type}
            position={position}
            ref={forwardedRef}
            isInvalid={rawErrors}
            customCSS={customCSS}
            hasIcon={icon || buttons ? true : false}
            required={required}
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
