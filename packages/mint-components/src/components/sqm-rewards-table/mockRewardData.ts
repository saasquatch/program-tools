import { DateTime } from "luxon";

export default (count = 4) => {
  const data = [...Array(count)].map(() => getMockData());
  return { data };
};

const units = ["POINT", "TICKET", "GIFT"];
const prettyValues = ["Points", "Tickets", "Gifts"];
const statuses = ["AVAILABLE", "PENDING", "CANCELLED", "EXPIRED", "REDEEMED"];
const pendingReasons = ["US_TAX", "SCHEDULED", "UNHANDLED_ERROR"];

const getMockData = () => {
  let isAvailableZero = false;
  let randomRedeemed = 0;
  let pendingReason;
  let dateScheduledFor;
  let dateCancelled;
  const randomUnitNumber = Math.floor(Math.random() * 3);
  const randomStatus = statuses[Math.floor(Math.random() * 5)];

  const unit = units[randomUnitNumber];
  const prettyValue = prettyValues[randomUnitNumber];
  const randomValue = Math.floor(Math.random() * 100) + 2;

  let prettyAvailableValue;
  if (randomStatus === "AVAILABLE") {
    prettyAvailableValue = `${randomValue} ${prettyValue}`;
    randomRedeemed = Math.floor(Math.random() * randomValue);
  } else if (randomStatus === "EXPIRED" || randomStatus === "CANCELLED") {
    prettyAvailableValue = `0 ${prettyValue}`;
    isAvailableZero = true;
    randomRedeemed = Math.floor(Math.random() * randomValue);
  } else if (randomStatus === "PENDING") {
    const reason = pendingReasons[Math.floor(Math.random() * 3)];
    pendingReason = [reason];
    if (reason === "SCHEDULED") {
      dateScheduledFor = DateTime.now().plus({ days: 6 }).toMillis();
    }
  } else {
    prettyAvailableValue = `0 ${prettyValue}`;
    isAvailableZero = true;
    dateCancelled = 1643612046293;
  }

  const source = Math.floor(Math.random() * 3);

  return {
    id: "61f7878e096c9265de88b46f",
    type: "CREDIT",
    value: randomValue,
    unit,
    name: null,
    dateGiven: 1643612046293,
    dateExpires: null,
    dateCancelled,
    dateRedeemed: randomStatus === "REDEEMED" ? 1643612046293 : null,
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
          }
        : null,
    referral: null,
    rewardRedemptionTransactions: {
      data: [],
    },
  };
};
