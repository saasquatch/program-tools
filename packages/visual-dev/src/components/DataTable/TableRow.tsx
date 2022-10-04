import React from "react";
import { RowDiv, StyleProps } from "./Row";

type TableRowViewProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Content to display in row, one element per table cell
   */
  children?: any;
}

export const TableRowView = React.forwardRef<
  React.ElementRef<"div">,
  TableRowViewProps
>((props, forwardedRef) => {
  const {
    variant = "row",
    children,
    customCSS = {},

    ...rest
  } = props;

  return (
    <RowDiv
      variant={variant}
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </RowDiv>
  );
});
