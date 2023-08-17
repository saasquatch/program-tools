import React from "react";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

export interface FieldLabelPairViewProps {
  /**
   * Is shown
   */
  isVisible?: boolean;
  /**
   * If the contained field is disabled or not.
   */
  isDisabled: boolean;
  /**
   * If the contained field is read only or not.
   */
  isReadOnly: boolean;
  /**
   * The primary label for the field outside of the field containing element.
   */
  mainLabel: string;
  /**
   * A label that will appear above the field, but inside the field container.
   */
  topFieldLabel: string;
  /**
   * A label that will appear to the left of the field inside of the field container.
   */
  leftFieldLabel: string;
  /**
   * A label that will appear to the right of the field inside of the field container.
   */
  rightFieldLabel: string;
  /**
   * A tooltip that will appear next to the main label.
   */
  labelTooltip: string;
  /**
   * A tooltip that will appear to the right of the field inside of the field container.
   */
  fieldTooltip: string;
  /**
   * A required marker that will show next to the main label.
   */
  isRequired: boolean;
  /**
   * If the element has children or not.
   */
  isParent: boolean;
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
  errors: Array<string>;
  /**
   * User instruction for filling the field
   */
  instructions: string;
  /**
   * Field slot
   */
  children?: React.ReactNode;
}

const IUIFieldLabelPair = wrapWc("uicl-field-label-pair");

export const FieldLabelPairView = (props: FieldLabelPairViewProps) => {
  const {
    isVisible,
    isDisabled,
    isReadOnly,
    mainLabel,
    topFieldLabel,
    leftFieldLabel,
    rightFieldLabel,
    labelTooltip,
    fieldTooltip,
    isRequired,
    isParent,
    isChild,
    isChildDisplayBelow,
    errors,
    instructions,
    children,
  } = props;
  return (
    <IUIFieldLabelPair
      is-visible={wcBoolean(isVisible)}
      is-disabled={wcBoolean(isDisabled)}
      is-read-only={wcBoolean(isReadOnly)}
      is-required={wcBoolean(isRequired)}
      is-parent={wcBoolean(isParent)}
      is-child={wcBoolean(isChild)}
      is-child-display-below={wcBoolean(isChildDisplayBelow)}
      main-label={mainLabel}
      top-field-label={topFieldLabel}
      left-field-label={leftFieldLabel}
      right-field-label={rightFieldLabel}
      label-tooltip={labelTooltip}
      field-tooltip={fieldTooltip}
      errors={errors}
      instructions={instructions}
    >
      {children}
    </IUIFieldLabelPair>
  );
};
