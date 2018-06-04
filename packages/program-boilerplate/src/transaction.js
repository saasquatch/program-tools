
class Transaction {
   

    constructor({mutations = [], analytics=[], context}) {
    this.mutations = mutations;
    this.analytics = analytics;
    this.context = context;
    this.rewardId = context.body.ids.pop();
   }

   //reward for current user
    generateSimpleReward(rewardKey, rewardId) {
        const currentUser = this.context.body.activeTrigger.user;
        const newMutation = {
            "type": "CREATE_REWARD",
            "data": {
            "user": {
                "id": currentUser.id,
                "accountId": currentUser.accountId
            },
            "key": rewardKey,
            "rewardId": rewardId
            }
        };
        
        this.mutations = [...this.mutations,newMutation];
    }
    //user can be referred user or referrer
    generateReferralReward(rewardKey, referralId, userId, accountId) {
        const newMutation = {
            "type": "CREATE_REWARD",
            "data": {
                "user": {
                    "id": userId,
                    "accountId": accountId
                },
            "key": rewardKey,
            "rewardId": this.rewardId,
            "referralId": referralId
            }
        };

        this.mutations = [...this.mutations, newMutation];
    }


    generateEmail(emailKey, userId, accountId, query, queryVariables) {
        
        const newMutation = {
            "type": "SEND_EMAIL",
            "data": {
            "user": {
                "id": userId,
                "accountId": accountId
            },
            "key": emailKey,
            "queryVariables": queryVariables,
            "query": query
            }
        };
        
        this.mutations = [...this.mutations, newMutation];
    }

    generateSimpleRewardAndEmail(emailKey, rewardKey, query, queryVariables) {
        this.generateSimpleReward(rewardKey);
        this.generateEmail(emailKey, currentUser.userId, currentUser.accountId, query, queryVariables);
    }

    generateReferralRewardAndEmail(emailKey, rewardKey, referralId, userId, accountId, query, queryVariables = {
        "userId": userId,
        "accountId": accountId,
        "rewardId": this.rewardId} ) {
        this.generateReferralReward(rewardKey, referralId, userId, accountId);
        this.generateRewardEmail(emailKey, userId, accountId, query, queryVariables);
    }

    toJson() {
        return {
        "mutations": this.mutations,
        "programId": this.context.body.program.id,
        "analytics": this.analytics
        }
    }
}

module.exports = Transaction;