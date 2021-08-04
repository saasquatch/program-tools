import { h } from "@stencil/core";

export default {
  title: "User Name",
};

export const FullStack = () => {
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

export const FullStackDefault = () => {
  return <sqm-user-name></sqm-user-name>;
};
