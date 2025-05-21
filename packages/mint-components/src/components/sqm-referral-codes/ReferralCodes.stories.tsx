import { h } from "@stencil/core";
import scenario from "./ReferralCodes.feature";

export default {
  title: "Components/Referral Codes",
  parameters: {
    scenario,
  },
};

const demoData = {
  titleText: "Start sharing",
  emptyStateHeaderText: "Your new codes and links aren’t ready yet",
  emptyStateDescriptionText:
    "Please contact our program support team to let them know you’re out of codes.",
  emptyStateImageUrl:
    "https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png",
  states: {
    noCodes: false,
    loading: false,
  },
};

const pagination = (slot) => {
  return <sqm-pagination slot={slot}></sqm-pagination>;
};

const shareButtons = (slot) => {
  return (
    <sqm-portal-container gap="small" slot={slot}>
      <sqm-share-button medium="email">Share via email</sqm-share-button>
      <sqm-share-button medium="facebook">Share on Facebook</sqm-share-button>
      <sqm-share-button medium="whatsapp">Share on WhatsApp</sqm-share-button>
    </sqm-portal-container>
  );
};

const shareCodes = (slot) => {
  return <sqm-referral-code slot={slot}></sqm-referral-code>;
};

const shareCodeWithPreviouslyCopied = (slot) => {
  return (
    <sqm-referral-code
      slot={slot}
      showNotificationText={true}
      notificationText="You’ve copied this before."
    ></sqm-referral-code>
  );
};

export const ReferralCodes = () => {
  return (
    <sqm-referral-codes>
      {pagination("pagination")}
      {shareCodes("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};

export const WithPreviouslyCopiedCode = () => {
  return (
    <sqm-referral-codes>
      {pagination("pagination")}
      {shareCodeWithPreviouslyCopied("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};

export const Empty = () => {
  return (
    <sqm-referral-codes
      demoData={{ states: { ...demoData.states, noCodes: true } }}
    >
      {pagination("pagination")}
      {shareCodes("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};

export const EmptyWithCustomTextAndImage = () => {
  return (
    <sqm-referral-codes
      emptyStateHeaderText="Tus nuevos códigos y enlaces aún no están listos"
      emptyStateDescriptionText="Comuníquese con nuestro equipo de soporte del programa para informarles que no tiene códigos."
      emptyStateImageUrl="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1738890457~exp=1738894057~hmac=2f0f32c1f0fc051f47d772a4517e2e4c4f38af5069fb855edc96d8331d9d1329&w=826"
      demoData={{
        states: { ...demoData.states, noCodes: true },
      }}
    >
      {pagination("pagination")}
      {shareCodes("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};

export const Loading = () => {
  return (
    <sqm-referral-codes
      demoData={{ states: { ...demoData.states, loading: true } }}
    >
      {pagination("pagination")}
      {shareCodes("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};
