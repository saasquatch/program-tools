/**
 * A program type
 */
export type ProgramType = "ACQUISITION" | "LOYALTY" | "RETENTION";

export type RSJsonNode = any;

/**
 * Defined in core under ProgramTriggerQuery.graphql
 */
export type User = {
  id: string;
  accountId: string;
  firstName?: string;
  lastName?: string;
  referredByReferral?: Referral;
  programGoals: {
    goalId: string;
    programId?: string;
    count: number;
    firstDate: number;
    lastDate: number;
  }[];

  [key: string]: any;
};

/**
 * Defined in core under ProgramTriggerQuery.graphql
 */
export type UserEvent = {
  key: string;
  id: string;
  fields: RSJsonNode;
  isModification: boolean;
  dateTriggered?: number;
  dateReceived?: number;
  dateProcessed?: number;
};

/**
 * Defined in core under ProgramTriggerQuery.graphql
 */
export type UserReward = {
  id: string;
  dateGiven?: number;
  dateExpires?: number;
  dateCancelled?: number;
  programId?: string;
  programRewardKey?: string;
  referralId?: string;
};

/**
 * Defined in core under ProgramTriggerQuery.graphql
 */
export type FraudFlag =
  | "IP"
  | "EMAIL"
  | "NAME"
  | "RATE"
  | "DAILY_REFERRAL_REWARD_LIMIT"
  | "TEMP_EMAIL"
  | "BLOCKED_USER"
  | "BLOCKED_IP";

/**
 * Defined in core under ProgramTriggerQuery.graphql
 */
export type Referral = {
  id: string;
  moderationStatus?: "PENDING" | "ACTIONED";
  referrerModerationStatus?: "PENDING" | "APPROVED" | "DENIED";
  referredModerationStatus?: "PENDING" | "APPROVED" | "DENIED";
  dateReferralStarted?: number;
  dateFraudChecksCompleted?: number;
  dateConverted?: number;
  fraudSignals?: any;
  fraudFlags: {
    type: FraudFlag;
    message: string;
  }[];
  isFraudExempt: boolean;
  referrerUser: User & {
    rewards: {
      totalCount: number;
      data: UserReward[];
    };
  };
  rewards: UserReward[];
};
