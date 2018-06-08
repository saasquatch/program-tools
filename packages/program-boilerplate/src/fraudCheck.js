//@ts-check
const referralSideModerationStatus = {
    APPROVED: "APPROVED",
    PENDING: "PENDING",
    DENIED: "DENIED"
  };
/**
 * @module fraudCheck
 */
//typedefs
/**
 * @typedef {Object} referral 
 * @property {boolean} isFraudExempt 
 * @property {Number?} dateFraudChecksCompleted
 * @property {string} referredModerationStatus
 * @property {string} referrerModerationStatus
 */

/**
 * Checks if a referral passes auto fraudCheck (referralSideModerationStatus.APPROVED)
 * 
 * @param {Object} referral The referral to be fraud-checked - (referredByReferral in context).
 * @param {boolean} fraudCheckCompleted A boolean value indicating if the auto-moderation has completed
 * @param {boolean} isReferredUser If the user is the referred user, true; otherwise, false.
 * @returns {boolean} If the referral passed auto-fraudCheck, true; otherwise, false.
 */
function passAutoFraudCheck(referral, fraudCheckCompleted, isReferredUser) {  
    if(isReferredUser) {
        //if reward has been set to DENIED in setting, user should not be rewarded
        if(referral.referredModerationStatus === referralSideModerationStatus.DENIED) { return false; }

        //if user is blocked, do not reward
        // blocked-user, blocked-ip not working yet

        //if fraudcheck is completed, and the moderation-status is not APPROVED, the user should not be rewarded
        if(fraudCheckCompleted && referral.referredModerationStatus !== referralSideModerationStatus.APPROVED) {
        return false;
        }
    } else {
        //if reward has been set to DENIED in setting, user should not be rewarded
        if(referral.referrerModerationStatus === referralSideModerationStatus.DENIED) { return false; }

        //if user is blocked, do not reward
        // blocked-user, blocked-ip not working yet

        //if fraudcheck is completed, and the moderation-status is not APPROVED, the user should not be rewarded
        if(fraudCheckCompleted && referral.referrerModerationStatus !== referralSideModerationStatus.APPROVED) {
            return false;
        }
      }
    return true;
  }

/**
 * Checks if a referral passes fraud-check after auto-moderation and possibly manual moderation.
 * 
 * @param {Object} tenantSettings Settings of a tenant
 * @param {referral} referral The referral to be fraud-checked - (referredByReferral in context).
 * @param {boolean} isReferredUser If the user is the referred user, true; otherwise, false.
 * @returns {boolean} True if the referral passes all fraud-check; false, otherwise.
 */
export function passFraudCheck(tenantSettings, referral, isReferredUser) {
    const fraudChecksEnabled = (tenantSettings.suspectedFraudModerationState !== "IGNORE");
    //if fraud check not enabled, return true
    if(!fraudChecksEnabled) { return true; }
    
    const fraudCheckCompleted = !!referral.dateFraudChecksCompleted;

    //should not reward user if fraud check is not completed
    if (fraudChecksEnabled && !fraudCheckCompleted) {
        return false;
    }
    //should not reward user if the user has not passed auto fraudcheck yet
    if(!referral.isFraudExempt && !passAutoFraudCheck(referral, fraudCheckCompleted, isReferredUser)) { return false; }

    //manually moderating a referral will set isFraudExempt to true
    if(referral.isFraudExempt && fraudCheckCompleted && !passAutoFraudCheck(referral, fraudCheckCompleted, isReferredUser)) { return false;}

    return true;
}