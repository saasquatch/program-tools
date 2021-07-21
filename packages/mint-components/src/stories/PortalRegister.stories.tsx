import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../components/sqm-portal-register/sqm-portal-register-view";

export default {
  title: "Portal Register",
};

const defaultProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
  },
  content: {pageLabel:"Register"},
};

const errorProps: PortalRegisterViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    confirmPassword: true,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
  },
  content: {pageLabel:"Register"},
};

const loadingProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: true,
    confirmPassword: true,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
  },
  content: {pageLabel:"Register"},
};

export const Default = () => <PortalRegisterView {...defaultProps} />;

export const RegisterWithError = () => <PortalRegisterView {...errorProps} />;

export const RegisterLoading = () => <PortalRegisterView {...loadingProps} />;
