import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type RadioGenericProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"input">, "translate" | "value" | "css">;

export interface RadioOption {
  value: any;
  view: React.ComponentType; // TODO switch to using component type and stop injecting props with clone https://flow.org/en/docs/react/types/#toc-react-componenttype
}

export interface OptionProps {
  /**
   * Value for form input
   */
  activeValue?: any;
  /**
   * Callback triggered on radio select/deselect
   */
  onChange?: any;

  name: string;

  radioOptions: Array<RadioOption>;
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

const StyledRadioInput = styled.input``;

const ContainerDiv = styled.div<Required<StyleProps>>`
  ${Styles.ContainerDiv}
`;

export const RadioGenericView = React.forwardRef<
  React.ElementRef<"div">,
  RadioGenericProps
>((props, forwardRef) => {
  const {
    name,
    activeValue,
    onChange,
    customCSS = {},
    radioOptions,
    ...rest
  } = props;
  return (
    <ShadowDom>
      <ContainerDiv {...rest} ref={forwardRef} customCSS={customCSS}>
        {radioOptions &&
          radioOptions.map((radioOption: any) => (
            <>
              <StyledRadioInput
                type="radio"
                id={radioOption.value.toLowerCase()}
                name={activeValue}
                value={radioOption.value}
              />
              {React.cloneElement(radioOption.view, {
                activeValue: activeValue,
                htmlFor: radioOption.value.toLowerCase(),
                onClick: () => onChange(radioOption.value),
              })}
            </>
          ))}
      </ContainerDiv>
    </ShadowDom>
  );
});
