import React from "react";
import { FieldLabelPairView, FieldLabelPairViewProps } from "./FieldLabelPair";

export default {
  title: "Components / Field Label Pair",
  component: FieldLabelPairView,
};

const defaultProps: FieldLabelPairViewProps = {};

export const Default = () => {
  return <FieldLabelPairView {...defaultProps} />;
};
