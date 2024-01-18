import { h } from "@stencil/core";

export default {
  title: "Tests/User Name",
};

export const DemoData = () => {
  return (
    <sqm-user-name
      demoData={{
        loading: false,
        loadingText: "...",
        username: "Test Testerson",
      }}
    ></sqm-user-name>
  );
};

export const Username = () => {
  return <sqm-user-name></sqm-user-name>;
};
