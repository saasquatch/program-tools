import { FraudStatus } from "../../saasquatch";

export type ReferralStatus =
  | "DENIED"
  | "PENDING_REVIEW"
  | "RETRACTED"
  | "CONVERTED"
  | "IN_PROGRESS";

type ReferralStatusInput = {
  dateConverted?: number | null;
  dateConversionRetracted?: number | null;
  fraudData?: { moderationStatus?: FraudStatus };
};

export function getReferralStatus(
  referral: ReferralStatusInput,
): ReferralStatus {
  const fraudStatus = referral?.fraudData?.moderationStatus;

  if (fraudStatus === "DENIED") return "DENIED";
  if (fraudStatus === "PENDING") return "PENDING_REVIEW";
  // A retraction leaves dateConverted set, so it has to be checked before CONVERTED
  if (referral?.dateConversionRetracted) return "RETRACTED";
  if (referral?.dateConverted) return "CONVERTED";

  return "IN_PROGRESS";
}
