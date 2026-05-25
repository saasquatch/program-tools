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

/* 
 Verifies that an sqm-user-attribute with no valid value
 collapses completely and does not create extra space
 (e.g. a double gap) in a flex layout.
 */
export const InvalidValue = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "#e0e0e0", padding: "8px" }}>Above</div>
      <sqm-user-attribute
        demoData={{
          loading: false,
          value: null,
        }}
      ></sqm-user-attribute>
      <div style={{ background: "#e0e0e0", padding: "8px" }}>Below</div>
    </div>
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
