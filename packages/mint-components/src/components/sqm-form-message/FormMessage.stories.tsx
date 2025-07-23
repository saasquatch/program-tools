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
