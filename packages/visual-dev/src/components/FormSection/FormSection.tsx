import React from "react";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";

export interface FormSectionViewProps {
  /**
   * Content for the tooltip after the section label
   */
  labelTooltip?: string;
  /**
   * Is this an advanced section
   */
  isAdvanced?: boolean;
  /**
   * Is this a form subsection
   */
  isSubformSection?: boolean;
  /**
   * Is the advanced section shown
   */
  isAdvancedShown?: boolean;
  /**
   * Is the section visible
   */
  isVisible?: boolean;
  /**
   * Label form the advanced section
   */
  advancedSettingsLabel?: string;
  /**
   * Section heading
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Is a dispalyed as a column
   */
  isDisplayColumn?: boolean;
  /**
   * Is an optional section
   */
  isOptional?: boolean;
  /**
   * Label used to indicate an optional section
   */
  optionalLabel?: string;
  /**
   * Form Section content
   */
  children?: React.ReactNode;
}

const IUIFormSection = wrapWc("uicl-form-section");

export const FormSectionView = (props: FormSectionViewProps) => {
  const {
    isAdvanced,
    isSubformSection,
    isAdvancedShown,
    isVisible,
    isDisplayColumn,
    isOptional,
    optionalLabel,
    heading,
    description,
    advancedSettingsLabel,
    labelTooltip,
    children,
  } = props;
  return (
    <IUIFormSection
      is-advanced={wcBoolean(isAdvanced)}
      is-subform-section={wcBoolean(isSubformSection)}
      is-advanced-shown={wcBoolean(isAdvancedShown)}
      is-visible={wcBoolean(isVisible)}
      is-display-column={wcBoolean(isDisplayColumn)}
      is-optional={wcBoolean(isOptional)}
      optional-label={optionalLabel}
      heading={heading}
      description={description}
      advanced-settings-label={advancedSettingsLabel}
      label-tooltip={labelTooltip}
    >
      {children}
    </IUIFormSection>
  );
};
