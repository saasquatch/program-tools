import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type RadioGenericProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"input">, "value" | "css">;

export interface RadioOption {
  value: any;
  view: React.ReactNode;
}

export interface OptionProps {
  /**
   * Value for form input
   */
  value?: any;
  /**
   * Callback triggered on radio select/deselect
   */
  onChange?: any;

  options: Array<RadioOption>;
}

export interface StyleProps {
  /**
   * Custom CSS applied to radio
   */
  customCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const ContainerDiv = styled.div<Required<StyleProps>>`
  ${Styles.ContainerDiv}
`;

export const RadioGenericView = React.forwardRef<
  React.ElementRef<"div">,
  RadioGenericProps
>((props, forwardRef) => {
  const { value, onChange, customCSS = {}, options, ...rest } = props;
  return (
    <ShadowDom>
      <ContainerDiv
        ref={forwardRef}
        customCSS={customCSS}
        htmlFor={rest.id}
      ></ContainerDiv>
    </ShadowDom>
  );
});
