import styled from "styled-components";

interface TypographyProps {
  color?: string;
}

export const H1 = styled.h1<TypographyProps>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: ${(props) => props.color || `var(--sq-text)`};
  font-size: 21px;
  line-height: 21px;
  margin-bottom: var(--sq-spacing-small);
  font-weight: (--sq-font-weight-semibold);
`;

type MarginBottom = "8px";

interface H2Props {
  marginBottom?: MarginBottom;
}

export const H2 = styled.h2<H2Props>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: ${(props) => props.color || `var(--sq-text)`};
  font-size: 16px;
  line-height: 16px;
  margin-bottom: ${(props) => props.marginBottom || `16px`};
  font-weight: (--sq-font-weight-semibold);
`;

export const BoldH2 = styled(H2)`
  font-weight: var(--sq-font-weight-bold);
`;

type Display = "inline";

interface H3Props {
  display?: Display;
  noMargin?: boolean;
}

export const H3 = styled.h3<H3Props>`
  display: ${(props) => props.display || `inherit`};
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: ${(props) => props.color || `var(--sq-text)`};
  line-height: 13px;
  font-weight: (--sq-font-weight-semibold);
  font-size: 13px;
  margin-bottom: ${(props) => props.noMargin ? '0' : `var(--sq-spacing-x-small)`};
  ${(props) => props.noMargin && 'margin: 0'};
`;

export const P = styled.p<{ bold?: boolean, noMargin?: boolean }>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 13px;
  color: ${(props) => props.color || `var(--sq-text)`};
  ${({ bold }) => bold && `font-weight: (--sq-font-weight-bold);`};
  ${({ noMargin }) => noMargin && `margin: 0;`};
`;

export const NumberedStep = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: var(--sq-text);
  border: 1px solid var(--sq-border);
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  margin-right: var(--sq-spacing-small);
  width: 18px;
  height: 18px;
  line-height: 17px;
`;

export const AttributeHeading = styled.h3`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: var(--sq-text-subdued);
  font-weight: var(--sq-font-weight-regular)
  font-size: var(--sq-font-size-small);
  line-height: 14px;
  margin: 0px;
  padding: 0px;
`

export const WidgetTitle = styled.h2`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: var(--sq-text);
  font-weight: (--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: 16px;
  margin: 0;
  padding: 0;
`

export const ErrorBlock = styled(P)<{margin?: string}>`
  color: var(--sq-on-surface-critical);
  margin: ${(props) => props.margin || `0`};
`