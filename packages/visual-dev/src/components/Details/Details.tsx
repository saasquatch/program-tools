import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

export type DetailsProps = OptionProps & Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * setter function to change open state
   */
  setOpen: any;
  /**
   * boolean prop used to hide and show children
   */
  open: boolean;
  /**
   * Text shown next to icon
   */
  summary: string | React.ReactNode;
  /**
   * Icon slot
   */
  iconSlot: React.ReactNode;
  /**
   * Custom CSS applied to slider
   */
  customCSS?: CSSProp;
}

const StyledDiv = styled.div<{
  customCSS?: CSSProp;
  open?: boolean;
}>`
  ${Styles.DivStyle}
  ${(props) => props.customCSS}
`;

const SummaryContainerDiv = styled.div`
  ${Styles.SummaryContainerDivStyle}
`;

const StyledP = styled.p`
  ${Styles.ParagraphStyle}
`;

export const DetailsView = React.forwardRef<
  React.ElementRef<"div">,
  DetailsProps
>((props, forwardedRef) => {
  const {
    customCSS = {},
    summary,
    iconSlot,
    children,
    open,
    setOpen,
    ...rest
  } = props;
  return (
    <StyledDiv {...rest} open={open} ref={forwardedRef} customCSS={customCSS}>
      {open && children}
      <SummaryContainerDiv onClick={setOpen}>
        {iconSlot}
        {typeof summary === "string" ? <StyledP>{summary}</StyledP> : summary}
      </SummaryContainerDiv>
    </StyledDiv>
  );
});
