import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";
import portalTemplate from "../templates/Portal.html";
import portalLeadSubmitTemplate from "../templates/PortalLeadSubmit.html";
import taxAndCashTemplate from "../templates/TaxAndCash.html";
import portalLeadSubmitTemplateWithDashboard from "../templates/PortalLeadSubmitWithDashboard.html";
import portalTemplateWithDashboard from "../templates/PortalWithDashboard.html";
import multiProgramTemplate from "../templates/MultiProgramPortal.html";
import multiProgramTemplateWithDashboard from "../templates/MultiProgramPortalWithDashboard.html";
import dashboardTemplate from "../templates/Dashboard.html";
import leadSubmitTemplate from "../templates/LeadSubmit.html";
import editProfileTemplate from "../templates/EditProfile.html";
import activityTemplate from "../templates/Activity.html";
import resetPasswordEmailTemplate from "../templates/ResetPasswordEmail.html";
import verifyEmailTemplate from "../templates/VerifyEmail.html";
import taxPayoutReminderEmailTemplate from "../templates/TaxPayoutReminderEmail.html";
import loginTemplate from "../templates/Login.html";
import registerTemplate from "../templates/Register.html";
import forgotPasswordTemplate from "../templates/ForgotPassword.html";
import resetPasswordTemplate from "../templates/ResetPassword.html";
import emailVerifiedTemplate from "../templates/EmailVerified.html";
import emailVerificationTemplate from "../templates/EmailVerification.html";

import LoginReadme from "../components/sqm-portal-login/readme.md";
import ReferralIframeReadme from "../components/sqm-referral-iframe/readme.md";
import ForgotPasswordReadme from "../components/sqm-portal-forgot-password/readme.md";
import RegisterReadme from "../components/sqm-portal-register/readme.md";
import EditProfileReadme from "../components/sqm-portal-profile/readme.md";
import ResetPasswordReadme from "../components/sqm-portal-reset-password/readme.md";
import EmailVerificationReadme from "../components/sqm-portal-email-verification/readme.md";
import EmailVerifiedReadme from "../components/sqm-portal-verify-email/readme.md";

import { DefaultTemplateView } from "../utils/DefaultTemplateView";
import { TemplateView } from "../utils/TemplateView";

export default {
  title: "Templates / Microsite",
};

function useTemplate(templateString: string) {
  const [editedTemplate, setEditedTemplate] = useState(templateString);
  const [previewTemplate, setPreviewTemplate] = useState(templateString);
  return {
    states: { previewTemplate, editedTemplate },
    callbacks: { setEditedTemplate, setPreviewTemplate },
  };
}

export const DefaultMicrosite = createHookStory(() => {
  const { states, callbacks } = useTemplate(portalTemplate);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={portalTemplateWithDashboard}
    />
  );
});

export const MultiProgramMicrosite = createHookStory(() => {
  const { states, callbacks } = useTemplate(multiProgramTemplate);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={multiProgramTemplateWithDashboard}
    />
  );
});

export const LeadSubmitMicrosite = createHookStory(() => {
  const { states, callbacks } = useTemplate(portalLeadSubmitTemplate);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={portalLeadSubmitTemplateWithDashboard}
      leadSubmit={true}
    />
  );
});

export const TaxAndCash = createHookStory(() => {
  const { states, callbacks } = useTemplate(taxAndCashTemplate);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={taxAndCashTemplate}
    />
  );
});

export const Login = createHookStory(() => {
  const { states, callbacks } = useTemplate(loginTemplate);
  return (
    <TemplateView states={states} callbacks={callbacks} readme={LoginReadme} />
  );
});

export const ForgotPassword = createHookStory(() => {
  const { states, callbacks } = useTemplate(forgotPasswordTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={ForgotPasswordReadme}
    />
  );
});

export const Register = createHookStory(() => {
  const { states, callbacks } = useTemplate(registerTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={RegisterReadme}
    />
  );
});

export const Dashboard = createHookStory(() => {
  const { states, callbacks } = useTemplate(dashboardTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const LeadSubmitIframe = createHookStory(() => {
  const { states, callbacks } = useTemplate(leadSubmitTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={ReferralIframeReadme}
    />
  );
});

export const Activity = createHookStory(() => {
  const { states, callbacks } = useTemplate(activityTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const EditProfile = createHookStory(() => {
  const { states, callbacks } = useTemplate(editProfileTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={EditProfileReadme}
    />
  );
});

export const ResetPassword = createHookStory(() => {
  const { states, callbacks } = useTemplate(resetPasswordTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={ResetPasswordReadme}
    />
  );
});

export const EmailVerification = createHookStory(() => {
  const { states, callbacks } = useTemplate(emailVerificationTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={EmailVerificationReadme}
    />
  );
});

export const EmailVerified = createHookStory(() => {
  const { states, callbacks } = useTemplate(emailVerifiedTemplate);
  return (
    <TemplateView
      states={states}
      callbacks={callbacks}
      readme={EmailVerifiedReadme}
    />
  );
});

export const Widget = createHookStory(() => {
  return (
    <sqb-widget
      widget-type="p/Vacay-referral/w/referrerWidget"
      demoData={{
        data: {
          html: dashboardTemplate,
        },
      }}
    ></sqb-widget>
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

export const taxPayoutReminderEmail = createHookStory(() => {
  const { states, callbacks } = useTemplate(taxPayoutReminderEmailTemplate);
  return <TemplateView states={states} callbacks={callbacks} />;
});
