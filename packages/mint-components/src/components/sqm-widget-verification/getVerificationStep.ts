export type VerificationViewer = {
  emailVerified?: boolean;
  managedIdentity?: { emailVerified?: boolean } | null;
  impactConnection?: { connected?: boolean } | null;
  cashRewards?: { totalCount: number } | null;
};

export type VerificationStep = "verify" | "partner" | "content";

// Partner creation is only forced once a cash reward is owed; otherwise tax-and-cash step 1 lets them opt in
export function getVerificationStep(
  viewer: VerificationViewer | undefined
): VerificationStep {
  if (viewer?.impactConnection?.connected) return "content";
  const emailVerified =
    viewer?.emailVerified || viewer?.managedIdentity?.emailVerified;
  if (!emailVerified) return "verify";
  return viewer?.cashRewards?.totalCount > 0 ? "partner" : "content";
}

// Unknown reward state still prompts; the partner form shows its own retryable error
export function getStepAfterVerification(
  viewer: VerificationViewer | undefined
): "partner" | "content" {
  if (!viewer) return "partner";
  return getVerificationStep({ ...viewer, emailVerified: true }) === "partner"
    ? "partner"
    : "content";
}
