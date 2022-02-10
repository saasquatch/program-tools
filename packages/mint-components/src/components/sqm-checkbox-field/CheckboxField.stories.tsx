import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../sqm-portal-register/sqm-portal-register-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
export default {
  title: "Checkbox Field",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

const defaultProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};

export const TermsAndConditions = createHookStory(() => (
  <PortalRegisterView
    {...defaultProps}
    //@ts-ignore
    content={{
      ...defaultProps.content,
      terms: (
        <p>
          <sqm-checkbox-field></sqm-checkbox-field>
        </p>
      ),
    }}
  />
));

export const TermsAndConditionsCustomLabel = createHookStory(() => (
  <PortalRegisterView
    {...defaultProps}
    //@ts-ignore
    content={{
      ...defaultProps.content,
      terms: (
        <p>
          By signing up you agree to the{" "}
          <a href="https://example.com" target="_blank">
            Terms and Conditions
          </a>
          <sqm-checkbox-field>
            <p>I Agree</p>
          </sqm-checkbox-field>
        </p>
      ),
    }}
  />
));

export const TermsAndConditionsHook = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="terms">
        <sqm-checkbox-field></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});

export const TermsAndConditionsLabelSlot = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="terms">
        <sqm-checkbox-field>
          <p>I Agree to the terms and conditions</p>
        </sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});
