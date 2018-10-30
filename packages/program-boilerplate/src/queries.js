export const rewardEmailQuery = `
query ($userId:String!, $accountId:String!, $rewardId:ID!, $programId:ID!, $referralId: ID!) {
  reward(id:$rewardId) {
    ...AllFlatRewardFields
  }
  user(id:$userId, accountId:$accountId) {
    firstName
    lastName
    referralCode(programId:$programId)
    shareLink(programId:$programId,shareMedium:FACEBOOK)
    facebook: messageLink(programId:$programId,shareMedium:FACEBOOK)
    twitter: messageLink(programId:$programId,shareMedium:TWITTER)
    email:messageLink(programId:$programId,shareMedium:EMAIL)
  }

  referral(id:$referralId) {
    referrerUser{
      firstName
      lastName
    }
    referredUser{
      firstName
      lastName
    }
  }

  tenant {
    emailAddress
    settings {
      companyName
    }
  }
}

fragment AllFlatRewardFields on FlatReward {
  type
  prettyValue
  value
  unit
  name
  dateGiven
  dateExpires
  dateCancelled
  rewardSource
  fuelTankCode
  fuelTankType
  currency
  programId
  programRewardKey
}
`;

export const rewardEmailQueryForNonReferralPrograms = `
query ($userId:String!, $accountId:String!, $rewardId:ID!, $programId:ID!) {
  reward(id:$rewardId) {
    ...AllFlatRewardFields
  }
  user(id:$userId, accountId:$accountId) {
    firstName
    lastName
    referralCode(programId:$programId)
    shareLink(programId:$programId,shareMedium:FACEBOOK)
    facebook: messageLink(programId:$programId,shareMedium:FACEBOOK)
    twitter: messageLink(programId:$programId,shareMedium:TWITTER)
    email:messageLink(programId:$programId,shareMedium:EMAIL)
  }

  tenant {
    emailAddress
    settings {
      companyName
    }
  }
}

fragment AllFlatRewardFields on FlatReward {
  type
  prettyValue
  value
  unit
  name
  dateGiven
  dateExpires
  dateCancelled
  rewardSource
  fuelTankCode
  fuelTankType
  currency
  programId
  programRewardKey
}
`;