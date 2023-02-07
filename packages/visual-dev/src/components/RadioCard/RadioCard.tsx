import * as React from "react";
import root from "react-shadow/styled-components";
import styled, { CSSProp } from "styled-components";
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
  title?: string;
  /**
   * Description in the card below the title
   */
  description?: string;
  /**
   * Icon displayed in the left side section of the card
   */
  icon?: IconKey;
  /**
   * Custom CSS applied to Radio Card
   */
  customCSS?: CSSProp;
}

const ShadowDom = styled(root.div)`
  display: contents;
`;

const RadioLabel = styled.label<{ isChecked: boolean; css?: any }>`
  ${Styles.RadioLabelStyle}
  ${(props) =>
    props.isChecked
      ? "border: 2px solid var(--sq-action-primary-hovered);"
      : "&:hover {border: 2px solid var(--sq-text-subdued);}"}
      
  ${(props) => props.css && props.css}
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

const RadioCardView = React.forwardRef<React.ElementRef<"input">, InputProps>(
  (props, forwardedRef) => {
    const {
      value,
      optionValue,
      title,
      description,
      icon = "",
      css,
      ...rest
    } = props;

    const selected = value === optionValue;

    const icon_color = selected ? "var(--sq-action-primary-hovered)" : "";

    return (
      <RadioLabel htmlFor={rest.id} isChecked={selected} css={css}>
        <RadioInput
          {...rest}
          type="radio"
          checked={selected}
          readOnly
          ref={forwardedRef}
        />
        <LeftSegmentDiv isChecked={selected}>
          {icon && <IconView icon={icon} size="40px" color={icon_color} />}
        </LeftSegmentDiv>
        <RightSegmentDiv>
          <RadioTextDiv>
            {title ? (
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>{title}</div>
            ) : (
              ""
            )}
            {description ? (
              <div style={{ color: "var(--sq-text-subdued)" }}>
                {description}
              </div>
            ) : (
              ""
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
