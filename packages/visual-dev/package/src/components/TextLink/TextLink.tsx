import * as React from "react";
import styled, { CSSProp, css } from "styled-components";
import * as Styles from "./Styles";

type TagProps = OptionProps & StyleProps & Partial<React.ComponentProps<"a">>;

export interface OptionProps {
  /**
   * Used to set the underline behavior. The default is always.
   */
  underline?: "always" | "hover" | "none";
  /**
   * Callback triggered when the Link is clicked
   */
  onClick?: (e?: any) => void;
  /**
   * Content displayed inside tag, generally small pieces of content like a <span>
   */
  children: React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to tag
   */
  customCSS?: CSSProp;
}

const TextLinkA = styled.a<{
  underline: "always" | "hover" | "none";
  customCSS?: CSSProp;
}>`
  ${Styles.base}
  ${({ underline }) =>
    // refactor this to a switch statement
    underline === "hover"
      ? css`
          &:hover {
            text-decoration: underline;
          }
        `
      : underline === "none"
      ? css`
          text-decoration: none;
        `
      : css`
          text-decoration: underline;
        `}

  ${(props) => props.customCSS}
`;

export const TextLinkView = React.forwardRef<React.ElementRef<"a">, TagProps>(
  (props, forwardedRef) => {
    const {
      onClick,
      underline = "always",
      children,
      customCSS = {},
      ...rest
    } = props;

    return (
      <TextLinkA
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
        underline={underline}
      >
        {children}
      </TextLinkA>
    );
  }
);

/**
 * @deprecated use {@link TextLinkView} instead
 */
export const TextLink = TextLinkView;
