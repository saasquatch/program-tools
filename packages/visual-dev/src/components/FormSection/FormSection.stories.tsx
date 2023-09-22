import React from "react";
import { FormSectionView, FormSectionViewProps } from "./FormSection";
import { FieldLabelPairDefault } from "../FieldLabelPair/FieldLabelPair.stories";

export default {
  title: "Components / Form Section",
  component: FormSectionView,
};

const defaultProps: FormSectionViewProps = {
  labelTooltip: "labelTooltip",
  isAdvanced: false,
  isSubformSection: false,
  isAdvancedShown: true,
  isVisible: true,
  advancedSettingsLabel: "advancedSettingsLabel",
  heading: "heading",
  description: "description",
  isDisplayColumn: false,
  isOptional: false,
  optionalLabel: "optionalLabel",
};

export const Default = () => {
  return (
    <FormSectionView {...defaultProps}>
      <div>Form Section Slot</div>
    </FormSectionView>
  );
};

export const WithFieldLabelPair = () => {
  return (
    <FormSectionView {...{ ...defaultProps, isDisplayColumn: true }}>
      <FieldLabelPairDefault />
    </FormSectionView>
  );
};
