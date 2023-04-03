import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

export type ProgressBarProps = OptionProps &
  Partial<React.ComponentProps<"ol">>;

export interface OptionProps {
  /**
   * Name of each step in the progress bar
   */
  steps: string[];
  /**
   * Used to indicate which step is focused
   */
  currentStep: number;
  /**
   * Color of each progress bar step
   */
  barColor?: string;
  /**
   * TODO: This prop currently doesn't do anything, need to make it work in the future.
   * Order style shown above each progress bar step
   */
  // orderStyle?:
  //   | "number"
  //   | "uppercase_letter"
  //   | "lowercase_letter"
  //   | "uppercase_roman_numerals"
  //   | "lowercase_roman_numerals";
  /**
   * Custom CSS applied to slider
   */
  customCSS?: CSSProp;
}
const StyledOl = styled.ol<{
  customCSS?: CSSProp;
}>`
  ${Styles.ListStyle}
  ${(props) => props.customCSS}
`;

const StyledBarDiv = styled.div<{
  active: boolean;
  completed: boolean;
  barColor?: string;
}>`
  ${Styles.BarStyle}

  border: 2px solid ${(props) =>
    props.completed || props.active ? props.barColor : "var(--sq-border)"};
  ${(props) => props.active && "opacity: 0.5;"}
`;

export const ProgressBarView = React.forwardRef<
  React.ElementRef<"ol">,
  ProgressBarProps
>((props, forwardedRef) => {
  const {
    customCSS = {},
    currentStep,
    steps,
    barColor = "var(--sq-border-success)",
    ...rest
  } = props;
  return (
    <StyledOl {...rest} ref={forwardedRef} customCSS={customCSS}>
      {steps.map((step: string, idx: number) => (
        <div key={step} className="item-wrapper">
          <StyledBarDiv
            barColor={barColor}
            active={idx === currentStep}
            completed={currentStep > idx}
          />
          <li style={{ fontWeight: idx === currentStep ? "bold" : "normal" }}>
            {step}
          </li>
        </div>
      ))}
    </StyledOl>
  );
});
