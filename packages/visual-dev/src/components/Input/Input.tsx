import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import { IconKey, IconView } from "../Icon";
import React from "react";
//@ts-ignore
import { register } from "@impactinc/ui-component-library/web-components";
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

const ShadowDom = styled(root.div)`
  display: contents;
`;

const StyledInput = styled.input<{
  isInvalid: boolean;
  position: string;
  hasIcon: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.InputBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : "")}
  ${(props) => props.hasIcon && "padding-right: var(--sq-spacing-xxx-large);"}
  ${(props) => (props.position == "left" ? "text-indent: 46px;" : "")}
  ${(props) => props.customCSS}
`;

const ExtrasDiv = styled.div<{ position: string }>`
  ${Styles.ExtrasDiv}
  ${(props) => (props.position == "left" ? "left: 12px;" : "right: 12px;")}
`;

const ContainerDiv = styled.div<{
  customContainerCSS: CSSProp;
  limitWidth: InputWidthType;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
  ${(props) => props.customContainerCSS}
`;
const StyleWrapperDiv = styled.div<{
  customContainerCSS: CSSProp;
  limitWidth: InputWidthType;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 226px;"
      : "max-width: 100%;"}
`;

const UICLTextInput = styled(wrapWc("uicl-text-input"))``;

export const InputView = React.forwardRef<HTMLInputElement, InputProps>(
  (props) => {
    const {
      icon,
      position = "right",
      type = "text",
      buttons = false,
      errors: rawErrors,
      customCSS = {},
      customContainerCSS = {},
      limitWidth = true,
      required = false,
      disabled = false,
      ...rest
    } = props;

    if (customElements.get("uicl-text-input") === undefined) {
      register();
    }
    return (
      <StyleWrapperDiv
        customContainerCSS={customContainerCSS}
        limitWidth={limitWidth}
      >
        <ShadowDom>
          <UICLTextInput
            ref={forwardedRef}
            field-name="args.fieldName"
            is-auto-width={wcBoolean(false)}
            max-length="1000"
            is-disabled={wcBoolean(disabled)}
            is-read-only={wcBoolean(false)}
            size="20"
            type="text"
            {...rest}
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
        </ShadowDom>
      </StyleWrapperDiv>
    );

    // return (
    //   <ShadowDom>
    //     <ContainerDiv
    //       customContainerCSS={customContainerCSS}
    //       limitWidth={limitWidth}
    //     >
    //       <StyledInput
    //         {...rest}
    //         type={type}
    //         position={position}
    //         ref={forwardedRef}
    //         isInvalid={rawErrors}
    //         customCSS={customCSS}
    //         hasIcon={icon || buttons ? true : false}
    //         required={required}
    //       />

    //     </ContainerDiv>
    //   </ShadowDom>
    // );
  }
);

/**
 * @deprecated use {@link InputView} instead
 */
export const Input = InputView;
