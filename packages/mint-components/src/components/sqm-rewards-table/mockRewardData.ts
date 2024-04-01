import { DateTime } from "luxon";

export default (count = 4, status = undefined) => {
  const data = [...Array(count)].map(() => getMockData(status)) as Reward[];
  return { data };
};

const units = ["POINT", "TICKET", "GIFT"];
const prettyValues = ["Points", "Tickets", "Gifts"];
const statuses = ["AVAILABLE", "PENDING", "CANCELLED", "EXPIRED", "REDEEMED"];
const pendingReasons = ["US_TAX", "SCHEDULED", "UNHANDLED_ERROR"];

const paypalStatuses = [
  "PENDING",
  "IN_PROGRESS",
  "FAILED",
  "UNCLAIMED",
  "ONHOLD",
  "REFUNDED",
  "RETURNED",
  "REVERSED",
  "BLOCKED",
  "DENIED",
];

function getPaypalStatus(datePaidOut) {
  if (datePaidOut) return "SUCCESS";

  const randomIndex = Math.floor(Math.random() * 10);

  const randomStatus = paypalStatuses[randomIndex];

  return randomStatus;
}

export const getPaypalMeta = () => {
  const datePaidOut =
    Math.floor(Math.random() * 10) >= 5
      ? DateTime.now()?.minus({ day: 1 })
      : null;
  const dateLastAttempted =
    Math.floor(Math.random() * 10) >= 5
      ? DateTime.now()?.minus({ day: 1 })
      : null;

  const paypalStatus = getPaypalStatus(datePaidOut);

  const status =
    paypalStatus === "DENIED"
      ? "WARN"
      : !!datePaidOut
      ? "SUCCESS"
      : Math.floor(Math.random() * 10) >= 8
      ? "ERROR"
      : "SUCCESS";

  return {
    status,
    customMeta: {
      datePaidOut,
      dateLastAttempted,
      dateFirstAttempted: dateLastAttempted,
      rawPayPalInfo: {
        transaction_status: paypalStatus,
      },
    },
  };
};

const getMockData = (status?: string): Reward => {
  let isAvailableZero = false;
  let randomRedeemed = 0;
  let pendingReason;
  let dateScheduledFor;
  let dateCancelled;
  let dateExpires;

  const today = DateTime.now();

  //  set random data
  const randomUnitNumber = Math.floor(Math.random() * 3);
  const randomStatus = status || statuses[Math.floor(Math.random() * 5)];
  const unit = units[randomUnitNumber];
  const prettyValue = prettyValues[randomUnitNumber];
  const randomValue = Math.floor(Math.random() * 100) + 2;

  // set random values depending on status
  let prettyAvailableValue;
  if (randomStatus === "AVAILABLE") {
    prettyAvailableValue = `${randomValue} ${prettyValue}`;
    randomRedeemed = Math.floor(Math.random() * randomValue);
    dateExpires =
      Math.floor(Math.random() * 10) < 3
        ? today.plus({ days: 7 }).toMillis()
        : null;
  } else if (randomStatus === "EXPIRED") {
    prettyAvailableValue = `0 ${prettyValue}`;
    isAvailableZero = true;
    randomRedeemed = Math.floor(Math.random() * randomValue);
    dateExpires = today.minus({ days: 1 }).toMillis();
  } else if (randomStatus === "PENDING") {
    // pendingReason = ["PAYOUT_CONFIGURATION_MISSING"];
    const reason = pendingReasons[Math.floor(Math.random() * 3)];
    pendingReason = [reason];
    if (reason === "SCHEDULED") {
      dateScheduledFor = today.plus({ days: 6 }).toMillis();
    }
  } else if (randomStatus === "REDEEMED") {
    prettyAvailableValue = `0 ${prettyValue}`;
    isAvailableZero = true;
  } else {
    prettyAvailableValue = `0 ${prettyValue}`;
    isAvailableZero = true;
    dateCancelled = today.minus({ days: 2 }).toMillis();
  }

  const source = Math.floor(Math.random() * 3);

  return {
    id: "61f7878e096c9265de88b46f",
    type: "CREDIT",
    value: randomValue,
    unit,
    name: null,
    dateGiven: today.minus({ days: 3 }).toMillis(),
    dateExpires,
    dateCancelled,
    dateRedeemed:
      randomStatus === "REDEEMED" ? today.plus({ days: 2 }).toMillis() : null,
    dateScheduledFor,
    fuelTankCode: null,
    fuelTankType: null,
    currency: null,
    prettyValue: `${randomValue} ${prettyValue}`,
    prettyValueNumber: `${randomValue}`,
    prettyAvailableNumber: isAvailableZero
      ? "0"
      : `${randomValue - randomRedeemed}`,
    prettyRedeemedNumber:
      isAvailableZero && !randomRedeemed ? "0" : `${randomRedeemed}`,
    programId: source === 1 ? "program-id" : null,
    program: {
      name: "My Program",
    },
    // @ts-ignore
    meta: {
      ...getPaypalMeta(),
    },
    statuses: [randomStatus],
    pendingReasons: pendingReason,
    globalRewardKey: null,
    programRewardKey: null,
    rewardSource: source === 1 ? "AUTOMATED" : "MANUAL",
    prettyRedeemedCredit: `${randomRedeemed} ${prettyValue}`,
    prettyAssignedCredit: `${randomValue} ${prettyValue}`,
    prettyAvailableValue: isAvailableZero
      ? `0 ${prettyValue}`
      : `${randomValue - randomRedeemed} ${prettyValue}`,
    exchangedRewardRedemptionTransaction:
      source === 2
        ? {
            id: "61f7878e096c9265de88b414",
            creditRedeemed: 50,
            prettyRedeemedCredit: "50 Tokens",
            unit: "TOKEN",
            dateRedeemed: 1643612046258,
            exchangedRewards: [],
            redeemedRewards: [],
          }
        : null,
    referral: null,
    rewardRedemptionTransactions: {
      // @ts-ignore
      data: [],
    },
  };
};
