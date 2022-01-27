import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import React from "react";

type TextareaProps = OptionProps &
  Omit<React.ComponentProps<"textarea">, "value" | "css">;

type TextareaWidthType = boolean | string;

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
   * Limit textarea with (to default or custom value)
   */
  limitWidth?: TextareaWidthType;
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

const Container = styled.div<{ limitWidth: TextareaWidthType }>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
`;

export const Textarea = React.forwardRef<
  React.ElementRef<"textarea">,
  TextareaProps
>((props, forwardedRef) => {
  const {
    errors: rawErrors,
    customCSS = {},
    limitWidth = true,
    required = false,
    ...rest
  } = props;

  return (
    <ShadowDom>
      <Container limitWidth={limitWidth}>
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
