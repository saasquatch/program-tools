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
  /**
   * Optional prop used to show actions when a row is hovered
   */
  actionsSlot?: React.ReactNode;
}

export const TableRowView = React.forwardRef<
  React.ElementRef<"div">,
  TableRowViewProps
>((props, forwardedRef) => {
  const {
    variant = "row",
    children,
    customCSS = {},
    actionsSlot,
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
      {actionsSlot && <div className="actions-container">{actionsSlot}</div>}
    </RowDiv>
  );
});
