import { h } from "@stencil/core";
import { ImpactConnection } from "../../saasquatch";

export default {
  title: "Components/Tax And Cash Rewards Table Cell",
};

// Reusable timestamps (current date is May 2026)
const PAST = 1640995200000; // Jan 1, 2022
const FUTURE = 2779257600000; // ~2058

const cashReward = {
  id: "68c34fd98a6cb4f5f8394084",
  type: "CREDIT",
  value: 59900,
  prettyValue: "$599.00",
  availableValue: 0,
  prettyAvailableValue: "$0.00",
  prettyAssignedCredit: "$599.00",
  prettyRedeemedCredit: "$599.00",
  prettyValueNumber: "599",
  prettyAvailableNumber: "0",
  prettyRedeemedNumber: "599",
  unit: "CASH/USD",
  baseUnit: "CASH",
  rewardUnit: {
    key: "CASH/USD",
    name: "Cash",
  },
  name: null,
  dateCreated: PAST,
  dateScheduledFor: null,
  dateGiven: PAST,
  dateExpires: null,
  dateCancelled: null,
  dateRedeemed: null,
  dateModified: PAST,
  rewardSource: "MANUAL" as const,
  fuelTankCode: null,
  fuelTankType: null,
  fuelTankSyncSetting: null,
  currency: "USD",
  meta: null,
  programId: "40444",
  programRewardKey: null,
  globalRewardKey: "cash",
  program: {
    id: "40444",
    name: "Make Money Program",
    template: {
      id: "2qdmAx1fi31deo3P9O36sQ",
      name: "Referral Program With Objectives",
    },
  },
  partnerFundsTransfer: null,

  user: {
    id: "8da2c67e05e3e56de7ea638c2705017945211621c80e1cd4b4aac0e423d1cdb2",
    accountId:
      "8da2c67e05e3e56de7ea638c2705017945211621c80e1cd4b4aac0e423d1cdb2",
    firstName: "Billy",
    lastName: "Jean",
    email: "billy.jean@impact.com",
    impactConnection: {
      connected: true,
      taxHandlingEnabled: true,
      publisher: null,
    },
  },
  referral: null,
  description: null,
  statuses: [],

  rewardRedemptionTransactions: {
    data: null,
  },
  exchangedRewardRedemptionTransaction: null,
  pendingReasons: [],
  rewardedCash: true,
};

// ============================================================
// Reusable tax connections
// ============================================================

const fullySetupTaxConnection: ImpactConnection = {
  connected: true,
  taxHandlingEnabled: true,
  connectionStatus: "COMPLETED",
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
  connectionStatus: "COMPLETED",
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
  connectionStatus: "NOT_STARTED",
  publisher: null,
};

// ============================================================
// Reward Cell (kept from original)
// ============================================================

export const CashReward = () => (
  <sqm-rewards-table-reward-cell
    reward={{ ...cashReward, statuses: ["REDEEMED"], dateRedeemed: PAST }}
    availableText="{availableAmount} remaining"
  ></sqm-rewards-table-reward-cell>
);

// ============================================================
// STATUS PRECEDENCE LADDER — one story per rule
// (See sqm-rewards-table-status-column-new.feature § 2)
// ============================================================

// 1. Fraud check denied the referral → status is Denied
export const StatusCellFraudDenied = () => (
  <sqm-rewards-table-status-cell
    statusText="Denied"
    reward={{
      ...cashReward,
      referral: { fraudData: { moderationStatus: "DENIED" } } as any,
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 2. Fraud check is still pending review → status is Pending Review
export const StatusCellFraudPendingReview = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      referral: { fraudData: { moderationStatus: "PENDING" } } as any,
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 3. Partner funds transfer was reversed → status is Payout Cancelled
export const StatusCellPayoutCancelled = () => (
  <sqm-rewards-table-status-cell
    statusText="Payout Cancelled"
    reward={{
      ...cashReward,
      partnerFundsTransfer: {
        id: "pft-reversed",
        status: "REVERSED",
        dateCreated: PAST,
        dateScheduled: PAST,
        dateTransferred: null,
      },
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 4. Partner funds transfer is overdue → status is Payout Failed
export const StatusCellPayoutFailed = () => (
  <sqm-rewards-table-status-cell
    statusText="Payout Failed"
    reward={{
      ...cashReward,
      partnerFundsTransfer: {
        id: "pft-overdue",
        status: "OVERDUE",
        dateCreated: PAST,
        dateScheduled: PAST,
        dateTransferred: null,
      },
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 5. Connected partner has not finished withdrawal settings setup → status is Pending
export const StatusCellPartnerCreatedSetupStartedButIncomplete = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      partnerFundsTransfer: {
        id: "pft-not-yet-due",
        status: "NOT_YET_DUE",
        dateCreated: PAST,
        dateScheduled: FUTURE,
        dateTransferred: null,
      },
    }}
    taxConnection={connectedNoWithdrawalSettings}
  ></sqm-rewards-table-status-cell>
);

// Reward is pending US_TAX and the partner has not been created yet → shows the partner-setup prompt
export const StatusCellPartnerNotCreatedSetupNotStarted = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["US_TAX"],
    }}
    taxConnection={notConnectedTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 6. Reward has MISSING_PAYOUT_CONFIGURATION pending reason and no withdrawal settings → status is Pending
export const StatusCellMissingPayoutConfiguration = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["MISSING_PAYOUT_CONFIGURATION"],
    }}
    taxConnection={connectedNoWithdrawalSettings}
  ></sqm-rewards-table-status-cell>
);

// 7. Partner funds transfer is scheduled for a future date → status is Processing
export const StatusCellPayoutProcessing = () => (
  <sqm-rewards-table-status-cell
    statusText="Processing"
    reward={{
      ...cashReward,
      partnerFundsTransfer: {
        id: "pft-processing",
        status: null,
        dateCreated: PAST,
        dateScheduled: FUTURE,
        dateTransferred: null,
      },
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 8. Partner funds transfer has been transferred → status is Payout Approved
export const StatusCellPayoutApproved = () => (
  <sqm-rewards-table-status-cell
    statusText="Payout Approved"
    reward={{
      ...cashReward,
      partnerFundsTransfer: {
        id: "pft-transferred",
        status: "TRANSFERRED",
        dateCreated: PAST,
        dateScheduled: PAST,
        dateTransferred: PAST,
      },
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 9. Reward has a cancellation date set → status is Cancelled
export const StatusCellRewardCancelled = () => (
  <sqm-rewards-table-status-cell
    statusText="Cancelled"
    reward={{
      ...cashReward,
      statuses: ["CANCELLED"],
      dateCancelled: PAST,
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 10. Reward statuses include EXPIRED → status is Expired
export const StatusCellRewardExpired = () => (
  <sqm-rewards-table-status-cell
    statusText="Expired"
    reward={{
      ...cashReward,
      statuses: ["EXPIRED"],
      dateExpires: PAST,
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 11. Reward is pending and scheduled for a future date → status is Pending with the scheduled date shown
export const StatusCellPendingScheduled = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["SCHEDULED"],
      dateScheduledFor: FUTURE,
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// 12. Reward does not match any precedence rule → no badge text, no description
export const StatusCellNoMatchingRule = () => (
  <sqm-rewards-table-status-cell
    statusText=""
    reward={{
      ...cashReward,
      statuses: [],
    }}
    taxConnection={fullySetupTaxConnection}
  ></sqm-rewards-table-status-cell>
);

// ============================================================
// US_TAX getTaxPendingReasons branches (Pending Description Resolution § 5)
// ============================================================

// Reward is pending US_TAX but tax handling is disabled → shows "W-9 required"
export const StatusCellPendingW9Required = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["US_TAX"],
    }}
    taxConnection={{ ...fullySetupTaxConnection, taxHandlingEnabled: false }}
  ></sqm-rewards-table-status-cell>
);

// Partner is connected but has not submitted any tax documents → shows the submit-tax-docs prompt
export const StatusCellPendingTaxSubmission = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["US_TAX"],
    }}
    taxConnection={{
      ...fullySetupTaxConnection,
      publisher: {
        ...fullySetupTaxConnection.publisher,
        currentTaxDocument: null,
      },
    }}
  ></sqm-rewards-table-status-cell>
);

// Partner's tax document is inactive (rejected) → shows the submit-a-new-form prompt
export const StatusCellPendingNewTaxForm = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["US_TAX"],
    }}
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
  ></sqm-rewards-table-status-cell>
);

// Partner's tax document is awaiting verification → shows the awaiting-review prompt
export const StatusCellPendingTaxReview = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["US_TAX"],
    }}
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
  ></sqm-rewards-table-status-cell>
);

// Partner has an active tax form but has not configured withdrawal settings → shows the partner-setup prompt
export const StatusCellExistingTaxFormNoWithdrawalSettings = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: ["US_TAX"],
    }}
    taxConnection={connectedNoWithdrawalSettings}
  ></sqm-rewards-table-status-cell>
);

// Partner is connected, no tax form is required, but withdrawal settings are not submitted → shows the partner-setup prompt
export const StatusCellConnectedNoTaxRequiredNoWithdrawalSettings = () => (
  <sqm-rewards-table-status-cell
    statusText="Pending"
    reward={{
      ...cashReward,
      statuses: ["PENDING"],
      pendingReasons: [],
    }}
    taxConnection={{
      connected: true,
      taxHandlingEnabled: true,
      connectionStatus: "COMPLETED",
      publisher: {
        requiredTaxDocumentType: null,
        currentTaxDocument: null,
        withdrawalSettings: null,
        payoutsAccount: null,
      },
    }}
  ></sqm-rewards-table-status-cell>
);

// Aliases kept for the table-level stories file
export const StatusCellPayoutSent = StatusCellPayoutApproved;
export const StatusCellPendingW9 = StatusCellPendingW9Required;
