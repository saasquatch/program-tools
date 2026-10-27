import assert from "node:assert/strict";
import { inferType } from "@saasquatch/program-boilerplate";
import {
  getTestUser,
  parseTestNumber,
  parseTestSegments,
  updateTestUser,
} from "../fixtures.ts";
import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

Given(
  /^the (?:referred )?user (?:now )?has custom field "?([^"]+)"? equal to "?([^"]+)"?$/,
  (field: string, val: string) => {
    updateTestUser("referred", { customFields: { [field]: inferType(val) } });
  },
);

Given(
  /^the (?:referred )?user previously had custom field "?([^"]+)"? equal to "?([^"]+)"?$/,
  (field: string, val: string) => {
    if (getWorld().state.current.previous === undefined) {
      getWorld().setState({ current: { previous: getTestUser() } });
    }

    getWorld().setState({
      current: { previous: { customFields: { [field]: inferType(val) } } },
    });
  },
);

Given("the user's custom fields didn't change", () => {
  if (getWorld().state.current.previous === undefined) {
    getWorld().setState({ current: { previous: getTestUser() } });
  }
});

Given(
  /^the (?:referred )?user (is|is not|isn't) blocked$/,
  (blocked: string) => {
    updateTestUser("referred", {
      dateBlocked: blocked === "is" ? 123 : undefined,
    });
  },
);

Given(/^the segment rules include segment "?([^"]+)"?$/, (seg: string) => {
  const segments = getWorld().state.current.rules.userSegmentation ?? [];
  if (!segments.includes(seg)) {
    segments.push(seg);
  }

  getWorld().setState({ current: { rules: { userSegmentation: segments } } });
});

Given(
  /^the (?:(referrer|referred) )?user belongs to segment "?([^"]+)"?$/,
  (audience: string | undefined, segment: string) => {
    const target = audience ?? "referred";
    const segments = [
      ...(getTestUser(target, { create: true }).segments ?? []),
    ];

    if (!segments.includes(segment)) {
      segments.push(segment);
    }

    updateTestUser(target, { segments });
  },
);

Given(
  /^the (referrer|referred) user has segments:$/,
  (audience: string, segmentsJson: string) => {
    getTestUser(audience);
    updateTestUser(audience, { segments: parseTestSegments(segmentsJson) });
  },
);

Given(
  /^the (?:(referrer|referred) )?user has the following reward:$/,
  (audience: string | undefined, data: string) => {
    const target = audience ?? "referred";
    const rewards = getTestUser(target).rewards ?? { totalCount: 0, data: [] };

    updateTestUser(target, {
      rewards: {
        totalCount: rewards.totalCount + 1,
        data: [...rewards.data, JSON.parse(data)],
      },
    });
  },
);

Given(
  /^the (?:(referrer|referred) )?user has the following programGoal:$/,
  (audience: string | undefined, data: string) => {
    const target = audience ?? "referred";

    updateTestUser(target, {
      programGoals: [
        ...(getTestUser(target).programGoals ?? []),
        JSON.parse(data),
      ],
    });
  },
);

Given(
  /^the (?:(referrer|referred) )?user(?: has a program goal "?([^"]+)"? with count "?([^"]+)"?|'s program goal "([^"]+)" has count "([^"]+)")$/,
  (
    audience: string | undefined,
    appendGoalId: string | undefined,
    appendCount: string | undefined,
    upsertGoalId: string | undefined,
    upsertCount: string | undefined,
  ) => {
    const target = audience ?? "referred";
    const goalId = upsertGoalId ?? appendGoalId;
    const countText = upsertCount ?? appendCount;

    assert.ok(goalId && countText !== undefined);

    const count = parseTestNumber(countText);
    const upsert = upsertGoalId != null;
    const goals = [...(getTestUser(target).programGoals ?? [])];
    const index = upsert
      ? goals.findIndex(
          (goal) => goal.programId === "r1" && goal.goalId === goalId,
        )
      : -1;

    if (index >= 0) {
      goals[index] = { ...goals[index], count };
    } else {
      const date = upsert ? 0 : 1;
      goals.push({
        programId: "r1",
        goalId,
        count,
        firstDate: date,
        lastDate: date,
      });
    }

    updateTestUser(target, { programGoals: goals });
  },
);
