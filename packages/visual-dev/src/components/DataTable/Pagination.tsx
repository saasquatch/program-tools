import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { IconKey, Icon } from "../Icon"
import { Dropdown } from "../Dropdown"

type PopoverProps = OptionProps & StyleProps & React.ComponentProps<"div"> & Omit<React.ComponentProps<"div">, "translate">

interface OptionProps {
  children?: any
  selected?: number
  pages?: any
  total?: number
}

interface StyleProps {
  css?: CSSProp
}

const PaginationDiv = styled.div<Required<StyleProps>>`
  display: flex;
  padding: 20px;
  align-items: center;
  background: #f9f9f9;
  border: 2px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 0px 0px 6px 6px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  ${(props) => props.css}
`

const TextDiv = styled.div<{ selected?: boolean }>`
  padding: 6px;
  display: inline;
  color: #0088cc;
  cursor: pointer;
  font-family: Helvetica;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  ${(props) => (props.selected ? "font-weight: bold;" : "font-weight: normal;")}
`

export const Pagination = React.forwardRef<React.ElementRef<"div">, PopoverProps>((props, forwardedRef) => {
  const { children, selected = 1, pages = [1], total = 0, css = {}, ...rest } = props

  return (
    <PaginationDiv {...rest} ref={forwardedRef} css={css}>
      1-10 of {total}
      <div style={{ marginLeft: "auto" }}>
        <Icon size="24px" icon="chevron_left" css="margin: -3px;" />
        {pages.map((x: any) => (
          <TextDiv selected={selected === x}>{x}</TextDiv>
        ))}
        <Icon size="24px" icon="chevron_right" css="margin: -3px; margin-right: 24px;" />
        <Dropdown pill center text="10 per page" css="min-width: 165px; width: 165px; display: inline-block" />
      </div>
    </PaginationDiv>
  )
})
