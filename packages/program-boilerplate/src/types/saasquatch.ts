export type ProgramType = 'ACQUISITION' | 'LOYALTY' | 'RETENTION';

export type Referral = {
  id: string;
};

export type User = {
  id: string;
  accountId: string;
  referredByReferral: Referral;
};

