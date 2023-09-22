import styled, { CSSProp } from "styled-components";
import { IconKey, IconView } from "../Icon";
import React from "react";
import { wcBoolean } from "../../utlis";
import { wrapWc } from "../../wc-react";
import * as Styles from "./Styles";

type InputProps = OptionProps & Partial<React.ComponentProps<"input">>;

export type InputWidthType = boolean | string;

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
  /**
   * Inner text left
   */
  innerTextLeft?: string;
  /**
   * Inner text right
   */
  innerTextRight?: string;
  /**
   * Inner icon right
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
   * Custon CSS applied to the input container
   */
  customContainerCSS?: CSSProp;
  /**
   * Limit the input width using a valid CSS size value (e.g. px, %) [default 300px]
   */
  limitWidth?: InputWidthType;
}

const ExtrasDiv = styled.div<{ position: string }>`
  ${Styles.ExtrasDiv}
  ${(props) => (props.position == "left" ? "left: 12px;" : "right: 18px;")}
`;

const StyleWrapperDiv = styled.div<{
  customContainerCSS: CSSProp;
  limitWidth: InputWidthType;
  position: string;
  hasIcon: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 226px;"
      : "max-width: 100%;"}
  ${(props) => props.customContainerCSS}

  uicl-text-input, uicl-text-input::part(base) {
    width: 100%;
    box-sizing: border-box;
  }

  uicl-text-input::part(input) {
    ${(props) =>
      props.hasIcon &&
      `padding-${props.position}: var(--sq-spacing-xxx-large);`}
    ${(props) => props.customCSS}
  }
`;

const UICLTextInput = wrapWc("uicl-text-input");

export const InputView = React.forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const {
      icon,
      position = "right",
      type = "text",
      buttons = false,
      errors: rawErrors,
      customCSS = {},
      customContainerCSS = {},
      limitWidth = true,
      disabled = false,
      innerTextLeft = null,
      innerTextRight = null,
      onChange,
      value,
      ...rest
    } = props;

    return (
      <StyleWrapperDiv
        customContainerCSS={customContainerCSS}
        customCSS={customCSS}
        hasIcon={icon || buttons ? true : false}
        position={position}
        limitWidth={limitWidth}
      >
        <UICLTextInput
          {...rest}
          ref={forwardedRef}
          isAutoWidth={wcBoolean(false)}
          // isDisabled={null}
          // isReadOnly={wcBoolean(disabled || false)}
          innerTextLeft={innerTextLeft}
          innerTextRight={innerTextRight}
          validationFail={rawErrors ? "" : null}
          maxLength={1000}
          modelValue={value}
          update:model-value={(e: any) => onChange(e)}
          size="20"
          type={type}
        ></UICLTextInput>
        {icon && (
          <ExtrasDiv position={position}>
            <IconView
              icon={icon}
              size={"22px"}
              color="var(--sq-text-subdued)"
            />
          </ExtrasDiv>
        )}
        <ExtrasDiv position={position}>{buttons}</ExtrasDiv>
      </StyleWrapperDiv>
    );
  }
);

/**
 * @deprecated use {@link InputView} instead
 */
export const Input = InputView;
