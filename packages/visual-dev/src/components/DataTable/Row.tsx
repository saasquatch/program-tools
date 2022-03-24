import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "customCSS">;

export interface OptionProps {
  /**
   * Content to display in row, one element per table cell
   */
  children?: any;
}

export interface StyleProps {
  /**
   * Row variant (default to "row")
   */
  variant?: "row" | "header" | "extra";
  /**
   * Custom CSS applied to row
   */
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

export const Row = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
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
