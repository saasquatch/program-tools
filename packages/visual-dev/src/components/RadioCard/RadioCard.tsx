import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { css, CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, IconView } from "../Icon";

type GroupProps = React.ComponentProps<"input">;

type InputProps = OptionProps & Partial<React.ComponentProps<"input">>;
export interface OptionProps {
  /**
   * Current value of radio card form group
   */
  value: any;
  /**
   * Form value of radio card
   */
  optionValue: any;
  /**
   * Callback triggered on radio action select/deselect
   */
  onChange?: any;
  /**
   * Main title at the top of the card
   */
  title?: string | React.ReactNode;
  /**
   * Description in the card below the title
   */
  description?: string | React.ReactNode;
  /**
   * Icon displayed in the left side section of the card
   */
  icon?: IconKey;
  /**
   * Custom CSS applied to the card container
   */
  customCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

interface RabelLabelProps {
  isChecked: boolean;
  customCSS: CSSProp;
  disabled: boolean;
}

const RadioLabel = styled.label<RabelLabelProps>`
  ${Styles.RadioLabelStyle}
  ${(props) =>
    props.isChecked && !props.disabled
      ? "border: 2px solid var(--sq-action-primary-hovered);"
      : "&:hover {border: 2px solid var(--sq-text-subdued);}"}

    ${(props) =>
    props.disabled &&
    css`
      background-color: var(--sq-border);
      & * {
        color: var(--sq-text-subdued);
      }
      &:hover {
        border: 2px solid transparent;
      }
    `}
${(props) => props.customCSS}
`;
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`;

const RightSegmentDiv = styled.div`
  ${Styles.RightSegmentStyle}
`;

const RadioTextDiv = styled.div`
  ${Styles.RadioTextStyle}
`;

const LeftSegmentDiv = styled.div<{ isChecked: boolean }>`
  ${Styles.LeftSegmentStyle}
  ${(props) =>
    props.isChecked ? "color: var(--sq-action-primary-hovered);" : ""}
`;

const RadioGridDiv = styled.div`
  ${Styles.RadioGridStyle}
`;

export const RadioCardView = React.forwardRef<
  React.ElementRef<"input">,
  InputProps
>((props, forwardedRef) => {
  const {
    value,
    optionValue,
    title,
    description,
    icon = "",
    customCSS = {},
    disabled = false,
    ...rest
  } = props;

  const selected = value === optionValue;

  const icon_color = selected ? "var(--sq-action-primary-hovered)" : "";

  return (
    <RadioLabel
      customCSS={customCSS}
      htmlFor={rest.id}
      isChecked={selected}
      disabled={disabled}
    >
      <RadioInput
        {...rest}
        disabled={disabled}
        type="radio"
        checked={selected}
        readOnly
        ref={forwardedRef}
      />
      {icon && (
        <LeftSegmentDiv isChecked={selected}>
          <IconView icon={icon} size="40px" color={icon_color} />
        </LeftSegmentDiv>
      )}
      <RightSegmentDiv>
        <RadioTextDiv>
          {title ? (
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>{title}</div>
          ) : (
            ""
          )}
          {description ? <div>{description}</div> : ""}
        </RadioTextDiv>
      </RightSegmentDiv>
    </RadioLabel>
  );
});

export const RadioCardGroupView = (props: GroupProps) => {
  const { children } = props;

  return (
    <ShadowDom>
      <RadioGridDiv>{children}</RadioGridDiv>
    </ShadowDom>
  );
};

/**
 * @deprecated use {@link RadioCardView} instead
 */
export const RadioCard = RadioCardView;

/**
 * @deprecated use {@link RadioGroupView} instead
 */
export const RadioCardGroup = RadioCardGroupView;
