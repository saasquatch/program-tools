import { h } from "@stencil/core";
import { DateTime } from "luxon";
import { Reward, ImpactConnection } from "../../saasquatch";

export default {
  title: "Components/Tax And Cash Referral Table Rewards Cell",
};

/* -------------------------------------------------------------------------- */
/* DATA MOCKS                                                                 */
/* -------------------------------------------------------------------------- */

function getDays() {
  return DateTime.now().toMillis() + 600000000;
}

function getMonths() {
  return DateTime.now().toMillis() + 10000000000;
}

const cashReward: Reward = {
  id: "1234",
  type: "CREDIT",
  value: 50,
  unit: "USD",
  name: "test",
  dateScheduledFor: getDays(),
  dateExpires: getMonths(),
  dateCancelled: 134400,
  dateRedeemed: 0,
  fuelTankCode: null,
  fuelTankType: null,
  currency: "USD",
  prettyValue: "$50.00",
  statuses: ["AVAILABLE"],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: null,
  partnerFundsTransfer: null,
};

const taxConnection: ImpactConnection = {
  connected: true,
  taxHandlingEnabled: true,
  publisher: {
    requiredTaxDocumentType: "W9",
    withdrawalSettings: { paymentMethod: "BANK_TRANSFER" },
    payoutsAccount: null,
    currentTaxDocument: {
      status: "ACTIVE",
      type: "W9",
      dateCreated: 1627427794891,
    },
  },
};

const defaultPFT: Reward["partnerFundsTransfer"] = {
  id: "ID1234",
  status: null,
  dateCreated: null,
  dateScheduled: null,
  dateTransferred: null,
};

const defaultTaxDocument: ImpactConnection["publisher"]["currentTaxDocument"] =
  {
    status: "NOT_VERIFIED",
    type: "W9",
    dateCreated: DateTime.now().toMillis() - 1000000,
  };

// Shared props to keep stories clean
const defaultProps = {
  statusText:
    "{status, select, PAYOUT_APPROVED {Payout Approved} PROCESSING {Processing} PAYOUT_FAILED {Payout Failed} PAYOUT_CANCELLED {Payout Cancelled} PENDING_TAX_REVIEW {Pending} PENDING_NEW_TAX_FORM {Pending} PENDING_TAX_SUBMISSION {Pending} PENDING_PARTNER_CREATION {Pending} other {Not available} }",
  statusLongText:
    "{status, select, PAYOUT_APPROVED {Processing until {date}. Payout is then scheduled based your settings.} PAYOUT_FAILED {Payout failed due to a fulfillment issue and is currently being retried.} PAYOUT_CANCELLED {If you think this is a mistake, contact our Support team.} PENDING_TAX_REVIEW {Awaiting tax form review} PENDING_NEW_TAX_FORM {Invalid tax form. Submit a new form to receive your rewards.} PENDING_TAX_SUBMISSION {Submit your tax documents to receive your rewards} PENDING_PARTNER_CREATION {Complete your tax and cash payout setup to receive your rewards} other {Not available} }",
  rewardReceivedText: "Reward received on",
  hideDetails: false,
};

/* -------------------------------------------------------------------------- */
/* PAYOUT STORIES                                                             */
/* -------------------------------------------------------------------------- */

export const PayoutApproved = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          partnerFundsTransfer: {
            ...defaultPFT,
            status: "TRANSFERRED",
            dateScheduled: Date.now() - 100000, // Past
          },
        },
      ]}
      taxConnection={taxConnection}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PayoutProcessing = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          partnerFundsTransfer: {
            ...defaultPFT,
            status: null,
            dateCreated: 1355612521321,
            dateScheduled: getDays(),
          },
        },
      ]}
      taxConnection={taxConnection}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PayoutFailed = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          partnerFundsTransfer: {
            ...defaultPFT,
            status: "OVERDUE",
            dateScheduled: Date.now() - 100000,
          },
        },
      ]}
      taxConnection={taxConnection}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PayoutCancelled = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          partnerFundsTransfer: {
            ...defaultPFT,
            status: "REVERSED",
            dateScheduled: Date.now() - 100000,
          },
        },
      ]}
      taxConnection={taxConnection}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

/* -------------------------------------------------------------------------- */
/* TAX PENDING STORIES                                                        */
/* -------------------------------------------------------------------------- */

export const PendingTaxReview = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          statuses: ["PENDING"],
          pendingReasons: ["US_TAX"],
        },
      ]}
      taxConnection={{
        ...taxConnection,
        publisher: {
          ...taxConnection.publisher,
          currentTaxDocument: {
            ...defaultTaxDocument,
            status: "NOT_VERIFIED",
          },
        },
      }}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PendingNewTaxForm = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          statuses: ["PENDING"],
          pendingReasons: ["US_TAX"],
        },
      ]}
      taxConnection={{
        ...taxConnection,
        publisher: {
          ...taxConnection.publisher,
          currentTaxDocument: {
            ...defaultTaxDocument,
            status: "INACTIVE", // Triggers New Form Text
          },
        },
      }}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PendingTaxSubmission = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          statuses: ["PENDING"],
          pendingReasons: ["US_TAX"],
        },
      ]}
      taxConnection={{
        ...taxConnection,
        publisher: {
          ...taxConnection.publisher,
          currentTaxDocument: null, // Triggers Submission Text
        },
      }}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};
