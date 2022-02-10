import { h } from "@stencil/core";
import scenario1 from "./columns/sqm-rewards-table-date-column.feature";
import scenario2 from "./columns/sqm-rewards-table-reward-column.feature";
import scenario3 from "./columns/sqm-rewards-table-status-column.feature";
import scenario4 from "./columns/sqm-rewards-table-source-column.feature";

const scenario = scenario1 + scenario2 + scenario3 + scenario4;

export default {
  title: "Components/Rewards Table Cell",
  parameters: {
    scenario,
  },
};

const rewardsData: Reward = {
  id: "61c100117a82a376d8804166",
  type: "CREDIT",
  value: 19,
  unit: "TESTUNIT",
  name: null,
  dateGiven: 1640038417468,
  meta: { message: "***CUSTOMER NOTE MESSAGE***" },
  dateExpires: null,
  dateCancelled: null,
  dateRedeemed: null,
  dateScheduledFor: null,
  fuelTankCode: null,
  fuelTankType: null,
  currency: null,
  prettyValue: "19 Points",
  prettyValueNumber: "19",
  prettyAvailableNumber: "19",
  prettyRedeemedNumber: "0",
  statuses: ["AVAILABLE"],
  pendingReasons: null,
  globalRewardKey: null,
  rewardSource: "MANUAL",
  prettyRedeemedCredit: "0 Points",
  prettyAssignedCredit: "19 Points",
  prettyAvailableValue: "19 Points",
  exchangedRewardRedemptionTransaction: null,
  referral: null,
  rewardRedemptionTransactions: {
    data: null,
  },
};

export const RewardsCellCreditSingle = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData, ...singleRedeemed }}
    ></sqm-rewards-table-reward-cell>
  );
};

export const RewardsCellCreditFull = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData }}
      availableText="19 Points remaining"
    ></sqm-rewards-table-reward-cell>
  );
};

const partial = {
  prettyAvailableValue: "10 Points",
  prettyRedeemedCredit: "9 Points",
  prettyRedeemedNumber: "9",
  dateRedeemed: 1640038417468,
};

export const RewardsCellCreditPartial = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData, ...partial }}
      availableText="10 Points remaining"
    ></sqm-rewards-table-reward-cell>
  );
};

export const RewardsCellCreditCancelled = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData, ...cancelled }}
      redeemedText="0 Points redeemed"
    ></sqm-rewards-table-reward-cell>
  );
};

export const RewardsCellCreditExpired = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData, ...partial, ...expired }}
      redeemedText="9 Points redeemed"
    ></sqm-rewards-table-reward-cell>
  );
};

export const RewardsCellCreditPending = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData, ...partial, ...pending }}
      availableText="9 Points redeemed"
    ></sqm-rewards-table-reward-cell>
  );
};

const empty = {
  prettyAvailableValue: "0 Points",
  prettyAvailableNumber: "0",
  prettyRedeemedCredit: "19 Points",
  prettyRedeemedNumber: "19",
  dateRedeemed: 1640038417468,
};

export const RewardsCellCreditRedeemed = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{ ...rewardsData, ...empty }}
      availableText="0 Points remaining"
    ></sqm-rewards-table-reward-cell>
  );
};

const singleRedeemed = {
  prettyValue: "1 Point",
  prettyValueNumber: "1",
};

const longName = {
  prettyValue:
    "19 Points with a really really super duper longest name ever in the world wide web",
  prettyValueNumber: "19",
};

export const RewardsCellCreditLong = () => {
  return (
    <div style={{ maxWidth: "222px" }}>
      <sqm-rewards-table-reward-cell
        reward={{ ...rewardsData, ...longName }}
        availableText="19 Points with a really really super duper longest name ever in the world wide web remaining"
      ></sqm-rewards-table-reward-cell>
    </div>
  );
};

export const RewardsCellNonCredit = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{
        ...rewardsData,
        type: "GIFTCARD",
        prettyValue: "SaaSquatch Giftcard",
      }}
    ></sqm-rewards-table-reward-cell>
  );
};

export const RewardsCellFueltank = () => {
  return (
    <sqm-rewards-table-reward-cell
      reward={{
        ...rewardsData,
        type: "FUELTANK",
        prettyValue: "Fueltank Reward",
        fuelTankCode: "AFUELTANKCODE",
      }}
      fueltankText="Your code:"
      copyText="Copied"
    ></sqm-rewards-table-reward-cell>
  );
};
export const RewardsCellFueltankLong = () => {
  return (
    <div style={{ maxWidth: "222px" }}>
      <sqm-rewards-table-reward-cell
        reward={{
          ...rewardsData,
          type: "FUELTANK",
          prettyValue: "Long Fueltank Reward",
          fuelTankCode: "AFUELTANKCODE123456789123456789123456789123456789",
        }}
        fueltankText="Your code:"
        copyText="Copied"
      ></sqm-rewards-table-reward-cell>
    </div>
  );
};

export const SourceCellManual = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={rewardsData}
      rewardSourceText="Manual"
    ></sqm-rewards-table-source-cell>
  );
};

export const SourceCellProgram = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{
        ...rewardsData,
        rewardSource: "AUTOMATED",
        program: { name: "Klip Loyalty" },
      }}
      rewardSourceText="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
    ></sqm-rewards-table-source-cell>
  );
};

const exchange = {
  exchangedRewardRedemptionTransaction: {
    id: "61c100117a82a376d88041196",
    creditRedeemed: 1,
    prettyRedeemedCredit: "1 Money",
    unit: "TESTUNIT",
    dateRedeemed: 1640038417173,
    redeemedRewards: null,
    exchangedRewards: null,
  },
};

export const SourceCellExchange = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...exchange }}
      rewardExchangeText="Reward Exchange"
    ></sqm-rewards-table-source-cell>
  );
};

const longUserName = {
  firstName: "Bartholomew",
  lastName: "Christopher-Johnston Wallace",
  imageUrl: null,
};

const johnDoe = {
  firstName: "John",
  lastName: "Doe",
  imageUrl: null,
};

const anon = {
  firstName: "",
  lastName: "",
  imageUrl: null,
};

const referral = (user = null) => {
  return {
    rewardSource: "FRIEND_SIGNUP" as const,
    referral: {
      id: "123",
      dateConverted: 1640038417173,
      dateReferralStarted: 1640038417173,
      dateReferralPaid: 1640038417173,
      dateReferralEnded: null,
      moderationStatus: null,
      rewards: null,
      referrerUser: user,
      referredUser: user,
    },
  };
};

const referred = (user = null) => {
  return {
    rewardSource: "REFERRED" as const,
    referral: {
      id: "123",
      dateConverted: 1640038417173,
      dateReferralStarted: 1640038417173,
      dateReferralPaid: 1640038417173,
      dateReferralEnded: null,
      moderationStatus: null,
      rewards: null,
      referrerUser: user,
      referredUser: user,
    },
  };
};

export const SourceCellReferral = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...referral(johnDoe) }}
      referralText="Referral to"
    ></sqm-rewards-table-source-cell>
  );
};
export const SourceCellWithLongText = () => {
  return (
    <div style={{ width: "200px" }}>
      <sqm-rewards-table-source-cell
        reward={{ ...rewardsData, ...referral(longUserName) }}
        referralText="Referral to"
      ></sqm-rewards-table-source-cell>
    </div>
  );
};
export const SourceCellReferred = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...referred(johnDoe) }}
      referralText="Referred by"
    ></sqm-rewards-table-source-cell>
  );
};

export const SourceCellAnonymousUser = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...referral(anon) }}
      referralText="Referral to"
      anonymousUserText="Anonymous User"
    ></sqm-rewards-table-source-cell>
  );
};
export const SourceCellDeletedUser = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...referral(null) }}
      referralText="Referral to"
      deletedUserText="Deleted User"
    ></sqm-rewards-table-source-cell>
  );
};

export const StatusCellAvailable = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Available"
      reward={rewardsData}
    ></sqm-rewards-table-status-cell>
  );
};

const expire = {
  dateExpires: 1640038417468,
};

export const StatusCellAvailableExpiry = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Available"
      reward={{ ...rewardsData, ...expire }}
      expiryText="Expires"
    ></sqm-rewards-table-status-cell>
  );
};

const redeemed = {
  statuses: ["REDEEMED"],
  dateRedeemed: 1640038417468,
};

export const StatusCellRedeemed = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Redeemed"
      reward={{ ...rewardsData, ...redeemed }}
    ></sqm-rewards-table-status-cell>
  );
};

const cancelled = {
  statuses: ["CANCELLED"],
  dateCancelled: 1640038417468,
};

export const StatusCellCancelled = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Cancelled"
      reward={{ ...rewardsData, ...cancelled }}
    ></sqm-rewards-table-status-cell>
  );
};

const expired = {
  statuses: ["EXPIRED"],
  dateExpires: 1640038417468,
};

export const StatusCellExpired = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Expired"
      reward={{ ...rewardsData, ...expired }}
    ></sqm-rewards-table-status-cell>
  );
};

const pending = {
  statuses: ["PENDING"],
};
const us_tax = {
  pendingReasons: ["US_TAX"],
};
const scheduled = {
  pendingReasons: ["SCHEDULED"],
  dateScheduledFor: 1640038417468,
};
const unhandled = {
  pendingReasons: ["UNHANDLED_ERROR"],
};

export const StatusCellPending = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{ ...rewardsData, ...pending }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingWithLongText = () => {
  return (
    <div style={{ width: "200px" }}>
      <sqm-rewards-table-status-cell
        statusText="Pending for 300,000,000 months and some change"
        reward={{ ...rewardsData, ...pending }}
      ></sqm-rewards-table-status-cell>
    </div>
  );
};

export const StatusCellPendingUsTax = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{ ...rewardsData, ...pending, ...us_tax }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingScheduled = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{ ...rewardsData, ...pending, ...scheduled }}
    ></sqm-rewards-table-status-cell>
  );
};

export const StatusCellPendingUnhandled = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Pending"
      reward={{ ...rewardsData, ...pending, ...unhandled }}
    ></sqm-rewards-table-status-cell>
  );
};

export const DateCell = () => {
  return (
    <sqm-rewards-table-date-cell
      date={1640038417468}
    ></sqm-rewards-table-date-cell>
  );
};

export const CustomerNoteCell = () => {
  return (
    <sqm-rewards-table-customer-note-cell
      note={rewardsData.meta.message}
    ></sqm-rewards-table-customer-note-cell>
  );
};

export const EmptyCell = () => {
  return <sqm-rewards-table-date-cell></sqm-rewards-table-date-cell>;
};
