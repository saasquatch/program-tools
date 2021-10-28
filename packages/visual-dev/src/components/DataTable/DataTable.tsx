import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { Icon } from "../Icon"
import { Dropdown } from "../Dropdown"
import { Pagination, Row } from "."

type DataTableProps = OptionProps & StyleProps & React.ComponentProps<"div"> & Omit<React.ComponentProps<"div">, "translate">

interface OptionProps {
  children?: any
  empty?: boolean
  search?: boolean
}

interface StyleProps {
  width?: string
  css?: CSSProp
}

const DataTableDiv = styled.div<Required<StyleProps>>`
  width: ${(props) => props.width};
  div + div {
    margin-top: -2px;
  }
  ${(props) => props.css}
`

const Menus = styled.div`
  div + div {
    margin-left: 10px;
  }
  margin-bottom: 20px;
`

export const DataTable = React.forwardRef<React.ElementRef<"div">, DataTableProps>((props, forwardedRef) => {
  const { width = "100%", empty = false, search = false, children, css = {}, ...rest } = props

  return (
    <>
      <Menus>
        <Dropdown text="All Forms" css="min-width: 112px;" />
        <Dropdown text="Any Status" css="min-width: 116px;" />
        <Dropdown text="30 Days" icon="calendar" css="min-width: 142px;" />
      </Menus>
      <DataTableDiv width={width} {...rest} ref={forwardedRef} css={css}>
        {children}
      </DataTableDiv>
    </>
  )
})
