import assert from "node:assert/strict";
import { inferType } from "@saasquatch/program-boilerplate";
import { getTestUser, parseTestSegments } from "../fixtures.ts";
import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

function copyReferringRelationship() {
  const referral = getTestUser().referredByReferral;
  assert.ok(referral, "The user must have a referring relationship");
  return structuredClone(referral);
}

Given(
  /^the referral has field "?([^"]+)"? equal to "?([^"]+)"?$/,
  (key: string, value: string) => {
    getWorld().setState({ current: { referral: { [key]: inferType(value) } } });
  },
);

Given("the trigger referral is the user's referring relationship", () => {
  getWorld().setState({ current: { referral: copyReferringRelationship() } });
});

Given("the trigger referral has referrer segments:", (segmentsJson: string) => {
  const referral = copyReferringRelationship();
  referral.referrerUser.segments = parseTestSegments(segmentsJson);
  getWorld().setState({ current: { referral } });
});

Given("the referred user has no referring relationship", () => {
  delete getTestUser().referredByReferral;
});
