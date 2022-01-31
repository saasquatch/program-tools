import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import React from "react";

type TextareaProps = OptionProps &
  Omit<React.ComponentProps<"textarea">, "value" | "css">;

type TextareaSizeType = boolean | string;

export interface OptionProps {
  /**
   * Textarea value
   */
  value?: any;
  /**
   * Onchange action for textarea
   */
  onChange?: any;
  /**
   * Disable textarea
   */
  disabled?: boolean;
  /**
   * Errors on textarea
   */
  errors?: any;
  /**
   * Custon CSS applied to textarea
   */
  customCSS?: CSSProp;
  /**
   * Limit textarea width (to default or custom value)
   */
  limitWidth?: TextareaSizeType;
  /**
   * Limit textarea height (to default or custom value)
   */
  height?: string;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const TextareaBox = styled.textarea<{
  isInvalid: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.TextareaBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : "")}
  ${(props) => props.customCSS}
`;

const Container = styled.div<{
  limitWidth: TextareaSizeType;
  height: string;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
  ${(props) => `height: ${props.height}`}
`;

export const Textarea = React.forwardRef<
  React.ElementRef<"textarea">,
  TextareaProps
>((props, forwardedRef) => {
  const {
    errors: rawErrors,
    customCSS = {},
    limitWidth = true,
    height = "48px",
    required = false,
    ...rest
  } = props;
  return (
    <ShadowDom>
      <Container height={height} limitWidth={limitWidth}>
        <TextareaBox
          {...rest}
          ref={forwardedRef}
          isInvalid={rawErrors}
          customCSS={customCSS}
          required={required}
        />
      </Container>
    </ShadowDom>
  );
});
