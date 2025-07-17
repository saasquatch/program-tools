import { h } from "@stencil/core";

export default {
  title: "Components/Form Message",
};

export const SuccessAlert = () => {
  return (
    <sqm-form-message type="success">
      <p part="alert-title">This is the title</p>
      <p part="alert-description">This is the description</p>
    </sqm-form-message>
  );
};

export const ErrorAlert = () => {
  return (
    <sqm-form-message type="error">
      <p part="alert-title">This is the title</p>
      <p part="alert-description">This is the description</p>
    </sqm-form-message>
  );
};

export const WarningAlert = () => {
  return (
    <sqm-form-message type="warning">
      <p part="alert-title">This is the title</p>
      <p part="alert-description">This is the description</p>
    </sqm-form-message>
  );
};

export const InfoAlert = () => {
  return (
    <sqm-form-message type="info">
      <p part="alert-title">This is the title</p>
      <p part="alert-description">This is the description</p>
    </sqm-form-message>
  );
};

export const FullStackSuccess = () => {
  return (
    <sqm-form-message type="success" exportparts="successalert-icon">
      <div class="AlertContent">
        <div part="title">Title</div>
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
