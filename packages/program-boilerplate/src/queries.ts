export const rewardEmailQuery = `
  query ($userId:String!, $accountId:String!, $rewardId:ID!, $programId:ID!, $referralId: ID!) {
    reward(id:$rewardId) {
      ...AllFlatRewardFields
    }
    user(id:$userId, accountId:$accountId) {
      firstName
      lastName
      customFields
      referralCode(programId:$programId)
      shareLink(programId:$programId,useCleanLink:true)
      facebook: messageLink(programId:$programId,shareMedium:FACEBOOK,engagementMedium:EMAIL)
      twitter: messageLink(programId:$programId,shareMedium:TWITTER,engagementMedium:EMAIL)
      email:messageLink(programId:$programId,shareMedium:EMAIL,engagementMedium:EMAIL)
      sms:messageLink(programId:$programId,shareMedium:SMS,engagementMedium:EMAIL)
      linkedin: messageLink(programId:$programId,shareMedium:LINKEDIN,engagementMedium:EMAIL)
      fbmessenger: messageLink(programId:$programId,shareMedium:FBMESSENGER,engagementMedium:EMAIL)
    }

    program(id: $programId) {
      sharing {
        redirectUrl {
          url
        }
      }
    }

    referral(id:$referralId) {
      referrerUser{
        firstName
        lastName
        email
        customFields
      }
      referredUser{
        firstName
        lastName
        email
        customFields
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

export const nonRewardEmailQueryForReferralPrograms = `query ($userId:String!, $accountId:String!,$programId:ID!, $referralId: ID!) {
  user(id:$userId, accountId:$accountId) {
    firstName
    lastName
    customFields
    referralCode(programId:$programId)
    shareLink(programId:$programId,useCleanLink:true)
    facebook: messageLink(programId:$programId,shareMedium:FACEBOOK)
    twitter: messageLink(programId:$programId,shareMedium:TWITTER)
    email:messageLink(programId:$programId,shareMedium:EMAIL)
    sms:messageLink(programId:$programId,shareMedium:SMS)
    linkedin: messageLink(programId:$programId,shareMedium:LINKEDIN)
    fbmessenger: messageLink(programId:$programId,shareMedium:FBMESSENGER)
  }

  referral(id:$referralId) {
    referrerUser{
      firstName
      lastName
      email
      customFields
    }
    referredUser{
      firstName
      lastName
      email
      customFields
    }
  }

  program(id: $programId) {
    sharing {
      redirectUrl {
        url
      }
    }
  }

  tenant {
    emailAddress
    settings {
      companyName
    }
  }
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
      customFields
      email:messageLink(programId:$programId,shareMedium:EMAIL)
    }

    program(id: $programId) {
      sharing {
        redirectUrl {
          url
        }
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

export const nonRewardEmailQueryForNonReferralPrograms = `
  query ($userId:String!, $accountId:String!, $programId:ID!) {
    user(id:$userId, accountId:$accountId) {
      firstName
      lastName
      customFields
      email:messageLink(programId:$programId,shareMedium:EMAIL)
    }

    program(id: $programId) {
      sharing {
        redirectUrl {
          url
        }
      }
    }

    tenant {
      emailAddress
      settings {
        companyName
      }
    }
  }
`;

//context for reward schedule trigger
export const rewardScheduleQuery = (emailKey: string) => {
  const query = `query ProgramTrigger($programId: ID!) {
    activeTrigger: activeProgramTrigger {
      type
      time
      user {
        ...BaseUserFields
        programEmailTransactions(
          filter: {
            key_eq: "${emailKey}"
            programId_eq: $programId
          }
          limit:20
          offset:0
        ) {
          totalCount
          data {
            rewardId
          }
        }
        rewards(filter: {
          programId_eq: $programId
        }, limit: 100) {
          totalCount
          data {
            ...RewardFields
          }
        }
        referrals(filter: {
          programId_eq: $programId
        }, limit: 1) {
          totalCount
          # data {
          #   ...ReferralFields
          # }
        }
        referredByReferral(programId: $programId) {
          ...ReferralFields
          referrerUser {
            id
            accountId
            firstName
            lastName
            email
            segments
            lastSeenGeoData
            ...BaseUserFields
          }
        }
      }
      ... on AfterUserCreatedOrUpdatedTrigger {
        previous {
          ...BaseUserFields
        }
        events {
          key
          fields
        }
      }
      ... on ReferralProgramTrigger {
        referralEventType
        referral {
          ...ReferralFields
        }
      }
      ... on RewardScheduledProgramTrigger {
        id
        reward {
            ...RewardFields
      }
    }
      ... on AfterUserEventProcessedTrigger {
        events {
          key
          fields
        }
      }
    }
    program(id: $programId) {
      id
      rules
    }
    tenant {
      settings {
        suspectedFraudModerationState
      }
    }
    ids(length: 10)
  }

  fragment BaseUserFields on User {
    id
    accountId
    firstName
    lastName
    imageUrl
    email
    cookieId
    locale
    referable
    firstSeenIP
    lastSeenIP
    firstSeenGeoData
    lastSeenGeoData
    dateCreated
    dateBlocked
    customFields
    segments
    fraudFlags {
      ...FraudFlagFields
    }
  }

  fragment ReferralFields on Referral {
    id
    moderationStatus
    referredModerationStatus
    referrerModerationStatus
    dateReferralStarted
    dateFraudChecksCompleted
    fraudSignals
    fraudFlags {
      ...FraudFlagFields
    }
    isFraudExempt
    referrerUser {
      rewards(filter: {
        programId_eq: $programId
      }, limit: 100) {
        totalCount
        data {
          ...RewardFields
        }
      }
      ...BaseUserFields
    }
    rewards {
      ...RewardFields
    }
  }

  fragment RewardFields on FlatReward {
    id
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

  fragment FraudFlagFields on FraudFlag {
    type
    message
  }`;
  return query;
};
