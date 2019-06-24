/**
 * A program type
 */
export type ProgramType = 'ACQUISITION' | 'LOYALTY' | 'RETENTION';

/**
 * A referral
 */
export type Referral = {
  id: string;
};

/**
 * A user
 */
export type User = {
  id: string;
  accountId: string;
  referredByReferral: Referral;
};

