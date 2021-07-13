import { h } from "@stencil/core";

export default {
  title: "Form Message",
};

export const FullStackSuccess = () => {
  return (
    <sqm-form-message type="success" exportparts="successalert-icon">
      <div class="AlertContent">
        <div part="successalert-text">Title</div>
        <div part="successalert-subtext">Body text.</div>
        <sl-button
          type="default"
          exportparts="base: defaultbutton-base"
          onClick={() => {
            console.log("click");
          }}
        >
          Primary Action
        </sl-button>
        <sl-button
          class="SecondaryTextButton"
          type="text"
          onClick={() => {
            console.log("click");
          }}
        >
          Secondary Action
        </sl-button>
      </div>
    </sqm-form-message>
  );
};
