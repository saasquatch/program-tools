import * as React from "react";
import styled, { css, CSSProp } from "styled-components";
import { Button, ButtonProps } from "../Button";
import * as Styles from "./Styles";

type ModalActionProps = ActionOptions &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

interface ActionProps {
  onAction?: any;
  text?: any;
  danger?: any;
}

export interface ActionOptions {
  primaryAction?: ActionProps & Omit<ButtonProps, "ref">;
  secondaryAction?: ActionProps & Omit<ButtonProps, "ref">;
  isConfirmation?: boolean;
}

export interface StyleProps {
  customCSS?: CSSProp;
}

const ModalActionDiv = styled.div<
  Required<StyleProps> & { isConfirmation: boolean }
>`
  ${Styles.ModalActionDivStyle}
  ${(props) => props.isConfirmation && "width: 100%;"}
  ${(props) => props.customCSS}
`;

export const ModalContentActionView = React.forwardRef<
  React.ElementRef<"div">,
  ModalActionProps
>((props, forwardedRef) => {
  const {
    primaryAction,
    secondaryAction,
    isConfirmation = false,
    customCSS = {},
    ...rest
  } = props;

  const {
    onAction: primaryOnAction,
    text: primaryText,
    danger: primaryDanger,
    ...primaryOptions
  } = primaryAction || {};

  const {
    onAction: secondaryOnAction,
    text: secondaryText,
    danger: secondaryDanger,

    ...secondaryOptions
  } = secondaryAction || {};

  const buttonWidth = isConfirmation ? "100%" : "auto";

  return (
    <ModalActionDiv
      {...rest}
      isConfirmation={isConfirmation}
      ref={forwardedRef}
      customCSS={customCSS}
      slot="footer"
    >
      {primaryAction && (
        <Button
          buttonType="primary"
          onClick={primaryOnAction}
          critical={primaryDanger}
          style={{ width: buttonWidth }}
          customCSS={{ width: buttonWidth }}
          {...primaryOptions}
        >
          {primaryText}
        </Button>
      )}
      {secondaryAction && (
        <Button
          buttonType="text"
          critical={secondaryDanger}
          onClick={secondaryOnAction}
          style={{ width: buttonWidth }}
          customCSS={{ width: buttonWidth }}
          {...secondaryOptions}
        >
          {secondaryText}
        </Button>
      )}
    </ModalActionDiv>
  );
});

type ModalContentProps = ContentOptions &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface ContentOptions {
  children?: React.ReactNode;
  /**
   * Set the footer to always show at the bottom
   */
  stickyFooter?: boolean;
  /**
   * Max height of the container, use a valid CSS size value (px, %)
   */
  maxHeight?: string;
  /**
   * Is a confirmation style modal
   */
  isConfirmation?: boolean;
}

const ModalContentDiv = styled.div<
  Required<
    StyleProps & {
      stickyFooter: boolean;
      maxHeight: string;
      isConfirmation: boolean;
    }
  >
>`
  ${Styles.ModalContentDivStyle}
  ${(props) =>
    !props.isConfirmation && `rgba(0, 0, 0, 0.75) 0px -10px 10px -17px inset;`}
  ${(props) => props.maxHeight && `max-height: ${props.maxHeight};`}
  ${(props) => props.isConfirmation && `padding: 0 var(--sq-spacing-large);`}
  ${(props) => props.customCSS}
  ${(props) =>
    props.stickyFooter &&
    css`
      padding-bottom: 0;

      & ${ModalFooterDiv} {
        position: sticky;
        bottom: 0;
        background-color: var(--sq-surface);
      }
      & ${ModalActionDiv} {
        padding-bottom: var(--sq-spacing-large);
        box-sizing: border-box;
      }
    `}
`;

export const ModalContentView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps
>((props, forwardedRef) => {
  const {
    children,
    customCSS = {},
    maxHeight = "",
    stickyFooter = false,
    isConfirmation = false,
    ...rest
  } = props;
  return (
    <ModalContentDiv
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
      stickyFooter={stickyFooter}
      maxHeight={maxHeight}
      isConfirmation={isConfirmation}
    >
      {children}
    </ModalContentDiv>
  );
});

const ModalContentTextDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalContentTextDivStyle}
  ${(props) => props.customCSS}
`;

export const ModalContentTextView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps
>((props, forwardedRef) => {
  const { children, customCSS = {}, ...rest } = props;

  return (
    <ModalContentTextDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {children}
    </ModalContentTextDiv>
  );
});

const CodeDiv = styled.div<Required<StyleProps>>`
  ${Styles.CodeDivStyle}
  ${(props) => props.customCSS}
`;

export const ModalContentCodeView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps
>((props, forwardedRef) => {
  const { children, customCSS = {}, ...rest } = props;

  return (
    <CodeDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {children}
    </CodeDiv>
  );
});

const DividerDiv = styled.div<Required<StyleProps>>`
  ${Styles.DividerDivStyle}
  ${(props) => props.customCSS}
`;

export const ModalContentDividerView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps
>((props, forwardedRef) => {
  const { customCSS = {}, ...rest } = props;

  return <DividerDiv {...rest} ref={forwardedRef} customCSS={customCSS} />;
});

const ModalBannerDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalBannerDivStyle}
`;

export const ModalContentBannerView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps & { banner: any }
>((props, forwardedRef) => {
  const { banner, customCSS = {}, ...rest } = props;

  return (
    <ModalBannerDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {banner ? banner.icon : ""}
      {banner ? banner.text : ""}
    </ModalBannerDiv>
  );
});

const ModalBackDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalBackDivStyle}
`;

export const ModalContentTopActionView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps & { action: any }
>((props, forwardedRef) => {
  const { action, customCSS = {}, ...rest } = props;

  return (
    <ModalBackDiv
      onClick={action}
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {action ? action.icon : ""}
      {action ? action.text : ""}
    </ModalBackDiv>
  );
});

const ModalFooterDiv = styled.div<Required<StyleProps>>`
  ${(props) => props.customCSS}
`;

export const ModalContentFooter = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps
>((props, forwardedRef) => {
  const { children, customCSS = {}, ...rest } = props;

  return (
    <ModalFooterDiv
      {...rest}
      ref={forwardedRef}
      slot="footer"
      customCSS={customCSS}
    >
      {children}
    </ModalFooterDiv>
  );
});
