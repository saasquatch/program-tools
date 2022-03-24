import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import React from "react";

type TextareaProps = OptionProps &
  Omit<React.ComponentProps<"textarea">, "value" | "css">;

type TextareaSizeType = boolean | string;

export interface OptionProps {
  /**
   * Form value of the textarea
   */
  value?: any;
  /**
   * Callback triggered when the textarea input changes
   */
  onChange?: any;
  /**
   * Render in the disabled state and disallow input
   */
  disabled?: boolean;
  /**
   * Indicate an error with a red border and background
   */
  errors?: any;
  /**
   * Custon CSS applied to textarea input
   */
  customCSS?: CSSProp;
  /**
   * Limit textarea width, use "true" to fill parent, or indicate a custom value with a CSS size value (px, %) [default 300px]
   */
  limitWidth?: TextareaSizeType;
  /**
   * Limit textarea width, use "true" to fill parent, or indicate a custom value with a CSS size value (px, %) [default 48px]
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
