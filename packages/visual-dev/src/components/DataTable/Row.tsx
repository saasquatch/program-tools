import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { DataGraphic } from "../Graphics";
import * as Styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "customCSS">;

interface OptionProps {
  content?: any;
  empty?: boolean;
  emptyFilter?: boolean;
  children?: any;
  emptyContent?: string | React.ReactNode;
  emptyFilterContent?: string | React.ReactNode;
}

interface StyleProps {
  variant?: "row" | "header" | "banner" | "extra";
  customCSS?: CSSProp;
}

const RowDiv = styled.div<Required<StyleProps>>`
  ${Styles.RowBase}

  ${(props) => Styles.Row[props.variant]}

  ${(props) => props.customCSS}
`;

const ContentDiv = styled.div<{ flex: string; center: boolean; width: string }>`
  display: inline-block;
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
      content,
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
        {content &&
          content.map((x: any, i: number) => (
            <ContentDiv
              flex={x.flex ? x.flex : "1"}
              center={x.center}
              width={x.width ? x.width : "100px"}
              key={i}
            >
              {x.text}
            </ContentDiv>
          ))}
        {children}
      </RowDiv>
    );
  }
);
