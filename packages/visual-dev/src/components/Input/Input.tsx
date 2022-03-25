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
   * Value of the input
   */
  value?: any;
  /**
   * Callback triggered when the input changes
   */
  onChange?: any;
  /**
   * Disable the input
   */
  disabled?: boolean;
  /**
   * HTML input type (e.g. password)
   */
  type?: string;
  /**
   * Render with a red background and border to indicate an error
   */
  errors?: any;
  /**
   * Key of an icon to display inside the input field
   */
  icon?: IconKey;
  /**
   * Button to display inside the input field
   */
  buttons?: React.ReactElement;
  /**
   * Choose which end of the input to display the button/icon [default "left"]
   */
  position?: "left" | "right";
  /**
   * Custon CSS applied to input
   */
  customCSS?: CSSProp;
  /**
   * Limit the input width using a valid CSS size value (e.g. px, %) [default 300px]
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
