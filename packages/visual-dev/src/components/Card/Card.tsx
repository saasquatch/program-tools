import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { Icon } from "../Icon";
import { Button } from "../Button";

type CardProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Card content
   */
  children: string | React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to Card
   */
  customCSS?: CSSProp;
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.card}
  ${(props) => props.customCSS}
`;
const CardHeader = styled.div`
  ${Styles.cardHeader}
`;
const CardHeaderIcon = styled.div`
  ${Styles.cardHeaderIcon}
`;
const CardHeaderText = styled.div`
  ${Styles.cardHeaderText}
`;
const CardText = styled.div`
  ${Styles.cardText}
`;
const CardFooter = styled.div`
  ${Styles.cardFooter}
`;

export const Card = React.forwardRef<React.ElementRef<"div">, CardProps>(
  (props, forwardedRef) => {
    const { title, children, customCSS = {}, ...rest } = props;

    return (
      <CardStyle {...rest} ref={forwardedRef} customCSS={customCSS}>
        <CardHeader>
          <CardHeaderIcon>
            <Icon
              icon="calendar"
              size="large"
              customCSS=""
              color="var(--sq-text-subdued)"
            />
          </CardHeaderIcon>
          <CardHeaderText>{title}</CardHeaderText>
        </CardHeader>
        <CardText> {children}</CardText>
        <CardFooter>
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
        </CardFooter>
      </CardStyle>
    );
  }
);
