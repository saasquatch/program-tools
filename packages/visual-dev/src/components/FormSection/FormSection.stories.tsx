import React from "react";
import { FormSectionView, FormSectionViewProps } from "./FormSection";

export default {
  title: "Components / Form Section",
  component: FormSectionView,
};

const defaultProps: FormSectionViewProps = {};

export const Default = () => {
  return <FormSectionView {...defaultProps} />;
};
