import { h } from "@stencil/core";
import scenario from "./sqm-image.feature";

export default {
  title: "Components/Image",
  parameters: {
    scenario,
  },
};

export const Image = () => {
  return (
    <sqm-image image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png" />
  );
};

export const ImageAlignmentLeft = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png"
      alignment="left"
    />
  );
};

export const ImageAlignmentCenter = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png"
      alignment="center"
    />
  );
};

export const ImageAlignmentRight = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png"
      alignment="right"
    />
  );
};

export const ImageBackground = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png"
      background-color="firebrick"
      alignment="center"
    />
  );
};

export const MinimumHeight = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000255/squatch-assets/oIiVdMM.jpg"
      minHeight="192px"
    />
  );
};
