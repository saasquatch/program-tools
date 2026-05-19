import { h } from "@stencil/core";
import scenario from "./user-attribute.feature";

export default {
  title: "Components/User Attribute",
  parameters: {
    scenario,
  },
};

export const Default = () => {
  return (
    <sqm-user-attribute
      demoData={{
        loading: false,
        value: "impact.com",
      }}
    ></sqm-user-attribute>
  );
};

export const Loading = () => {
  return (
    <sqm-user-attribute
      demoData={{
        loading: true,
        value: "impact.com",
      }}
    ></sqm-user-attribute>
  );
};

export const WithCustomStyles = () => {
  return (
    <sqm-user-attribute
      demoData={{
        loading: false,
        value: "impact.com",
        fontSize: 24,
        color: "#4CAF50",
        fontWeight: 700,
      }}
    ></sqm-user-attribute>
  );
};
