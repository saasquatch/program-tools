interface MyAPI {
  ui: {
    open():any
    close():any
  }
  analytics: {
    loadEvent():String,
    shareEvent(medium:string):String
  }
  graphql: {
    getCurrentUser():Promise<any>
    getReferrals(offset:number):Promise<UserPayload>
    getReferrals():Promise<UserPayload>
    getUserFragment(userFragment:string, fragmentVariables:any):Promise<UserPayload>
    getClient():any
  }
}

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
}