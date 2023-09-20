import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { css, CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, IconView } from "../Icon";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

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
  title?: string ;
  /**
   * Description in the card below the title
   */
  description?: string ;
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


const RadioLabel = styled.label<{customCSS: CSSProp}>`
  ${Styles.RadioLabelStyle}
  ${(props) => props.customCSS}
`;
const RadioInput = styled.input<{ disabled: boolean }>`
  ${Styles.RadioInputStyle}
  ${(props) => props.disabled && "border-color: unset;"}
`;


const RadioGridDiv = styled.div`
  ${Styles.RadioGridStyle}
`;


const UICLRadioCard = wrapWc("uicl-card-radio-button")

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


    return (
      <RadioLabel
        htmlFor={rest.id}
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
        <UICLRadioCard isDisabled={wcBoolean(disabled)} optionDescription={description} optionName={title} checked={wcBoolean(selected)}>
          {icon ? <IconView icon={icon} size="40px" slot="icon" /> : <span slot="icon"/>}
        </UICLRadioCard>
        {/* {icon && (
          <LeftSegmentDiv isChecked={selected}>
            
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
        </RightSegmentDiv> */}
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
