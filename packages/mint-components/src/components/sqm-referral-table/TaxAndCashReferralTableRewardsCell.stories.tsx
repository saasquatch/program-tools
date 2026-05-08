import { h } from "@stencil/core";
import { Reward, ImpactConnection } from "../../saasquatch";

export default {
  title: "Components/Tax And Cash Referral Table Rewards Cell",
};

// Reusable timestamps (current date is May 2026)
const PAST = 1640995200000; // Jan 1, 2022
const FUTURE = 2779257600000; // ~2058

const cashReward: Reward = {
  id: "1234",
  type: "CREDIT",
  value: 50,
  unit: "USD",
  name: "test",
  dateScheduledFor: null,
  dateExpires: null,
  dateCancelled: null,
  dateRedeemed: null,
  fuelTankCode: null,
  fuelTankType: null,
  currency: "USD",
  prettyValue: "$50.00",
  statuses: [],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: null,
  partnerFundsTransfer: null,
  rewardedCash: true,
};

// ============================================================
// Reusable tax connections
// ============================================================

const fullySetupTaxConnection: ImpactConnection = {
  connected: true,
  taxHandlingEnabled: true,
  publisher: {
    requiredTaxDocumentType: "W9",
    currentTaxDocument: {
      status: "ACTIVE",
      type: "W9",
      dateCreated: PAST,
    },
    withdrawalSettings: { paymentMethod: "BANK_TRANSFER" },
    payoutsAccount: null,
  },
};

const connectedNoWithdrawalSettings: ImpactConnection = {
  connected: true,
  taxHandlingEnabled: true,
  publisher: {
    requiredTaxDocumentType: "W9",
    currentTaxDocument: {
      status: "ACTIVE",
      type: "W9",
      dateCreated: PAST,
    },
    withdrawalSettings: null,
    payoutsAccount: null,
  },
};

const notConnectedTaxConnection: ImpactConnection = {
  connected: false,
  taxHandlingEnabled: true,
  publisher: null,
};

const defaultProps = {
  statusText:
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PROCESSING {Payment Processing} PAYOUT_FAILED {Payout Failed} PAYOUT_CANCELLED {Payout Cancelled} PENDING_TAX_REVIEW {Pending} PENDING_NEW_TAX_FORM {Pending} PENDING_TAX_SUBMISSION {Pending} PENDING_PARTNER_CREATION {Pending} DENIED {Denied} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
  statusLongText:
    "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} PENDING_REVIEW {Pending since} PAYOUT_APPROVED {Processing until {scheduledPayoutDate}. Payout is then scheduled based on your settings.} PAYOUT_FAILED {Payout failed due to a fulfillment issue and is currently being retried.} PAYOUT_CANCELLED {If you think this is a mistake, contact our Support team.} PENDING_TAX_REVIEW {Awaiting tax form review} PENDING_NEW_TAX_FORM {Invalid tax form. Submit a new form to receive your rewards.} PROCESSING {Processing until {scheduledPayoutDate}. Payout is then scheduled based on your settings.} PENDING_TAX_SUBMISSION {Submit your tax documents to receive your rewards} PENDING_PARTNER_CREATION {Complete cash payout setup to receive your rewards} DENIED {Denied on} EXPIRED {Reward expired on} other {Not available} }",
  rewardReceivedText: "Reward received on",
  hideDetails: false,
};

// ============================================================
// STATE PRECEDENCE LADDER — one story per rule
// (See referral-table-rewards-column-new.feature § 2)
// ============================================================

// 1. Fraud check denied the referral → state is DENIED
export const RewardsCellFraudDenied = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        referral: { fraudData: { moderationStatus: "DENIED" } } as any,
      },
    ]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 2. Fraud check is still pending review → state is PENDING_REVIEW
export const RewardsCellFraudPendingReview = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        referral: { fraudData: { moderationStatus: "PENDING" } } as any,
      },
    ]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 3a. Cash reward but the user has not connected an Impact partner → shows the partner-setup prompt
export const RewardsCellPartnerNotCreatedSetupNotStarted = () => (
  <sqm-referral-table-rewards-cell
    rewards={[{ ...cashReward, statuses: ["AVAILABLE"] }]}
    taxConnection={notConnectedTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 3b. Cash reward, partner is connected but withdrawal settings are missing → shows the partner-setup prompt
export const RewardsCellPartnerCreatedSetupStartedButIncomplete = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        partnerFundsTransfer: {
          id: "pft-not-yet-due",
          status: "NOT_YET_DUE",
          dateCreated: PAST,
          dateScheduled: FUTURE,
          dateTransferred: null,
        },
      },
    ]}
    taxConnection={connectedNoWithdrawalSettings}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 4. Partner funds transfer was reversed → state is PAYOUT_CANCELLED
export const RewardsCellPayoutCancelled = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        partnerFundsTransfer: {
          id: "pft-reversed",
          status: "REVERSED",
          dateCreated: PAST,
          dateScheduled: PAST,
          dateTransferred: null,
        },
      },
    ]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 5. Partner funds transfer is overdue → state is PAYOUT_FAILED
export const RewardsCellPayoutFailed = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        partnerFundsTransfer: {
          id: "pft-overdue",
          status: "OVERDUE",
          dateCreated: PAST,
          dateScheduled: PAST,
          dateTransferred: null,
        },
      },
    ]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 6. Partner funds transfer is scheduled for a future date → state is PROCESSING
export const RewardsCellPayoutProcessing = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        partnerFundsTransfer: {
          id: "pft-processing",
          status: null,
          dateCreated: PAST,
          dateScheduled: FUTURE,
          dateTransferred: null,
        },
      },
    ]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 7. Partner funds transfer has been transferred → state is PAYOUT_APPROVED
export const RewardsCellPayoutApproved = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        partnerFundsTransfer: {
          id: "pft-transferred",
          status: "TRANSFERRED",
          dateCreated: PAST,
          dateScheduled: PAST,
          dateTransferred: PAST,
        },
      },
    ]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 8. Reward is pending US_TAX but tax handling is disabled → state is PENDING (W-9 required)
export const RewardsCellPendingW9Required = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      },
    ]}
    taxConnection={{ ...fullySetupTaxConnection, taxHandlingEnabled: false }}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 9. Reward is pending US_TAX and the partner is not connected → shows the partner-setup prompt
export const RewardsCellUsTaxPartnerNotConnected = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      },
    ]}
    taxConnection={notConnectedTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 10. Partner is connected but has not submitted any tax documents → shows the submit-tax-docs prompt
export const RewardsCellPendingTaxSubmission = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      },
    ]}
    taxConnection={{
      ...fullySetupTaxConnection,
      publisher: {
        ...fullySetupTaxConnection.publisher,
        currentTaxDocument: null,
      },
    }}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 11. Partner's tax document is inactive (rejected) → shows the submit-a-new-form prompt
export const RewardsCellPendingNewTaxForm = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      },
    ]}
    taxConnection={{
      ...fullySetupTaxConnection,
      publisher: {
        ...fullySetupTaxConnection.publisher,
        currentTaxDocument: {
          status: "INACTIVE",
          type: "W9",
          dateCreated: PAST,
        },
      },
    }}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 12. Partner's tax document is awaiting verification → shows the awaiting-review prompt
export const RewardsCellPendingTaxReview = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      },
    ]}
    taxConnection={{
      ...fullySetupTaxConnection,
      publisher: {
        ...fullySetupTaxConnection.publisher,
        currentTaxDocument: {
          status: "NOT_VERIFIED",
          type: "W9",
          dateCreated: PAST,
        },
      },
    }}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 13. Partner has an active tax form but has not configured withdrawal settings → shows the partner-setup prompt
export const RewardsCellExistingTaxFormNoWithdrawalSettings = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      },
    ]}
    taxConnection={connectedNoWithdrawalSettings}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 14. Reward has MISSING_PAYOUT_CONFIGURATION pending reason → shows the partner-setup prompt
export const RewardsCellMissingPayoutConfiguration = () => (
  <sqm-referral-table-rewards-cell
    rewards={[
      {
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["MISSING_PAYOUT_CONFIGURATION"],
      },
    ]}
    taxConnection={connectedNoWithdrawalSettings}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// 18. Reward does not match any precedence rule → state is undefined (Not available)
export const RewardsCellNoMatchingRule = () => (
  <sqm-referral-table-rewards-cell
    rewards={[{ ...cashReward, statuses: [] }]}
    taxConnection={fullySetupTaxConnection}
    {...defaultProps}
  ></sqm-referral-table-rewards-cell>
);

// ============================================================
// Aliases kept for backwards compatibility with existing references
// ============================================================

export const CashReward = RewardsCellPayoutApproved;
export const PayoutApproved = RewardsCellPayoutApproved;
export const PayoutProcessing = RewardsCellPayoutProcessing;
export const PayoutFailed = RewardsCellPayoutFailed;
export const PayoutCancelled = RewardsCellPayoutCancelled;
export const PendingTaxReview = RewardsCellPendingTaxReview;
export const PendingNewTaxForm = RewardsCellPendingNewTaxForm;
export const PendingTaxSubmission = RewardsCellPendingTaxSubmission;
export const PartnerNotCreatedSetupNotStarted =
  RewardsCellPartnerNotCreatedSetupNotStarted;
export const PartnerCreatedSetupStartedButIncomplete =
  RewardsCellPartnerCreatedSetupStartedButIncomplete;
export const PendingW9 = RewardsCellPendingW9Required;
