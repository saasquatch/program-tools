import * as React from "react";
import styled, { CSSProp } from "styled-components";

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
  ${(props) => props.customCSS}
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
    <DataTableDiv
      width={width}
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </DataTableDiv>
  );
});
