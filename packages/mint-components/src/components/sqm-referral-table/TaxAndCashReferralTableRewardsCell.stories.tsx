import { h } from "@stencil/core";
import { DateTime } from "luxon";
import { Reward, ImpactConnection } from "../../saasquatch";

export default {
  title: "Components/Tax And Cash Referral Table Rewards Cell",
};

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

const defaultProps = {
  statusText:
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PROCESSING {Payment Processing} PAYOUT_FAILED {Payout Failed} PAYOUT_CANCELLED {Payout Cancelled} PENDING_TAX_REVIEW {Pending} PENDING_NEW_TAX_FORM {Pending} PENDING_TAX_SUBMISSION {Pending} PENDING_PARTNER_CREATION {Pending} DENIED {Denied} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
  statusLongText:
    "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} PENDING_REVIEW {Pending since} PAYOUT_APPROVED {Processing until {scheduledPayoutDate}. Payout is then scheduled based on your settings.} PAYOUT_FAILED {Payout failed due to a fulfillment issue and is currently being retried.} PAYOUT_CANCELLED {If you think this is a mistake, contact our Support team.} PENDING_TAX_REVIEW {Awaiting tax form review} PENDING_NEW_TAX_FORM {Invalid tax form. Submit a new form to receive your rewards.} PROCESSING {Processing until {scheduledPayoutDate}. Payout is then scheduled based on your settings.} PENDING_TAX_SUBMISSION {Submit your tax documents to receive your rewards} PENDING_PARTNER_CREATION {Complete your tax and cash payout setup to receive your rewards} DENIED {Denied on} EXPIRED {Reward expired on} other {Not available} }",
  rewardReceivedText: "Reward received on",
  hideDetails: false,
};

export const CashReward = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...cashReward }]}
      taxConnection={taxConnection}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PayoutApproved = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          partnerFundsTransfer: {
            ...defaultPFT,
            status: "TRANSFERRED",
            dateScheduled: Date.now() - 600000000,
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
            status: "INACTIVE",
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
          currentTaxDocument: null,
        },
      }}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PendingPartnerCreation = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[
        {
          ...cashReward,
          statuses: ["PENDING"],
          pendingReasons: ["MISSING_PAYOUT_CONFIGURATION"],
        },
      ]}
      taxConnection={{
        ...taxConnection,
        connected: false,
      }}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PendingW9 = () => {
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
        taxHandlingEnabled: false,
      }}
      {...defaultProps}
    ></sqm-referral-table-rewards-cell>
  );
};
