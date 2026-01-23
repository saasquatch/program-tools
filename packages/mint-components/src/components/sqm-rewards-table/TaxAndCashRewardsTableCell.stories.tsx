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
  partnerFundsTransfer: {
    id: "693503" as const,
    status: "TRANSFERRED" as const,
    dateScheduled: 1768583958000,
    dateTransferred: 1768583958000,
    dateCreated: 1767979159000,
  },
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
  // rewardRedemptionTransactions: {
  //   data: [
  //     {
  //       exchangedRewards: {
  //         data: [],
  //       },
  //       redeemedRewards: {
  //         data: [
  //           {
  //             prettyValue: "$599.00",
  //           },
  //         ],
  //       },
  //       creditRedeemed: 59900,
  //       prettyRedeemedCredit: "$599.00",
  //       dateRedeemed: 1757630737115,
  //     },
  //   ],
  // },
  rewardRedemptionTransactions: {
    data: null,
  },
  exchangedRewardRedemptionTransaction: null,
  pendingReasons: [],
};

const payoutSent = {
  statuses: ["PAYOUT_SENT"],
};
const payoutFailed = {
  statuses: ["PAYOUT_FAILED"],
};
const payoutCancelled = {
  statuses: ["PAYOUT_CANCELLED"],
  dateCancelled: 1355612521321,
};

const processing = {
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
      reward={{ ...cashReward }}
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
      reward={{ ...cashReward }}
      taxConnection={{
        ...taxConnection,
        publisher: {
          ...taxConnection.publisher,
          requiredTaxDocumentType: "W8BEN",
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
      reward={{ ...cashReward }}
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
        pendingReasons: ["MISSING_PAYOUT_CONFIGURATION"],
      }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutSent = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payout Sent"
      reward={{ ...cashReward, ...payoutSent }}
      taxConnection={taxConnection}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutFailed = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payout Failed"
      reward={{ ...cashReward, ...payoutFailed }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutProcessing = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Processing"
      reward={{ ...cashReward, ...processing }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPayoutCancelled = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Payout Cancelled"
      reward={{ ...cashReward, ...payoutCancelled }}
    ></sqm-rewards-table-status-cell>
  );
};
