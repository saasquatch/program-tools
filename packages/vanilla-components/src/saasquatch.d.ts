interface UserPayload {
  data:{
    user:{
      referredByReferral: {
        referrerUser: {
          firstName: string
          lastName: string
          imageUrl: string
        }
        dateReferralStarted: number
        rewards: {
          count: number
          totalCount: number
          data:Reward[]
        }
      }
      referrals: {
        count: number
        totalCount: number
        data:Referral[]
      },
      rewards: {
        count: number
        totalCount: number
        data:Reward[]
      }
    }
  }
}

interface ReferredByReferral {
  referrerUser: {
    firstName: string
    lastName: string
    imageUrl: string
  }
  dateReferralStarted: number
  rewards: Reward[]
}

interface Referral {
  id: string
  dateReferralStarted: number
  dateReferralPaid: number
  dateReferralEnded: number
  moderationStatus: string
  referredUser: {
    firstName: string
    lastName: string
    imageUrl: string
  },
  rewards: Reward[]
}

interface Reward {
  id: string
  type: string
  value: number
  unit: string
  name: string
  dateGiven: number
  dateExpires: number
  dateCancelled: number
  fuelTankCode: string
  fuelTankType: string
  currency: string
  prettyValue: string
  statuses: string[]
}

interface ReferralVariables {
  usefirstreward: boolean
  referrercontent: string
  convertedcontent: string
  pendingcontent: string
  pendingvalue: string
  referrervalue: string
  valuecontent: string
  expiredvalue: string
  expiredcontent: string
  showexpiry: boolean
  cancelledvalue: string
  cancelledcontent: string
}

interface RewardBalance {
  type: string
  unit: string
  value: number
  prettyValue: string
}

declare module 'react';