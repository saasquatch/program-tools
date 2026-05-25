import { h } from "@stencil/core";

export default {
  title: "Components/Microsite Google Login",
};

const demoProps = {
  states: {
    error: "",
    loading: false,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
    showLoginForm: "manual",
  },
  callbacks: {
    googleSubmit: async () => {
      console.log("google submit");
    },
    submit: async (_event) => {
      console.log("submit");
    },
  },
  content: {
    googleButton: null,
  },
};

export const Default = () => {
  return <sqm-portal-google-login></sqm-portal-google-login>;
};

export const WithError = () => {
  return (
    <sqm-portal-google-login
      demoData={{
        states: { ...demoProps.states, error: "This is an error message" },
      }}
    ></sqm-portal-google-login>
  );
};

export const Loading = () => {
  return (
    <sqm-portal-google-login
      demoData={{
        states: { ...demoProps.states, loading: true },
      }}
    ></sqm-portal-google-login>
  );
};
