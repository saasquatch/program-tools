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
}

export interface StyleProps {
  customCSS?: CSSProp;
}

const ModalActionDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalActionDivStyle}
  ${(props) => props.customCSS}
`;

export const ModalContentActionView = React.forwardRef<
  React.ElementRef<"div">,
  ModalActionProps
>((props, forwardedRef) => {
  const {
    primaryAction,
    secondaryAction,
    children,
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

  return (
    <ModalActionDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {secondaryAction && (
        <Button
          buttonType="secondary"
          pill
          onClick={secondaryOnAction}
          style={{ marginRight: 25 }}
          {...secondaryOptions}
        >
          {secondaryText}
        </Button>
      )}
      {primaryAction && (
        <Button
          buttonType="primary"
          pill
          onClick={primaryOnAction}
          critical={primaryDanger}
          {...primaryOptions}
        >
          {primaryText}
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
  stickyFooter?: boolean;
}

const ModalContentDiv = styled.div<
  Required<StyleProps & { stickyFooter: boolean }>
>`
  ${Styles.ModalContentDivStyle}
  ${(props) => props.customCSS}
  ${(props) =>
    props.stickyFooter &&
    css`
      margin-bottom: 60px;
      padding-bottom: 0;

      & ${ModalActionDiv} {
        position: absolute;
        bottom: 0;
        width: calc(100% - var(--sq-spacing-large) * 2);
        box-sizing: border-box;
        background-color: var(--sq-surface);
        padding: var(--sq-spacing-large) 0;
      }
    `}
`;

export const ModalContentView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps
>((props, forwardedRef) => {
  const { children, customCSS = {}, stickyFooter = false, ...rest } = props;
  return (
    <ModalContentDiv
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
      stickyFooter={stickyFooter}
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
  const { children, customCSS = {}, ...rest } = props;

  return <DividerDiv {...rest} ref={forwardedRef} customCSS={customCSS} />;
});

const ModalBannerDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalBannerDivStyle}
`;

export const ModalContentBannerView = React.forwardRef<
  React.ElementRef<"div">,
  ModalContentProps & { banner: any }
>((props, forwardedRef) => {
  const { banner, children, customCSS = {}, ...rest } = props;

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
  const { action, children, customCSS = {}, ...rest } = props;

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
