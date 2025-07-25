import { h } from "@stencil/core";

export default {
  title: "Components/Text",
};

export const PurpleText = () => {
  return (
    <sqm-text textColor="slateblue">
      <p>This is the text component</p>
    </sqm-text>
  );
};

export const CustomFontSize = () => {
  return (
    <sqm-text fontSize={36}>
      <p>This is the text component</p>
    </sqm-text>
  );
};
