/**
 * A program type
 */
export type ProgramType = "ACQUISITION" | "LOYALTY" | "RETENTION";

export type RSJsonNode = any;

/**
 * Defined in core under ProgramTriggerQuery.graphql
 */
export type User = BaseUserFields & {
  rewards: {
    totalCount: number;
    data: UserReward[];
  };
  referrals: {
    totalCount: number;
  };
  referredByReferral?: Referral;
};

export type ProgramGoal = {
  goalId: string;
  programId?: string;
  count: number;
  firstDate: number;
  lastDate: number;
};

export type BaseUserFields = {
  id: string;
  accountId: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  email?: string;
  cookieId?: string;
  locale?: string;
  countryCode?: string;
  localization: {
    locale?: string;
    language?: {
      languageCode: string;
    };
    country?: {
      countryCode: string;
    };
  };
  referable?: boolean;
  firstSeenIP?: string;
  lastSeenIP?: string;
  firstSeenGeoData?: any;
  lastSeenGeoData?: any;
  dateCreated?: number;
  dateBlocked?: number;
  customFields?: Record<string, any>;
  segments: string[];
  fraudFlags: {
    type: string;
    message: string;
  }[];
  programGoals: ProgramGoal[];
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
  convertedTotalAmountPostDiscount?: number | null;
  convertedCurrency?: string;
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
