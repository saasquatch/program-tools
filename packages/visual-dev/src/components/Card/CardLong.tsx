import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type CardProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  /**
   * Title displayed at the top of the card right of the icon
   */
  title: string;
  /**
   * Content displayed in the footer of the card
   */
  footer: string | React.ReactNode;
  /**
   * Content displayed between the title and footer in the card
   */
  children: any;
}

interface StyleProps {
  /**
   * Custom CSS applied to the card container
   */
  customCSS?: CSSProp;
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.cardLong}
  ${(props) => props.customCSS}
`;
const CardHeader = styled.div`
  ${Styles.cardLongHeader}
`;
const CardText = styled.div`
  ${Styles.cardLongText}
`;
const CardFooter = styled.div`
  ${Styles.cardLongFooter}
`;

export const CardLong = React.forwardRef<React.ElementRef<"div">, CardProps>(
  (props, forwardedRef) => {
    const { title, footer, children, customCSS = {}, ...rest } = props;

    return (
      <CardStyle {...rest} ref={forwardedRef} customCSS={customCSS}>
        <CardHeader>{title}</CardHeader>
        <CardText>{children}</CardText>
        <CardFooter>{footer}</CardFooter>
      </CardStyle>
    );
  }
);
