import * as React from "react";
import { useState } from "react";
import styled, { CSSProp } from "styled-components";
import { Icon } from "../Icon";
import * as Styles from "./Styles";

type AccordionProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Accordion section title
   */
  title: string | React.ReactNode;
  /**
   * Accordion section description
   */
  description?: string | React.ReactNode;
  /**
   * Accordion section content
   */
  children: React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to accordion
   */
  customCSS?: CSSProp;
}

const Container = styled.div<Required<StyleProps>>`
  ${Styles.Container}
  ${(props) => props.customCSS}
`;

const Head = styled.div`
  ${Styles.Head}
`;

const Main = styled.div`
  ${Styles.Main}
`;

const CollapseContainer = styled.div<{ expanded: boolean }>`
  ${Styles.CollapseContainer}

  ${(props) =>
    props.expanded &&
    "max-height: 1000px; transition: max-height 1s ease-in-out;"}
`;

const Title = styled.h2`
  ${Styles.Title}
`;

const Description = styled.p`
  ${Styles.Description}
`;

const IconContainer = styled.div<{ expanded: boolean }>`
  ${(props) =>
    props.expanded &&
    "transform: rotate( -180deg ); transition: transform 400ms ease;"}
  ${(props) =>
    !props.expanded &&
    "transform: rotate( 0deg ); transition: transform 400ms ease;"}
`;

export const Accordion = React.forwardRef<
  React.ElementRef<"div">,
  AccordionProps
>((props, forwardedRef) => {
  const { title, description = "", children, customCSS = {}, ...rest } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <Container {...rest} ref={forwardedRef} customCSS={customCSS}>
      <Head
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <Title>{title}</Title>
        <IconContainer expanded={expanded}>
          <Icon icon="chevron_down" color="var(--sq-text-subdued)"></Icon>
        </IconContainer>
      </Head>
      <CollapseContainer expanded={expanded}>
        <Description>{description}</Description>
        <Main>{children}</Main>
      </CollapseContainer>
    </Container>
  );
});
