import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Dropdown } from "../Dropdown";

type DataTableProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  children?: any;
  empty?: boolean;
  search?: boolean;
}

export interface StyleProps {
  width?: string;
  customCSS?: CSSProp;
}

const DataTableDiv = styled.div<Required<StyleProps>>`
  width: ${(props) => props.width};
  div + div {
    margin-top: -2px;
  }
  ${(props) => props.customCSS}
`;

const Menus = styled.div`
  div + div {
    margin-left: var(--sq-spacing-x-small);
  }
  margin-bottom: var(--sq-spacing-large);
`;

export const DataTable = React.forwardRef<
  React.ElementRef<"div">,
  DataTableProps
>((props, forwardedRef) => {
  const {
    width = "100%",
    empty = false,
    search = false,
    children,
    customCSS = {},
    ...rest
  } = props;

  return (
    <>
      <Menus>
        <Dropdown text="All Forms" customCSS="min-width: 112px;" />
        <Dropdown text="Any Status" customCSS="min-width: 116px;" />
        <Dropdown
          text="30 Days"
          icon="calendar"
          customCSS="min-width: 142px;"
        />
      </Menus>
      <DataTableDiv
        width={width}
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {children}
      </DataTableDiv>
    </>
  );
});
