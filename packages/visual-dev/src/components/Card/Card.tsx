import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconView } from "../Icon";
import { Button } from "../Button";

type CardProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Title displayed at the top of the card right of the icon
   */
  title: string;
  /**
   * Content displayed in the card below the title/icon
   */
  children: string | React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to the card container
   */
  customCSS?: CSSProp;
}

const CardDiv = styled.div<Required<StyleProps>>`
  ${Styles.CardDiv}
  ${(props) => props.customCSS}
`;
const CardHeaderDiv = styled.div`
  ${Styles.CardHeaderDiv}
`;
const CardHeaderIconDiv = styled.div`
  ${Styles.CardHeaderIconDiv}
`;
const CardHeaderTextDiv = styled.div`
  ${Styles.CardHeaderTextDiv}
`;
const CardTextDiv = styled.div`
  ${Styles.CardTextDiv}
`;
const CardFooterDiv = styled.div`
  ${Styles.CardFooterDiv}
`;

export const CardView = React.forwardRef<React.ElementRef<"div">, CardProps>(
  (props, forwardedRef) => {
    const { title, children, customCSS = {}, ...rest } = props;

    return (
      <CardDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        <CardHeaderDiv>
          <CardHeaderIconDiv>
            <IconView
              icon="calendar"
              size="large"
              customCSS=""
              color="var(--sq-text-subdued)"
            />
          </CardHeaderIconDiv>
          <CardHeaderTextDiv>{title}</CardHeaderTextDiv>
        </CardHeaderDiv>
        <CardTextDiv> {children}</CardTextDiv>
        <CardFooterDiv>
          <Button
            buttonType="secondary"
            size="small"
            pill
            customCSS="width: 124px; margin-right: 8px;"
          >
            Learn More
          </Button>
          <Button
            buttonType="primary"
            size="small"
            pill
            customCSS="width: 124px;"
          >
            Create
          </Button>
        </CardFooterDiv>
      </CardDiv>
    );
  }
);

/**
 * @deprecated use {@link CardView} instead
 */
export const Card = CardView;
