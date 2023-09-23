import React from "react";
import { FieldLabelPairView, FieldLabelPairViewProps } from "./FieldLabelPair";
import { FunctionalInput } from "../Input/Input.stories";

export default {
  tags: ["autodocs"],
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
  isParent: false,
  isChildDisplayBelow: true,
  isChild: true,
  errors: [],
  instructions: "instructions",
};

export const FieldLabelPairDefault = () => {
  return (
    <FieldLabelPairView {...defaultProps}>
      <FunctionalInput />
    </FieldLabelPairView>
  );
};
FieldLabelPairDefault.storyName = "Default";

export const MainLabelOnly = () => {
  return (
    <FieldLabelPairView
      {...{
        ...defaultProps,
        topFieldLabel: undefined,
        leftFieldLabel: undefined,
        rightFieldLabel: undefined,
        instructions: undefined,
      }}
    >
      <FunctionalInput />
    </FieldLabelPairView>
  );
};
