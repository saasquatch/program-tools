import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type SliderProps = OptionProps & Partial<React.ComponentProps<"input">>;

type SliderWidthType = boolean | string;

export interface OptionProps {
  /**
   * Value of the slider
   */
  value?: any;
  /**
   * Callback triggered when the slider changes
   */
  onChange?: any;
  /**
   * Disable the slider
   */
  disabled?: boolean;
  /**
   * Button to display inside the slider field
   */
  buttons?: React.ReactElement;
  /**
   * Custon CSS applied to slider
   */
  customCSS?: CSSProp;
  /**
   * Limit the slider width using a valid CSS size value (e.g. px, %) [default 300px]
   */
  limitWidth?: SliderWidthType;
}
const StyledSlider = styled.input<{
  customCSS?: CSSProp;
}>`
  ${Styles.SliderStyle}
  ${(props) => props.customCSS}
`;

export const SliderView = React.forwardRef<
  React.ElementRef<"input">,
  SliderProps
>((props, forwardedRef) => {
  const {
    customCSS = {},
    limitWidth = false,
    required = false,
    ...rest
  } = props;
  return (
    <StyledSlider
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
      type="range"
    />
  );
});
