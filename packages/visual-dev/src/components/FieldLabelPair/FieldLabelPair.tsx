import React from "react";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";
import styled, { CSSProp } from "styled-components";

export type FieldLabelPairViewProps = OptionProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Is shown
   */
  isVisible?: boolean;
  /**
   * If the contained field is disabled or not.
   */
  isDisabled?: boolean;
  /**
   * If the contained field is read only or not.
   */
  isReadOnly?: boolean;
  /**
   * The primary label for the field outside of the field containing element.
   */
  mainLabel?: React.ReactNode | string;
  /**
   * A label that will appear above the field, but inside the field container.
   */
  topFieldLabel?: string;
  /**
   * A label that will appear to the left of the field inside of the field container.
   */
  leftFieldLabel?: string;
  /**
   * A label that will appear to the right of the field inside of the field container.
   */
  rightFieldLabel?: string;
  /**
   * A tooltip that will appear next to the main label.
   */
  labelTooltip?: string;
  /**
   * A tooltip that will appear to the right of the field inside of the field container.
   */
  fieldTooltip?: string;
  /**
   * A required marker that will show next to the main label.
   */
  isRequired?: boolean;
  /**
   * If the element has children or not.
   */
  isParent?: boolean;
  /**
   * If there is another child field below
   */
  isChildDisplayBelow: boolean;
  /**
   * If the element has a parent or not.
   */
  isChild: boolean;
  /**
   * An array of errors to display below the field.
   */
  errors?: Array<string>;
  /**
   * Custom container CSS
   */
  customContainerCSS?: CSSProp;
  /**
   * User instruction for filling the field
   */
  instructions?: React.ReactNode | string;
  /**
   * Field slot
   */
  children?: React.ReactNode;
}

const IUIFieldLabelPair = wrapWc("uicl-field-label-pair");

const StyleDiv = styled.div<{ customContainerCSS: CSSProp }>`
  ${(props) => props.customContainerCSS}
`;

export const FieldLabelPairView = (props: FieldLabelPairViewProps) => {
  const {
    mainLabel,
    isVisible = true,
    isDisabled,
    isReadOnly,
    topFieldLabel,
    leftFieldLabel,
    rightFieldLabel,
    // labelTooltip,
    // fieldTooltip,
    isRequired,
    isParent,
    isChild,
    isChildDisplayBelow,
    customContainerCSS = {},
    errors = null,
    instructions,
    children,
    className = "",
  } = props;

  const computedClasses = `${isChild ? "child" : ""} ${
    isParent || (isChildDisplayBelow ? "parent" : "")
  } ${errors && !errors.length ? "error" : ""} ${
    isDisabled ? "disabled" : ""
  } ${className}`;

  return (
    <StyleDiv customContainerCSS={customContainerCSS}>
      <IUIFieldLabelPair
        errors={errors}
        isVisible={wcBoolean(isVisible)}
        isDisabled={wcBoolean(isDisabled)}
        isReadOnly={wcBoolean(isReadOnly)}
        isRequired={wcBoolean(isRequired)}
        isParent={wcBoolean(isParent)}
        isChild={wcBoolean(isChild)}
        isChildDisplayBelow={wcBoolean(isChildDisplayBelow)}
        topFieldLabel={topFieldLabel}
        leftFieldLabel={leftFieldLabel}
        rightFieldLabel={rightFieldLabel}
        //TODO: Fix once poppable works in uicl
        // labelTooltip={labelTooltip}
        // fieldTooltip={fieldTooltip}
        className={computedClasses}
        mainLabel={mainLabel ? "true" : null}
      >
        <span slot="instructions">{instructions}</span>
        <span slot="mainLabel">{mainLabel}</span>
        {children}
      </IUIFieldLabelPair>
    </StyleDiv>
  );
};
