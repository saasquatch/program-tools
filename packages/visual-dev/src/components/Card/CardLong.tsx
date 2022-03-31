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

const CardDiv = styled.div<Required<StyleProps>>`
  ${Styles.CardLongDiv}
  ${(props) => props.customCSS}
`;
const CardHeaderDiv = styled.div`
  ${Styles.CardLongHeaderDiv}
`;
const CardTextDiv = styled.div`
  ${Styles.CardLongTextDiv}
`;
const CardFooterDiv = styled.div`
  ${Styles.CardLongFooterDiv}
`;

export const CardLongView = React.forwardRef<
  React.ElementRef<"div">,
  CardProps
>((props, forwardedRef) => {
  const { title, footer, children, customCSS = {}, ...rest } = props;

  return (
    <CardDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      <CardHeaderDiv>{title}</CardHeaderDiv>
      <CardTextDiv>{children}</CardTextDiv>
      <CardFooterDiv>{footer}</CardFooterDiv>
    </CardDiv>
  );
});

/**
 * @deprecated use {@link ButtonView} instead
 */
export const CardLong = CardLongView;
