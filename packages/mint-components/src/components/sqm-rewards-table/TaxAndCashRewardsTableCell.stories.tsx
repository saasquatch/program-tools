import { h } from "@stencil/core";
import { ImpactConnection, Reward } from "../../saasquatch";

export default {
  title: "Components/Tax And Cash Rewards Table Cell",
};

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
  dateCreated: 1757630425085,
  dateScheduledFor: 1757631025115,
  dateGiven: 1757630737115,
  dateExpires: null,
  dateCancelled: null,
  dateRedeemed: 1757630737115,
  dateModified: 1757630737115,
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
  statuses: ["REDEEMED"],

  rewardRedemptionTransactions: {
    data: null,
  },
  exchangedRewardRedemptionTransaction: null,
  pendingReasons: [],
};

const pending = {
  statuses: ["PENDING"],
};

const payoutSent = {
  statuses: ["PAYOUT_APPROVED"],
};
const payoutFailed = {
  statuses: ["PAYOUT_FAILED"],
};
const payoutCancelled = {
  statuses: ["PAYOUT_CANCELLED"],
  dateCancelled: 1355612521321,
};

const processingPFT = {
  partnerFundsTransfer: {
    id: "123",
    status: null,
    dateCreated: 1355612521321,
    dateScheduled: 2779257600000,
    dateTransferred: null,
  },
};

const taxConnection: ImpactConnection = {
  connected: true,
  taxHandlingEnabled: true,
  publisher: {
    requiredTaxDocumentType: "W8BEN",
    currentTaxDocument: {
      status: "NOT_VERIFIED",
      type: "W8BEN",
      dateCreated: 321321487,
    },
    withdrawalSettings: {
      paymentMethod: "BANK_TRANSFER",
    },
    payoutsAccount: null,
  },
};

export const CashReward = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...cashReward }}
      availableText="{availableAmount} remaining"
    ></sqm-rewards-table-reward-cell>
  );
};

export const StatusCellPendingTaxReview = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{ ...cashReward, ...pending, pendingReasons: ["US_TAX"] }}
      taxConnection={{
        ...taxConnection,
        publisher: {
          requiredTaxDocumentType: "W8BEN",
          currentTaxDocument: {
            status: "",
          },
          ...taxConnection.publisher,
        },
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingNewTaxForm = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{
        ...cashReward,
        statuses: ["PENDING"],
        pendingReasons: ["US_TAX"],
      }}
      taxConnection={{
        connected: true,
        taxHandlingEnabled: true,
        publisher: {
          requiredTaxDocumentType: "W8BEN",
          withdrawalSettings: {
            paymentMethod: "BANK_TRANSFER",
          },
          payoutsAccount: null,
          currentTaxDocument: {
            status: "INACTIVE",
            type: "W8BEN",
            dateCreated: 321321487,
          },
        },
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingTaxSubmission = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{ ...cashReward, ...pending, pendingReasons: ["US_TAX"] }}
      taxConnection={{
        ...taxConnection,
        publisher: {
          ...taxConnection.publisher,
          requiredTaxDocumentType: "W8BEN",
          currentTaxDocument: null,
        },
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingPartnerCreation = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{
        ...cashReward,
        ...pending,
        pendingReasons: ["US_TAX"],
      }}
      taxConnection={{
        ...taxConnection,
        connected: false,
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingW9 = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{
        ...cashReward,
        ...pending,
        pendingReasons: ["US_TAX"],
      }}
      taxConnection={{
        ...taxConnection,
        taxHandlingEnabled: false,
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutSent = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payout Sent"
      reward={{
        ...cashReward,
        partnerFundsTransfer: {
          id: "transfer-123",
          status: "TRANSFERRED",
          dateScheduled: 1640995200000,
          dateTransferred: 1640995200000,
          dateCreated: 1640995200000,
        },
      }}
      taxConnection={taxConnection}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutFailed = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payout Failed"
      reward={{
        ...cashReward,
        partnerFundsTransfer: {
          id: "transfer-failed",
          status: "OVERDUE",
          dateScheduled: 1640995200000,
          dateTransferred: null,
          dateCreated: 1640995200000,
        },
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutProcessing = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payment Processing"
      reward={{ ...cashReward, ...processingPFT }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutCancelled = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payout Cancelled"
      reward={{
        ...cashReward,
        partnerFundsTransfer: {
          id: "transfer-reversed",
          status: "REVERSED",
          dateScheduled: 1640995200000,
          dateTransferred: null,
          dateCreated: 1640995200000,
        },
      }}
    ></sqm-rewards-table-status-cell>
  );
};
