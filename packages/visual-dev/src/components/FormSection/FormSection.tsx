import React from "react";
import { wrapWc } from "../../wc-react";
import { wcBoolean } from "../../utlis";
import styled from "styled-components";

export type FormSectionViewProps = OptionProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
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

const UICLFormSection = styled(wrapWc("uicl-form-section"))`
  display: block;
`;

export const FormSectionView = (props: FormSectionViewProps) => {
  const {
    isAdvanced,
    isSubformSection,
    isAdvancedShown,
    isVisible = true,
    isDisplayColumn,
    isOptional,
    optionalLabel,
    heading,
    description,
    advancedSettingsLabel,
    // labelTooltip,
    children,
    className = "",
  } = props;

  const computedClasses = `${!heading && "no-heading"} ${
    isAdvanced && "advanced"
  } ${isSubformSection && "subFormSection"} ${
    isDisplayColumn && "display-column"
  } ${className}`;

  return (
    <UICLFormSection
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
      // label-tooltip={labelTooltip}
      className={computedClasses}
      style={{ width: "100%" }}
    >
      {children}
    </UICLFormSection>
  );
};
