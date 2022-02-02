import { h } from "@stencil/core";
import scenario from "./sqm-image.feature";

export default {
  title: "Components/Image",
  parameters: {
    scenario,
  },
};

export const Image = () => {
  return <sqm-image image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png" />;
};

export const ImageAlignmentLeft = () => {
  return (
    <sqm-image image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png" alignment="left" />
  );
};

export const ImageAlignmentCenter = () => {
  return (
    <sqm-image image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png" alignment="center" />
  );
};

export const ImageAlignmentRight = () => {
  return (
    <sqm-image image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png" alignment="right" />
  );
};

export const ImageMarginLeft = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png"
      left="100px"
      alignment="center"
    />
  );
};

export const ImageMarginRight = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png"
      right="100px"
      alignment="center"
    />
  );
};

export const ImageBackground = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829007/tenant_test_a7iws76wkk4az/oxghbkf3aazwqz3xusry.png"
      background-color="firebrick"
      alignment="center"
    />
  );
};

export const ImageSizeConstrained = () => {
  return (
    <sqm-image
      image-url="https://res.cloudinary.com/saasquatch-staging/image/upload/v1643829038/tenant_test_a7iws76wkk4az/fpqigwukfrsp12mc7kur.jpg"
      minHeight="192px"
      maxWidth="192px"
    />
  );
};
