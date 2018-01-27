interface MyAPI{
    ui: {
      open(): any
      close():any
    }
    analytics: {
      loadEvent():String
    }
    graphql: {
      getCurrentUser():Promise<any>
      getReferrals(offset:number | null):Promise<UserPayload>
    }
  }
  
  interface UserPayload{
    user:{
      referrals:{
        count: number
        totalCount: number
        data:Referral[]
      }
    }
  }
  
  interface Referral{
    id: string
    dateReferralStarted: number
    dateReferralPaid: number
    dateReferralEnded: number
    moderationStatus: string
    referredUser: {
      firstName: string
      lastName: string
    }
  }