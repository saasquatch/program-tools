import React from "react";
import styled, { CSSProp } from "styled-components";

type FilterProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Filters to display, usually dropdowns
   */
  children?: string | React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to filter
   */
  customCSS?: CSSProp;
}

const MenusDiv = styled.div<Required<StyleProps>>`
  div + div {
    margin-left: var(--sq-spacing-x-small);
  }
  margin-bottom: var(--sq-spacing-large);

  ${(props) => props.customCSS}
`;

export const FilterView = React.forwardRef<
  React.ElementRef<"div">,
  FilterProps
>((props, forwardedRef) => {
  const { children, customCSS = "", ...rest } = props;
  return (
    <MenusDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      {children}
    </MenusDiv>
  );
});

/**
 * @deprecated use {@link FilterView} instead
 */
export const Filter = FilterView;
