import { html } from "lit";

export default {
  title: "Components/Text",
};

export const PurpleText = () => {
  return html`
    <sqm-text text-color="slateblue">
      <p>This is the text component</p>
    </sqm-text>
  `;
};

export const CustomFontSize = () => {
  return html`
    <sqm-text font-size="36">
      <p>This is the text component</p>
    </sqm-text>
  `;
};
