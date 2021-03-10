interface Referral {
  id: string;
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
            },
          ];
        };
      },
    ];
  };
}
