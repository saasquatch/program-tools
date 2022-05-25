import * as React from "react";
import { useState } from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

type AccordionProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Title shown shown regardless of expanded/collapsed state. Use ReactNode for custom text styling.
   */
  heading: string | React.ReactNode;
  /**
   * Description below title, hidden while collapsed. Use ReactNode for custom text styling.
   */
  description?: string | React.ReactNode;
  /**
   * Content displayed inside accordion
   */
  children: React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to accordion container
   */
  customCSS?: CSSProp;
}

const AccordionDiv = styled.div<Required<StyleProps>>`
  ${Styles.AccordionDiv}
  ${(props) => props.customCSS}
`;

const HeadDiv = styled.div`
  ${Styles.HeadDiv}
`;

const MainDiv = styled.div`
  ${Styles.MainDiv}
`;

const CollapsibleDiv = styled.div<{ expanded: boolean }>`
  ${Styles.CollapsibleDiv}

  ${(props) =>
    props.expanded &&
    "max-height: 2000px; transition: max-height 1s ease-in-out;"}
`;

const TitleH2 = styled.h2`
  ${Styles.TitleH2}
`;

const DescriptionP = styled.p`
  ${Styles.DescriptionP}
`;

const IconDiv = styled.div<{ expanded: boolean }>`
  ${(props) =>
    props.expanded &&
    "transform: rotate( -180deg ); transition: transform 400ms ease;"}
  ${(props) =>
    !props.expanded &&
    "transform: rotate( 0deg ); transition: transform 400ms ease;"}
`;

export const AccordionView = React.forwardRef<
  React.ElementRef<"div">,
  AccordionProps
>((props, forwardedRef) => {
  const {
    heading: title,
    description = "",
    children,
    customCSS = {},
    ...rest
  } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <AccordionDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      <HeadDiv
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <TitleH2>{title}</TitleH2>
        <IconDiv expanded={expanded}>
          <IconView
            icon="chevron_down"
            color="var(--sq-text-subdued)"
          ></IconView>
        </IconDiv>
      </HeadDiv>
      <CollapsibleDiv expanded={expanded}>
        <DescriptionP>{description}</DescriptionP>
        <MainDiv>{children}</MainDiv>
      </CollapsibleDiv>
    </AccordionDiv>
  );
});

/**
 * @deprecated use {@link AccordionView} instead
 */
export const Accordion = AccordionView;
