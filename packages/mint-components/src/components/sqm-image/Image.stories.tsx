import { h } from "@stencil/core";
import scenario from "./sqm-image.feature";

export default {
  title: "Components/Image",
  parameters: {
    scenario,
  },
};

export const Image = () => {
  return <sqm-image image-url="https://i.imgur.com/tn47wOj.png" />;
};

export const ImageAlignmentLeft = () => {
  return (
    <sqm-image image-url="https://i.imgur.com/tn47wOj.png" alignment="left" />
  );
};

export const ImageAlignmentCenter = () => {
  return (
    <sqm-image image-url="https://i.imgur.com/tn47wOj.png" alignment="center" />
  );
};

export const ImageAlignmentRight = () => {
  return (
    <sqm-image image-url="https://i.imgur.com/tn47wOj.png" alignment="right" />
  );
};

export const ImageMarginLeft = () => {
  return (
    <sqm-image
      image-url="https://i.imgur.com/tn47wOj.png"
      left="100px"
      alignment="center"
    />
  );
};

export const ImageMarginRight = () => {
  return (
    <sqm-image
      image-url="https://i.imgur.com/tn47wOj.png"
      right="100px"
      alignment="center"
    />
  );
};

export const ImageBackground = () => {
  return (
    <sqm-image
      image-url="https://i.imgur.com/tn47wOj.png"
      background-color="firebrick"
      alignment="center"
    />
  );
};

export const ImageSizeConstrained = () => {
  return (
    <sqm-image
      image-url="https://i.imgur.com/oIiVdMM.jpg"
      minHeight="192px"
      maxWidth="192px"
    />
  );
};
