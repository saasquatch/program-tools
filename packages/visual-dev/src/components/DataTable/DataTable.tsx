import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { DataGraphic } from "../Graphics";
import * as Styles from "./Styles";

type DataTableProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  children?: any;
  search?: boolean;
  empty?: boolean;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  emptyFilter?: boolean;
  emptyContent?: string | React.ReactNode;
  emptyFilterContent?: string | React.ReactNode;
}

export interface StyleProps {
  width?: string;
  customCSS?: CSSProp;
}

const DataDiv = styled.div`
  ${Styles.DataDiv}
`;

const RowDiv = styled.div`
  ${Styles.RowBase}
  ${Styles.Row.row}
`;

const DataTableContainer = styled.div<Required<StyleProps>>`
  ${Styles.DataTableDiv}
  width: ${(props) => props.width};
  ${(props) => props.customCSS}
`;

export const DataTable = React.forwardRef<
  React.ElementRef<"div">,
  DataTableProps
>((props, forwardedRef) => {
  const {
    width = "100%",
    search = false,
    children,
    customCSS = {},
    empty = false,
    emptyFilter = false,
    emptyContent = "No submission found",
    emptyFilterContent = "No submissions that meet your filter criteria",
    headerSlot: headerContent = <></>,
    footerSlot: footerContent = <></>,
    ...rest
  } = props;

  return (
    <DataTableContainer
      {...rest}
      width={width}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {headerContent}
      {empty && (
        <RowDiv>
          <DataDiv>
            {DataGraphic}
            <br />
            {emptyContent}
          </DataDiv>
        </RowDiv>
      )}
      {!empty && emptyFilter && (
        <RowDiv>
          <DataDiv>
            {DataGraphic}
            <br />
            {emptyFilterContent}
          </DataDiv>
        </RowDiv>
      )}
      {!empty && !emptyFilter && children}
      {footerContent}
    </DataTableContainer>
  );
});
