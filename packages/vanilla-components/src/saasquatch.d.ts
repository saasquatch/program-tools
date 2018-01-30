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
      getReferrals(offset:number):Promise<UserPayload>
      getReferrals():Promise<UserPayload>
    }
  }
  
  interface UserPayload{
    data:{
      user:{
        referrals:{
          count: number
          totalCount: number
          data:Referral[]
        }
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