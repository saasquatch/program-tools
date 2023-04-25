import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { css, CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, IconView } from "../Icon";

type GroupProps = React.ComponentProps<"input">;

type InputProps = OptionProps &
  Partial<Omit<React.ComponentProps<"input">, "value">>;
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
   * Icon displayed to the right of the title
   */
  titleIconSlot?: React.ReactNode;
  /**
   * Custom CSS applied to Radio Card
   */
  customCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

interface RadioLabelProps {
  isChecked: boolean;
  customCSS: CSSProp;
  disabled: boolean;
}

const RadioLabel = styled.label<RadioLabelProps>`
  ${Styles.RadioLabelStyle}
  ${(props) => props.customCSS && props.customCSS}
  ${(props) =>
    props.isChecked &&
    "border-color: var(--sq-action-primary-hovered); & * {border-color: var(--sq-action-primary-hovered);}"}

${(props) =>
    !props.isChecked &&
    !props.disabled &&
    "&:hover {border-color: var(--sq-text-subdued);}; &:hover * {border-color: var(--sq-text-subdued);}"}

    ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      background-color: var(--sq-border);
      & * {
        color: var(--sq-text-subdued);
      }
    `}
${(props) => props.customCSS}
`;
const RadioInput = styled.input<{ disabled: boolean }>`
  ${Styles.RadioInputStyle}
  ${(props) => props.disabled && "border-color: unset;"}
`;

const RightSegmentDiv = styled.div`
  ${Styles.RightSegmentStyle}
`;

const RadioTextDiv = styled.div`
  ${Styles.RadioTextStyle}
`;

const LeftSegmentDiv = styled.div<{ isChecked: boolean; disabled: boolean }>`
  ${Styles.LeftSegmentStyle}
  ${(props) =>
    props.isChecked &&
    !props.disabled &&
    "color: var(--sq-action-primary-hovered);"}
`;

const RadioGridDiv = styled.div`
  ${Styles.RadioGridStyle}
`;

const TitleContainerDiv = styled.div`
  ${Styles.TitleContainerStyle}
`;

const TitleP = styled.p`
  ${Styles.TitleStyle}
`;

const RadioCardView = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (props, forwardedRef) => {
    const {
      value,
      optionValue,
      title,
      description,
      icon = "",
      titleIconSlot,
      customCSS = {},
      disabled = false,
      ...rest
    } = props;

    const selected = value === optionValue;

    const icon_color = selected ? "var(--sq-action-primary-hovered)" : "";

    return (
      <RadioLabel
        disabled={disabled}
        htmlFor={rest.id}
        isChecked={selected}
        customCSS={customCSS}
      >
        <RadioInput
          {...rest}
          type="radio"
          checked={selected}
          disabled={disabled}
          readOnly
          ref={forwardedRef}
        />
        {icon && (
          <LeftSegmentDiv isChecked={selected} disabled={disabled}>
            <IconView icon={icon} size="40px" color={icon_color} />
          </LeftSegmentDiv>
        )}
        <RightSegmentDiv>
          <RadioTextDiv>
            {title && (
              <TitleContainerDiv>
                <TitleP>{title}</TitleP>
                {titleIconSlot && titleIconSlot}
              </TitleContainerDiv>
            )}
            {description && (
              <div style={{ color: "inherit" }}>{description}</div>
            )}
          </RadioTextDiv>
        </RightSegmentDiv>
      </RadioLabel>
    );
  }
);

export const RadioCardGroupView = (props: GroupProps) => {
  const { children } = props;

  return (
    <ShadowDom>
      <RadioGridDiv>{children}</RadioGridDiv>
    </ShadowDom>
  );
};

/**
 * @deprecated use {@link RadioGroupView} instead
 */
export const RadioCardGroup = RadioCardGroupView;

const RadioCardNamespace = Object.assign(RadioCardView, {
  GroupView: RadioCardGroupView,
});

/**
 * @deprecated use {@link RadioCardView} instead
 */
const RadioCardNamespaceDeprecated = Object.assign(RadioCardView, {
  Group: RadioCardGroupView,
});

export { RadioCardNamespace as RadioCardView };

/**
 * @deprecated use {@link RadioCardView} instead
 */
export { RadioCardNamespaceDeprecated as RadioCard };
