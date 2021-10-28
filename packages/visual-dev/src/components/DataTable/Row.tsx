import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { IconKey, Icon } from "../Icon"

type PopoverProps = OptionProps & StyleProps & React.ComponentProps<"div"> & Omit<React.ComponentProps<"div">, "translate">

interface OptionProps {
  content?: any
  empty?: boolean
  filter?: boolean
  children?: any
}

interface StyleProps {
  variant?: "row" | "header" | "banner" | "extra"
  css?: CSSProp
}

const RowDiv = styled.div<Required<StyleProps>>`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  color: #232323;

  ${(props) =>
    props.variant == "row" &&
    `
    background: #FFFFFF;
    border: 2px solid #E2E2E2;
    box-sizing: border-box;
  `}

  ${(props) =>
    props.variant == "header" &&
    `
    font-weight: bold;
    background: #F9F9F9;
    border: 2px solid #E2E2E2;
    box-sizing: border-box;
    border-radius: 6px 6px 0px 0px;
  `}

  ${(props) =>
    props.variant == "banner" &&
    `
    padding: 0;
    // margin: 20px;
    color: white;
    height: 74px;
    background: #003b45;
    border: 2px solid #003b45;
    box-sizing: border-box;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

  `}

  ${(props) =>
    props.variant == "extra" &&
    `
    background: #f9f9f9;
    border: 2px solid #E2E2E2;
    box-sizing: border-box;

  `}

  ${(props) => props.css}
`

const ContentDiv = styled.div<{ flex: string; center: boolean; width: string }>`
  display: inline-block;
  ${(props) => (props.center ? "text-align: center;" : "")}
  flex-grow: ${(props) => props.flex};
  width: ${(props) => props.width};
`

const DataDiv = styled.div`
  width: 100%;
  text-align: center;
`
export const Row = React.forwardRef<React.ElementRef<"div">, PopoverProps>((props, forwardedRef) => {
  const { content, empty = false, filter = false, variant = "row", children, css = {}, ...rest } = props

  return (
    <RowDiv variant={variant} {...rest} ref={forwardedRef} css={css}>
      {empty && (
        <DataDiv>
          {dataSVG}
          <br />
          No submission found
        </DataDiv>
      )}
      {filter && (
        <DataDiv>
          {dataSVG}
          <br />
          No submissions that meet your
          <br />
          filter criteria
        </DataDiv>
      )}
      {content &&
        content.map((x: any) => (
          <ContentDiv flex={x.flex ? x.flex : "1"} center={x.center} width={x.width ? x.width : "100px"}>
            {x.text}
          </ContentDiv>
        ))}
      {children}
      {variant == "banner" && (
        <div>
          <span style={{ padding: 20 }}>Filter Rewards by Program</span>
          <span style={{ background: "white", width: 2, height: "90px", marginTop: -45, display: "inline-flex", position: "absolute" }}>.</span>
          <span style={{ marginLeft: 20 }}>5 rewards earned across all programs</span>
        </div>
      )}
    </RowDiv>
  )
})

const dataSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="126" height="91" fill="none" viewBox="0 0 126 91">
    <path fill="url(#pattern0)" d="M0 0H126V91H0z"></path>
    <defs>
      <pattern id="pattern0" width="1" height="1" patternContentUnits="objectBoundingBox">
        <use transform="matrix(.00401 0 0 .00556 -.002 0)" xlinkHref="#image0_120:653"></use>
      </pattern>
      <image
        id="image0_120:653"
        width="250"
        height="180"
        xlinkHref="data:image/png;base64,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"></image>
    </defs>
  </svg>
)
