import * as React from 'react';
import * as Styles from './Styles'
import styled from 'styled-components'

const Item = styled.li``

export interface ListProps {
  type?: "bullet" | "number"
  children?: React.ReactNode;
}

const StyledList = styled.ul`
  ${Styles.ListStyles}
`

export const List: React.FC<ListProps> & { Item: typeof Item } = (
  { children, type = 'bullet' }
) => {
  const ListElement = type == "bullet" ? "ul" : "ol"
  return (
    <StyledList as={ListElement}>
      {children}
    </StyledList>
  )
}

List.Item = Item
