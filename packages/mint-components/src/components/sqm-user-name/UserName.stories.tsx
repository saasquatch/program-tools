import { html } from "lit";

export default {
  title: "Tests/User Name",
};

export const DemoData = () => {
  return html`
    <sqm-user-name
      .demoData=${{
        loading: false,
        loadingText: "...",
        username: "Test Testerson",
      }}
    ></sqm-user-name>
  `;
};

export const Username = () => {
  return html`<sqm-user-name></sqm-user-name>`;
};
