import React from "react";
import { FieldLabelPairView, FieldLabelPairViewProps } from "./FieldLabelPair";

export default {
  title: "Components / Field Label Pair",
  component: FieldLabelPairView,
};

const defaultProps: FieldLabelPairViewProps = {
  isVisible: true,
  isDisabled: false,
  isReadOnly: false,
  mainLabel: "Main label",
  topFieldLabel: "Top field label",
  leftFieldLabel: "Left field label",
  rightFieldLabel: "Right field label",
  labelTooltip: "Label Tooltip",
  fieldTooltip: "Field Tooltip",
  isRequired: false,
  isParent: true,
  isChildDisplayBelow: true,
  isChild: true,
  errors: [],
  instructions: "instructions",
};

export const FieldLabelPairDefault = () => {
  return <FieldLabelPairView {...defaultProps}></FieldLabelPairView>;
};
FieldLabelPairDefault.storyName = "Default";
