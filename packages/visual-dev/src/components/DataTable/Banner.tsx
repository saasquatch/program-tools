import React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type FilterProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Banner content
   */
  children?: string | React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to banner
   */
  customCSS?: CSSProp;
}

const BannerContainer = styled.div<Required<StyleProps>>`
  ${Styles.BannerDiv}

  ${(props) => props.customCSS}
`;

export const Banner = React.forwardRef<React.ElementRef<"div">, FilterProps>(
  (props, forwardedRef) => {
    const { children, customCSS = "", ...rest } = props;
    return (
      <BannerContainer {...rest} ref={forwardedRef} customCSS={customCSS}>
        {children}
      </BannerContainer>
    );
  }
);
