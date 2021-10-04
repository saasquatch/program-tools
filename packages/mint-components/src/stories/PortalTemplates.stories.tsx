import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";
import portalTemplate from "../templates/Portal.html";
import multiProgramTemplate from "../templates/MultiProgramPortal.html";
import dashboardTemplate from "../templates/Dashboard.html";
import editProfileTemplate from "../templates/EditProfile.html";
import activityTemplate from "../templates/Activity.html";
import resetPasswordEmailTemplate from "../templates/ResetPasswordEmail.html";
import verifyEmailTemplate from "../templates/VerifyEmail.html";
import loginTemplate from "../templates/Login.html";
import registerTemplate from "../templates/Register.html";
import forgotPasswordTemplate from "../templates/ForgotPassword.html";
import resetPasswordTemplate from "../templates/ResetPassword.html";
import emailVerifiedTemplate from "../templates/EmailVerified.html";
import emailVerificationTemplate from "../templates/EmailVerification.html";
import { navigation } from "@saasquatch/component-boilerplate";
export default {
  title: "Templates / Portal",
};

// slot="footer"
// support-email="john@foodservicerewards.com"
// terms-link="example.com"
// faq-link="example.com"
// padding="large"
// show-powered-by="false"
// powered-by-link="https://www.saasquatch.com/"

function useTemplate(templateString: string) {
  const [editedTemplate, setEditedTemplate] = useState(templateString);
  const [previewTemplate, setPreviewTemplate] = useState(templateString);
  return {
    states: { previewTemplate, editedTemplate },
    callbacks: { setEditedTemplate, setPreviewTemplate },
  };
}

function TemplateView(props) {
  const { states, callbacks } = props;
  return [
    <textarea
      style={{ width: "100%", height: "300px" }}
      onChange={(e: Event) =>
        callbacks.setEditedTemplate((e.target as HTMLInputElement).value)
      }
    >
      {states.editedTemplate}
    </textarea>,
    <button onClick={() => callbacks.setPreviewTemplate(states.editedTemplate)}>
      Update Preview
    </button>,
    <div innerHTML={states.previewTemplate}></div>,
  ];
}

function DefaultTemplateView(props) {
  const { states, callbacks } = props;
  return (
    <div>
      <textarea
        style={{ width: "100%", height: "300px" }}
        onChange={(e: Event) =>
          callbacks.setEditedTemplate((e.target as HTMLInputElement).value)
        }
      >
        {states.editedTemplate}
      </textarea>
      <button
        onClick={() => callbacks.setPreviewTemplate(states.editedTemplate)}
      >
        Update Preview
      </button>
      <h2>Navigation</h2>
      <button onClick={() => navigation.push("/")}>Dashboard</button>
      <button onClick={() => navigation.push("/activity")}>Activity</button>
      <button onClick={() => navigation.push("/editProfile")}>
        Edit Profile
      </button>
      <button onClick={() => navigation.push("/login")}>Login</button>
      <button onClick={() => navigation.push("/register")}>Register</button>
      <button onClick={() => navigation.push("/emailVerification")}>
        Email Verification
      </button>
      <button onClick={() => navigation.push("/verifyEmail")}>
        Verify Email
      </button>
      <button onClick={() => navigation.push("/forgotPassword")}>
        Forgot Password
      </button>
      <button onClick={() => navigation.push("/resetPassword")}>
        Reset Password
      </button>
      <br />
      <div innerHTML={states.previewTemplate}></div>
    </div>
  );
}

export const DefaultPortal = createHookStory(() => {
  const { states, callbacks } = useTemplate(portalTemplate);
  return <DefaultTemplateView states={states} callbacks={callbacks} />;
});

export const MultiProgramPortal = createHookStory(() => {
  const { states, callbacks } = useTemplate(multiProgramTemplate);
  return <DefaultTemplateView states={states} callbacks={callbacks} />;
});

export const Login = createHookStory(() => {
  const { states, callbacks } = useTemplate(loginTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const ForgotPassword = createHookStory(() => {
  const { states, callbacks } = useTemplate(forgotPasswordTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const Register = createHookStory(() => {
  const { states, callbacks } = useTemplate(registerTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const Dashboard = createHookStory(() => {
  const { states, callbacks } = useTemplate(dashboardTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const Activity = createHookStory(() => {
  const { states, callbacks } = useTemplate(activityTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const EditProfile = createHookStory(() => {
  const { states, callbacks } = useTemplate(editProfileTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const ResetPassword = createHookStory(() => {
  const { states, callbacks } = useTemplate(resetPasswordTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const EmailVerification = createHookStory(() => {
  const { states, callbacks } = useTemplate(emailVerificationTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const EmailVerified = createHookStory(() => {
  const { states, callbacks } = useTemplate(emailVerifiedTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

// function useGraphQL() {
//   window.widgetIdent = {
//     tenantAlias: "test_agvu4yg8zrkxt",
//     appDomain: "https://app.referralsaasquatch.com",
//     userId: "rfcdhX2WTcgyJUB061TxE1xwXvj1",
//     accountId: "rfcdhX2WTcgyJUB061TxE1xwXvj1",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InJmY2RoWDJXVGNneUpVQjA2MVR4RTF4d1h2ajEiLCJpZCI6InJmY2RoWDJXVGNneUpVQjA2MVR4RTF4d1h2ajEifX0.lGUEN_cmRrSdw-y2fEz-BQ2R5COoN8tQTiKJGEMfCcI",
//     programId: "Vacay-referral",
//     engagementMedium: "EMBED",
//   };
// }

export const ProgramSwitch = createHookStory(() => {
  // useGraphQL();
  const [template, setTemplate] = useState("");
  return (
    <div>
      <button
        onClick={() =>
          setTemplate(`
            <sqb-program-section program-id="Vacay-referral">
              <sqm-program-menu>
                <sl-menu-item value="Vacay-referral">
                  Vacay-referral
                </sl-menu-item>
                <sl-menu-item value="vacay-affiliates">
                  vacay-affiliates
                </sl-menu-item>
              </sqm-program-menu>
              <sqb-program-switch>
                <template program-id="Vacay-referral">
                  <sqb-widget widget-type="p/Vacay-referral/w/referrerWidget"></sqb-widget>
                </template>
                <template program-id="vacay-affiliates">
                  <sqb-widget widget-type="p/vacay-affiliates/w/referrerWidget"></sqb-widget>
                </template>
              </sqb-program-switch>
            </sqb-program-section>`)
        }
      >
        Load Widget
      </button>
      <div innerHTML={template}></div>
    </div>
  );
});

export const ResetPasswordEmail = createHookStory(() => {
  const { states, callbacks } = useTemplate(resetPasswordEmailTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const VerifyEmail = createHookStory(() => {
  const { states, callbacks } = useTemplate(verifyEmailTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});
