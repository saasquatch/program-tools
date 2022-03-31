import React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type FilterProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Content that appears inside the banner, generally inline elements
   */
  children?: string | React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to banner
   */
  customCSS?: CSSProp;
}

const BannerDiv = styled.div<Required<StyleProps>>`
  ${Styles.BannerDiv}

  ${(props) => props.customCSS}
`;

export const BannerView = React.forwardRef<
  React.ElementRef<"div">,
  FilterProps
>((props, forwardedRef) => {
  const { children, customCSS = "", ...rest } = props;
  return (
    <BannerDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {children}
    </BannerDiv>
  );
});

/**
 * @deprecated use {@link BannerView} instead
 */
export const Banner = BannerView;
