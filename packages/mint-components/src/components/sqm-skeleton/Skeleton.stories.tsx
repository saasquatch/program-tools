import { h } from "@stencil/core";

export default {
  title: "Components/Skeleton",
};

export const Default = () => {
  return <sqm-skeleton></sqm-skeleton>;
};

export const CustomWidth = () => {
  return <sqm-skeleton width="100px"></sqm-skeleton>;
};

export const CustomHeight = () => {
  return <sqm-skeleton height="100px"></sqm-skeleton>;
};

export const CustomWidthAndHeight = () => {
  return <sqm-skeleton width="150px" height="50px"></sqm-skeleton>;
};
