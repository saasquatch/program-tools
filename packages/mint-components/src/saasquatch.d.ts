interface Referral {
  id: string;
  dateConverted: number;
  dateReferralStarted: number;
  dateReferralPaid: number;
  dateReferralEnded: number;
  moderationStatus: string;
  referredUser: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    customFields?: {
      Saasquatch_Referral_Status__c: string;
    };
  };
  rewards: Reward[];
}

interface Reward {
  id: string;
  type: string;
  value: number;
  unit: string;
  name: string;
  dateGiven: number;
  dateScheduledFor: number;
  dateExpires: number;
  dateCancelled: number;
  fuelTankCode: string;
  fuelTankType: string;
  currency: string;
  prettyValue: string;
  statuses: string[];
  globalRewardKey?: string;
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: string;
              type: string;
              fuelTankCode: string;
              globalRewardKey?: string;
            }
          ];
        };
      }
    ];
  };
}

interface ReferralVariables {
  usefirstreward: boolean;
  referrercontent: string;
  convertedcontent: string;
  pendingcontent: string;
  pendingvalue: string;
  referrervalue: string;
  valuecontent: string;
  expiredvalue: string;
  expiredcontent: string;
  cancelledvalue: string;
  cancelledcontent: string;
}

interface RewardPickerReward {
  description: string;
  amount: number;
  unit: string;
  JSONata: string;
  key: string;
}

interface RewardBalance {
  type: string;
  unit: string;
  value: number;
  prettyValue: string;
}

declare module "react";
