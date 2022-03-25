import * as React from "react";
import * as Styles from "./Styles";
import styled, { CSSProp } from "styled-components";

const Item = styled.li``;

export interface ListProps {
  /**
   * Choose a bullet or numbered list type [default "bullet"]
   */
  type?: "bullet" | "number";
  /**
   * List content, usually List.Item
   */
  children?: React.ReactNode;
  /**
   * Custom CSS applied to the list container
   */
  customCSS?: CSSProp;
}

const StyledList = styled.ul<{ customCSS: CSSProp }>`
  ${Styles.ListStyles}
  ${(props) => props.customCSS}
`;

export const List: React.FC<ListProps> & { Item: typeof Item } = ({
  customCSS = {},
  children,
  type = "bullet",
}) => {
  const ListElement = type == "bullet" ? "ul" : "ol";
  return (
    <StyledList customCSS={customCSS} as={ListElement}>
      {children}
    </StyledList>
  );
};

List.Item = Item;
