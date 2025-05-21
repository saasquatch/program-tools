import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../components/sqm-stencilbook/HookStoryAddon";
import referralWidget from "../templates/ReferralWidget.html";
import monoWidget from "../templates/MonoWidget.html";
import promoCodeReferralWidget from "../templates/PromoCodeReferralWidget.html";
import loyaltyWidget from "../templates/LoyaltyWidget.html";
import instantAccessReferrerShareWidget from "../templates/InstantAccessReferrerShareWidget.html";
import instantAccessFriendCouponWidget from "../templates/InstantAccessFriendCouponWidget.html";
import instantAccessReferrerRegistrationWidget from "../templates/InstantAccessReferrerRegistrationWidget.html";
import instantAccessFriendRegistrationWidget from "../templates/InstantAccessFriendRegistrationWidget.html";
import paypalReferralWidget from "../templates/PaypalReferralWidget.html";
import paypalMonoWidget from "../templates/PaypalMonoWidget.html";

import { DefaultTemplateView } from "../utils/DefaultTemplateView";
import { TemplateView } from "../utils/TemplateView";

export default {
  title: "Templates / Widgets",
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

export const ReferralWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(referralWidget);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={referralWidget}
    />
  );
});

export const MonoWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(monoWidget);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={monoWidget}
    />
  );
});

export const Loyalty = createHookStory(() => {
  const { states, callbacks } = useTemplate(loyaltyWidget);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={loyaltyWidget}
    />
  );
});

export const PromoCodeReferralWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(promoCodeReferralWidget);
  return (
    <DefaultTemplateView
      states={states}
      callbacks={callbacks}
      template={referralWidget}
    />
  );
});

export const InstantAccessReferrerShareWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(instantAccessReferrerShareWidget);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const PaypalMonoWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(paypalMonoWidget);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const PaypalReferralWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(paypalReferralWidget);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const InstantAccessFriendCouponWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(instantAccessFriendCouponWidget);
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const InstantAccessReferrerRegistrationWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(
    instantAccessReferrerRegistrationWidget
  );
  return <TemplateView states={states} callbacks={callbacks} />;
});

export const InstantAccessFriendRegistrationWidget = createHookStory(() => {
  const { states, callbacks } = useTemplate(
    instantAccessFriendRegistrationWidget
  );
  return <TemplateView states={states} callbacks={callbacks} />;
});
