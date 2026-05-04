import { h } from "@stencil/core";

export default {
  title: "Components/User Attribute",
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
        fontsize: "24px",
        color: "#4CAF50",
        fontweight: "bold",
      }}
    ></sqm-user-attribute>
  );
};
