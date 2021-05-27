/**
 * A program type
 */
export type ProgramType = "ACQUISITION" | "LOYALTY" | "RETENTION";

/**
 * A referral. This type is not complete and is only
 * used internally by the programs.
 */
export type Referral = {
  id: string;
};

/**
 * A user. This type is not complete and is only
 * used internally by the programs.
 */
export type User = {
  id: string;
  accountId: string;
  referredByReferral: Referral;
};
