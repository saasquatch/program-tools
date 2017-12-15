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

export function generateSimpleRewardAndEmail({context, emailKey, rewardKey, mutations}){
    var rewardId = context.body.ids.pop();
    mutations.push({
      "type": "CREATE_REWARD",
      "data": {
        "user": {
          "id": currentUser.id,
          "accountId": currentUser.accountId
        },
        "key": rewardKey,
        "rewardId": rewardId
      }
    });
    mutations.push({
      "type": "SEND_EMAIL",
      "data": {
        "user": {
          "id": currentUser.id,
          "accountId": currentUser.accountId
        },
        "key": emailKey,
        "queryVariables": {
          "userId": currentUser.id,
          "accountId": currentUser.accountId,
          "rewardId": rewardId
        },
        "query": rewardEmailQuery
      }
    });
}

export function webtask(options = {}){
    return function(context, cb) {
      var mutations = [];
      var analytics = [];
      
      switch (context.body.activeTrigger.type) {
        case "AFTER_USER_CREATED_OR_UPDATED":
          if(typeof options.afterUserCreatedOrUpdated === "function"){

              var currentUser = context.body.activeTrigger.user;
              var previousUser = context.body.activeTrigger.previous;
              
              if (!currentUser) return;
              
              var currentProgram = context.body.program;
              if (!currentProgram) return;
                
              options.afterUserCreatedOrUpdated(context, mutations, analytics);
          }
          break;
        default:
          break;
      }
      cb(null, {
        "mutations": mutations,
        "programId": context.body.program.id,
        "analytics": analytics
      });
    };
}
