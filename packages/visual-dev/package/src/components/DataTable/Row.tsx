import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type RowViewProps = OptionProps &
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

export interface CellProps {
  /**
   * Cell content
   */
  text: string | React.ReactNode;
  /**
   * Width of the cell as a valid CSS size (px, em, rem)
   */
  width?: string;
  /**
   * Flex basis value of the cell
   */
  flex?: number;
  /**
   * Centers the cell content in the cell
   */
  center?: boolean;
}

export interface StyleProps {
  /**
   * Row variant [default "row"]
   */
  variant?: "row" | "header" | "extra";
  /**
   * Custom CSS applied to row
   */
  customCSS?: CSSProp;
}

export const RowDiv = styled.div<Required<StyleProps>>`
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

export const RowView = React.forwardRef<React.ElementRef<"div">, RowViewProps>(
  (props, forwardedRef) => {
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
        <div className="actions-container">{actionsSlot && actionsSlot}</div>
      </RowDiv>
    );
  }
);

/**
 * @deprecated use {@link RowView} instead
 */
export const Row = RowView;
