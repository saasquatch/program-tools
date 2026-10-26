import { getVerificationStep } from "./getVerificationStep";

const verified = { emailVerified: true };
const cash = (totalCount: number) => ({ cashRewards: { totalCount } });

describe("getVerificationStep", () => {
  it("does not prompt partner creation for a verified user without cash rewards", () => {
    expect(getVerificationStep({ ...verified, ...cash(0) })).toBe("content");
    expect(getVerificationStep({ ...verified })).toBe("content");
    expect(getVerificationStep({ ...verified, cashRewards: null })).toBe(
      "content"
    );
  });

  it("does not prompt partner creation before email is verified, even with cash rewards", () => {
    expect(getVerificationStep({ ...cash(1) })).toBe("verify");
    expect(getVerificationStep(undefined)).toBe("verify");
  });

  it("does not prompt partner creation for an already-connected user", () => {
    expect(
      getVerificationStep({
        ...verified,
        ...cash(3),
        impactConnection: { connected: true },
      })
    ).toBe("content");
  });

  it("prompts partner creation for a verified, unconnected user with a cash reward", () => {
    expect(getVerificationStep({ ...verified, ...cash(1) })).toBe("partner");
  });

  it("treats a managed identity's verified email as verified", () => {
    expect(
      getVerificationStep({
        managedIdentity: { emailVerified: true },
        ...cash(1),
      })
    ).toBe("partner");
  });
});
