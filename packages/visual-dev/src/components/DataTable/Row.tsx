import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { DataGraphic } from "../Graphics";
import * as Styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "customCSS">;

export interface OptionProps {
  empty?: boolean;
  emptyFilter?: boolean;
  children?: any;
  emptyContent?: string | React.ReactNode;
  emptyFilterContent?: string | React.ReactNode;
}

export interface StyleProps {
  variant?: "row" | "header" | "extra";
  customCSS?: CSSProp;
}

const RowDiv = styled.div<Required<StyleProps>>`
  ${Styles.RowBase}

  ${(props) => Styles.Row[props.variant]}

  ${(props) => props.customCSS}
`;

const ContentDiv = styled.div<{ flex: string; center: boolean; width: string }>`
  ${Styles.ContentDiv}
  ${(props) => (props.center ? "text-align: center;" : "")}
  flex-grow: ${(props) => props.flex};
  width: ${(props) => props.width};
`;

const DataDiv = styled.div`
  ${Styles.DataDiv}
`;

export const Row = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const {
      empty = false,
      emptyFilter: filter = false,
      variant = "row",
      children,
      customCSS = {},
      emptyContent = "No submission found",
      emptyFilterContent = "No submissions that meet your filter criteria",
      ...rest
    } = props;

    return (
      <RowDiv
        variant={variant}
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {empty && (
          <DataDiv>
            {DataGraphic}
            <br />
            {emptyContent}
          </DataDiv>
        )}
        {filter && (
          <DataDiv>
            {DataGraphic}
            <br />
            {emptyFilterContent}
          </DataDiv>
        )}
        {children &&
          children.map((cell: any, i: number) => (
            <ContentDiv
              flex={cell.flex ? cell.flex : "1"}
              center={cell.center}
              width={cell.width ? cell.width : "100px"}
              key={i}
            >
              {cell.text}
            </ContentDiv>
          ))}
      </RowDiv>
    );
  }
);
