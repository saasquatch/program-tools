import React from "react";
import styled, { CSSProp } from "styled-components";

type FilterProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  children?: string | React.ReactNode;
}

interface StyleProps {
  customCSS?: CSSProp;
}

const Menus = styled.div<Required<StyleProps>>`
  div + div {
    margin-left: var(--sq-spacing-x-small);
  }
  margin-bottom: var(--sq-spacing-large);

  ${(props) => props.customCSS}
`;

export const Filter = React.forwardRef<React.ElementRef<"div">, FilterProps>(
  (props, forwardedRef) => {
    const { children, customCSS = "", ...rest } = props;
    return (
      <Menus {...rest} ref={forwardedRef} customCSS={customCSS}>
        {children}
      </Menus>
    );
  }
);
