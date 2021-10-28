import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type CardProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate">;

interface OptionProps {
  title: string;
  footer: any;
  children: any;
}

interface StyleProps {
  css?: CSSProp;
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.cardLong}
  ${(props) => props.css}
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
    const { title, footer, children, css = {}, ...rest } = props;

    return (
      <CardStyle {...rest} ref={forwardedRef} css={css}>
        <CardHeader>{title}</CardHeader>
        <CardText>{children}</CardText>
        <CardFooter>{footer}</CardFooter>
      </CardStyle>
    );
  }
);
