import { h } from "@stencil/core";
import column from "./columns/referral-table-column.feature";
import date from "./columns/referral-table-date-column.feature";
import rewards from "./columns/referral-table-rewards-column.feature";
import status from "./columns/referral-table-status-column.feature";
import user from "./columns/referral-table-user-column.feature";
import {
  baseReward,
  pendingReward,
  nullScheduledFor,
  availableReward,
  nullExpiresIn,
  redeemedReward,
  cancelledReward,
  expiredReward,
  zeroRewards,
  oneReward,
  twoRewards,
  threeRewards,
  fiveRewards,
  eightRewards,
  tenRewards,
} from "./ReferralTableRewardsCellData";

const scenario = column + date + rewards + status + user;

export default {
  title: "Components/Referral Table Rewards Cell",
  parameters: {
    scenario,
  },
};

export const PendingNoUnpend = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...pendingReward, ...nullScheduledFor }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const PendingNoUnpendNoDetails = () => {
  return (
    <sqm-referral-table-rewards-cell
      hideDetails={true}
      rewards={[{ ...baseReward, ...pendingReward, ...nullScheduledFor }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const NarrowColumnWithWideText = () => {
  return (
    <div style={{ width: "250px" }}>
      <sqm-referral-table-rewards-cell
        rewards={[
          { ...baseReward, ...pendingReward, dateScheduledFor: getDays() },
        ]}
        statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
        fuelTankText="Your code is"
        rewardReceivedText="Reward received on"
        expiringText="Expiring in"
        pendingForText="{status} for {date}"
      ></sqm-referral-table-rewards-cell>
      <sqm-referral-table-rewards-cell
        rewards={[{ ...baseReward, ...pendingReward }]}
        statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
        fuelTankText="Your code is"
        rewardReceivedText="Reward received on"
        expiringText="Expiring in"
        pendingForText="Pending for 300,000,000 months and some change"
      ></sqm-referral-table-rewards-cell>
      <sqm-referral-table-rewards-cell
        rewards={[
          { ...baseReward, ...pendingReward, dateScheduledFor: getYears() },
        ]}
        statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
        fuelTankText="Your code is"
        rewardReceivedText="Reward received on"
        expiringText="Expiring in"
        pendingForText="{status} for {date}"
      ></sqm-referral-table-rewards-cell>
    </div>
  );
};

export const PendingWithUnpend = () => {
  return [
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...pendingReward, dateScheduledFor: getSeconds() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...pendingReward, dateScheduledFor: getMinutes() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...pendingReward, dateScheduledFor: getHours() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...pendingReward, dateScheduledFor: getDays() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...pendingReward, dateScheduledFor: getMonths() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...pendingReward, dateScheduledFor: getYears() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
  ];
};

export const AvailableNoExpiry = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward, ...nullExpiresIn }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const AvailableWithExpiry = () => {
  return [
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...availableReward, dateExpires: getSeconds() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...availableReward, dateExpires: getMinutes() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward, dateExpires: getHours() }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward, dateExpires: getDays() }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[
        { ...baseReward, ...availableReward, dateExpires: getMonths() },
      ]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward, dateExpires: getYears() }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>,
  ];
};

export const Redeemed = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...redeemedReward }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const Cancelled = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...cancelledReward }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const Expired = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...expiredReward }]}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const EmptyCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={zeroRewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const oneRewardCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={oneReward}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const twoRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={twoRewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const threeRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={threeRewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const fiveRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={fiveRewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const eightRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={eightRewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};

export const tenRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={tenRewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};
