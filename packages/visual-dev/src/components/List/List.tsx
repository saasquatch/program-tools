import * as React from "react";
import * as Styles from "./Styles";
import styled, { CSSProp } from "styled-components";

const ItemView = styled.li``;

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

const ListView: React.FC<ListProps> = ({
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

const ListNamespace = Object.assign(ListView, { ItemView: ItemView });

/**
 * @deprecated use {@link ListView} instead
 */
const ListNamespaceDeprecated = Object.assign(ListView, { Item: ItemView });

export { ListNamespace as ListView };

/**
 * @deprecated use {@link ListView} instead
 */
export { ListNamespaceDeprecated as List };
