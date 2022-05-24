import styled from "styled-components";

interface TypographyProps {
  color?: string;
}

export const H1 = styled.h1<TypographyProps>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: ${(props) => props.color || `#575757`};
  font-size: 21px;
  line-height: 21px;
  margin-bottom: 13px;
  font-weight: 600;
`;

type MarginBottom = "8px";

interface H2Props {
  marginBottom?: MarginBottom;
}

export const H2 = styled.h2<H2Props>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: ${(props) => props.color || `#575757`};
  font-size: 16px;
  line-height: 16px;
  margin-bottom: ${(props) => props.marginBottom || `16px`};
  font-weight: 600;
`;

export const BoldH2 = styled(H2)`
  font-weight: 700;
`;

type Display = "inline";

interface H3Props {
  display?: Display;
  noMargin?: boolean;
}

export const H3 = styled.h3<H3Props>`
  display: ${(props) => props.display || `inherit`};
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: ${(props) => props.color || `#575757`};
  line-height: 13px;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: ${(props) => props.noMargin ? '0' : `8px`};
  ${(props) => props.noMargin && 'margin: 0'};
`;

export const P = styled.p<{ bold?: boolean, noMargin?: boolean }>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 13px;
  color: ${(props) => props.color || `#575757`};
  ${({ bold }) => bold && `font-weight: bold;`};
  ${({ noMargin }) => noMargin && `margin: 0px;`};
`;

export const NumberedStep = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #575757;
  border: 1px solid #dddddd;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  margin-right: 10px;
  width: 18px;
  height: 18px;
  line-height: 17px;
`;

export const AttributeHeading = styled.h3`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #808080;
  font-weight: normal
  font-size: 12px;
  line-height: 14px;
  margin: 0px;
  padding: 0px;
`

export const WidgetTitle = styled.h2`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #575757;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  margin: 0px;
  padding: 0px;
`

export const ErrorBlock = styled(P)<{margin?: string}>`
  color: #f92929;
  margin: ${(props) => props.margin || `0px`};
`