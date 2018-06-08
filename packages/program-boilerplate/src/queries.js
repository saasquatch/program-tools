export const rewardEmailQuery = `
query ($userId:String!, $accountId:String!, $rewardId:ID!) {
  reward(id:$rewardId) {
    ...AllFlatRewardFields
  }
  user(id:$userId, accountId:$accountId) {
    firstName
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