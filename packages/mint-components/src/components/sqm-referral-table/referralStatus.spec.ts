import { getReferralStatus } from "./referralStatus";

describe("getReferralStatus", () => {
  it("returns RETRACTED when a converted referral was later retracted", () => {
    expect(
      getReferralStatus({
        dateConverted: 1626850800000,
        dateConversionRetracted: 1627850800000,
      }),
    ).toBe("RETRACTED");
  });

  it("returns CONVERTED when the conversion still stands", () => {
    expect(
      getReferralStatus({
        dateConverted: 1626850800000,
        dateConversionRetracted: null,
      }),
    ).toBe("CONVERTED");
  });

  it("returns IN_PROGRESS when the referral never converted", () => {
    expect(
      getReferralStatus({ dateConverted: null, dateConversionRetracted: null }),
    ).toBe("IN_PROGRESS");
  });

  it("returns DENIED over any conversion state", () => {
    expect(
      getReferralStatus({
        dateConverted: 1626850800000,
        dateConversionRetracted: 1627850800000,
        fraudData: { moderationStatus: "DENIED" },
      }),
    ).toBe("DENIED");
  });

  it("returns PENDING_REVIEW over any conversion state", () => {
    expect(
      getReferralStatus({
        dateConverted: 1626850800000,
        dateConversionRetracted: 1627850800000,
        fraudData: { moderationStatus: "PENDING" },
      }),
    ).toBe("PENDING_REVIEW");
  });

  it("ignores an APPROVED fraud check and falls through to the conversion state", () => {
    expect(
      getReferralStatus({
        dateConverted: 1626850800000,
        fraudData: { moderationStatus: "APPROVED" },
      }),
    ).toBe("CONVERTED");
  });

  it("returns IN_PROGRESS for a referral with no dates at all", () => {
    expect(getReferralStatus({})).toBe("IN_PROGRESS");
  });
});
