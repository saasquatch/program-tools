import { h } from "@stencil/core";

export default {
  title: "Components/Form Message",
};

export const SuccessAlert = () => {
  return (
    <sqm-form-message type="success">
      <div>This is a success message.</div>
    </sqm-form-message>
  );
};

export const ErrorAlert = () => {
  return (
    <sqm-form-message type="error">
      <div>This is an error message</div>
    </sqm-form-message>
  );
};

export const WarningAlert = () => {
  return (
    <sqm-form-message type="warning">
      <div>This is an error message</div>
    </sqm-form-message>
  );
};

export const InfoAlert = () => {
  return (
    <sqm-form-message type="info">
      <div>This is an info message</div>
    </sqm-form-message>
  );
};

export const FullStackSuccess = () => {
  return (
    <sqm-form-message type="success" exportparts="successalert-icon">
      <div class="AlertContent">
        <div part="successalert-text">Title</div>
        <div part="successalert-subtext">Body text.</div>
        <sl-button
          type="primary"
          exportparts="base: primarybutton-base"
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
