import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import React from "react";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

type TextareaProps = OptionProps & Partial<React.ComponentProps<"textarea">>;

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

const ContainerDiv = styled.div<{
  limitWidth: TextareaSizeType;
  initialHeight: string;
  customCSS: CSSProp;
}>`
  ${Styles.Container}
  ${(props) => `height: ${props.initialHeight};`}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}

  uicl-text-area {
    height: 100%
  }

  uicl-text-area::part(base){
    height: 100%
  }

  uicl-text-area::part(input){
    ${(props) => props.customCSS}
  }
`;

const UICLTextInput = wrapWc("uicl-text-area");


export const TextareaView = React.forwardRef<
  React.ElementRef<"textarea">,
  TextareaProps
>((props, forwardedRef) => {
  const {
    errors: rawErrors,
    customCSS = {},
    limitWidth = true,
    height = "48px",
    disabled = false,
    placeholder,
    value,
    onChange,
    ...rest
  } = props;

  console.log(height)
  console.log(limitWidth)
  return (
      <ContainerDiv
        customCSS={customCSS}
        initialHeight={height}
        limitWidth={limitWidth}
      >
        <UICLTextInput
          {...rest}
          ref={forwardedRef}
          isDisabled={wcBoolean(disabled)}
          isReadOnly={wcBoolean(disabled || false)}
          placeholder={placeholder}
          modelValue={value}
          update:model-value={(e: any) => onChange(e)}
          validationFail={rawErrors ? "" : null}
        />
      </ContainerDiv>
  );
});

/**
 * @deprecated use {@link TextareaView} instead
 */
export const Textarea = TextareaView;
