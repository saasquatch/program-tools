import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { DataGraphic } from "../Graphics";
import * as Styles from "./Styles";

type DataTableProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Table content, almost always "row" variant Row components
   */
  children?: any;
  /**
   * Render table in the empty state
   */
  empty?: boolean;
  /**
   * Render table in the loading state
   */
  loading?: boolean;
  /**
   * Content at the top of the table, generally heading and banners
   */
  headerSlot?: React.ReactNode;
  /**
   * Content at the bottom of the table, almost always pagination
   */
  footerSlot?: React.ReactNode;
  /**
   * Render in empty filter state
   */
  emptyFilter?: boolean;
  /**
   * Content to display in place of rows while the table is in the empty state
   */
  emptyContent?: string | React.ReactNode;
  /**
   * Content to display in place of rows while the table is in the empty filter state
   */
  emptyFilterContent?: string | React.ReactNode;
  /**
   *
   */
  loadingSlot?: React.ReactNode | React.ReactNode[];
}

export interface StyleProps {
  /**
   * Limit the width of the table, use valid CSS size units (px, %, em, rem)
   */
  width?: string;
  /**
   * Custom CSS applied to table container
   */
  customCSS?: CSSProp;
}

const DataDiv = styled.div`
  ${Styles.DataDiv}
`;

const RowDiv = styled.div`
  ${Styles.RowBase}
  ${Styles.Row.row}
`;

const DataTableDiv = styled.div<Required<StyleProps>>`
  ${Styles.DataTableDiv}
  width: ${(props) => props.width};
  ${(props) => props.customCSS}
`;

export const DataTableView = React.forwardRef<
  React.ElementRef<"div">,
  DataTableProps
>((props, forwardedRef) => {
  const {
    width = "100%",
    children,
    customCSS = {},
    empty = false,
    loading = false,
    emptyFilter = false,
    emptyContent = "No submission found",
    emptyFilterContent = "No submissions that meet your filter criteria",
    headerSlot = <></>,
    footerSlot = <></>,
    loadingSlot = <></>,
    ...rest
  } = props;

  return (
    <DataTableDiv
      {...rest}
      width={width}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {headerSlot}
      {loading && loadingSlot}
      {!loading && empty && (
        <RowDiv>
          <DataDiv>
            {DataGraphic}
            <br />
            {emptyContent}
          </DataDiv>
        </RowDiv>
      )}
      {!loading && !empty && emptyFilter && (
        <RowDiv>
          <DataDiv>
            {DataGraphic}
            <br />
            {emptyFilterContent}
          </DataDiv>
        </RowDiv>
      )}
      {!loading && !empty && !emptyFilter && children}
      {footerSlot}
    </DataTableDiv>
  );
});

/**
 * @deprecated use {@link DataTableView} instead
 */
export const DataTable = DataTableView;
