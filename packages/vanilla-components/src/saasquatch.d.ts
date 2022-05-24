interface UserPayload {
  data: {
    user: {
      referredByReferral: {
        referrerUser: {
          firstName: string;
          lastName: string;
          imageUrl: string;
        };
        dateReferralStarted: number;
        rewards: {
          count: number;
          totalCount: number;
          data: Reward[];
        };
      };
      referrals: {
        count: number;
        totalCount: number;
        data: Referral[];
      };
      rewards: {
        count: number;
        totalCount: number;
        data: Reward[];
      };
    };
  };
}

interface ReferredByReferral {
  referrerUser: {
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  dateReferralStarted: number;
  dateConverted:number;
  rewards: Reward[];
}

interface Referral {
  id: string;
  dateReferralStarted: number;
  dateReferralPaid: number;
  dateReferralEnded: number;
  dateConverted:number;
  moderationStatus: string;
  referredUser: {
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  rewards: Reward[];
}

interface Meta {
  message: string;
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
  meta: Meta;
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
  expiresvalue: string;
  redeemedvalue: string;
  showexpiry: boolean;
  shownotes: boolean;
  cancelledvalue: string;
  cancelledcontent: string;
}

interface RewardBalance {
  type: string;
  unit: string;
  value: number;
  prettyValue: string;
}

declare module "react";
