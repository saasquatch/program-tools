import { h } from "@stencil/core";

export default {
  title: "Components/Widget Verification",
};

export const Step1Email = () => (
  <sqm-widget-verification
    stateController={JSON.stringify({
      "sqm-widget-verification": { showCode: false },
    })}
  ></sqm-widget-verification>
);

export const Step2Code = () => (
  <sqm-widget-verification
    stateController={JSON.stringify({
      "sqm-widget-verification": { showCode: true },
    })}
  ></sqm-widget-verification>
);

export const Step3PartnerModal = () => (
  <sqm-widget-verification
    stateController={JSON.stringify({
      "sqm-widget-verification": { showPartnerModal: true },
    })}
  ></sqm-widget-verification>
);

export const Loading = () => (
  <sqm-widget-verification
    stateController={JSON.stringify({
      "sqm-widget-verification": { loading: true },
    })}
  ></sqm-widget-verification>
);
