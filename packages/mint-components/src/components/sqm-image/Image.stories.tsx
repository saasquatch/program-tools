import { h } from "@stencil/core";
import { ImageView } from "./sqm-image-view";

export default {
  title: "Components/Image",
};

export const Image = () => {
  return <sqm-image image-url="https://i.imgur.com/Amf0HWx.png" />;
};

export const ImageAlignLeft = () => {
  return <sqm-image image-url="https://i.imgur.com/Amf0HWx.png" align="left" />;
};

export const ImageAlignCenter = () => {
  return (
    <sqm-image image-url="https://i.imgur.com/Amf0HWx.png" align="center" />
  );
};

export const ImageAlignRight = () => {
  return (
    <sqm-image image-url="https://i.imgur.com/Amf0HWx.png" align="right" />
  );
};

export const ImageMarginLeft = () => {
  return <sqm-image image-url="https://i.imgur.com/Amf0HWx.png" left="100px" />;
};

export const ImageMarginRight = () => {
  return (
    <sqm-image image-url="https://i.imgur.com/Amf0HWx.png" right="100px" />
  );
};

export const ImageBackground = () => {
  return (
    <sqm-image
      image-url="https://i.imgur.com/Amf0HWx.png"
      background-color="firebrick"
    />
  );
};
