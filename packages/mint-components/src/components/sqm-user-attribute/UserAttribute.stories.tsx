import { h } from "@stencil/core";

export default {
  title: "Components/User Attribute",
};

export const DemoData = () => {
  return (
    <sqm-user-attribute
      demoData={{
        loading: false,
        value: "impact.com",
      }}
    ></sqm-user-attribute>
  );
};
