import { inferType } from "@saasquatch/program-boilerplate";
import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

Given(
  /^the (?:referred )?user (?:now )?has custom field "?([^"]+)"? equal to "?([^"]+)"?$/,
  (field: string, val: string) => {
    getWorld().setState({
      current: {
        user: {
          customFields: {
            [field]: inferType(val),
          },
        },
      },
    });
  },
);

Given(
  /^the (?:referred )?user previously had custom field "?([^"]+)"? equal to "?([^"]+)"?$/,
  (field: string, val: string) => {
    if (getWorld().state.current.previous === undefined) {
      const user = getWorld().state.current.user;
      getWorld().setState({ current: { previous: user } });
    }

    getWorld().setState({
      current: {
        previous: {
          customFields: {
            [field]: inferType(val),
          },
        },
      },
    });
  },
);

Given("the user's custom fields didn't change", () => {
  if (getWorld().state.current.previous === undefined) {
    const user = getWorld().state.current.user;
    getWorld().setState({ current: { previous: user } });
  }
});

Given(
  /^the (?:referred )?user (is|is not|isn't) blocked$/,
  (blocked: string) => {
    getWorld().setState({
      current: {
        user: {
          dateBlocked: blocked === "is" ? 123 : undefined,
        },
      },
    });
  },
);

Given(/^the segment rules include segment "?([^"]+)"?$/, (seg: string) => {
  const segments = getWorld().state.current.rules.userSegmentation ?? [];
  if (!segments.includes(seg)) {
    segments.push(seg);
  }

  getWorld().setState({
    current: {
      rules: {
        userSegmentation: segments,
      },
    },
  });
});

Given(
  /^the (?:referred )?user belongs to segment "?([^"]+)"?$/,
  (segment: string) => {
    const segments = getWorld().state.current.user.segments || [];
    if (!segments.includes(segment)) {
      segments.push(segment);
    }

    getWorld().setState({
      current: {
        user: {
          segments,
        },
      },
    });
  },
);

Given(/^the (?:referred )?user has the following reward:$/, (data: string) => {
  const rewards = getWorld().state.current.user.rewards || {
    totalCount: 0,
    data: [],
  };
  rewards.data.push(JSON.parse(data));
  rewards.totalCount += 1;

  getWorld().setState({
    current: {
      user: {
        rewards,
      },
    },
  });
});

Given(
  /^the (?:referred )?user has the following programGoal:$/,
  (data: string) => {
    const programGoals = getWorld().state.current.user.programGoals ?? [];
    programGoals.push(JSON.parse(data));

    getWorld().setState({
      current: {
        user: {
          programGoals,
        },
      },
    });
  },
);

Given("the referrer user has the following reward:", (data: string) => {
  const rewards = getWorld().state.current.user.referredByReferral.referrerUser
    .rewards || {
    totalCount: 0,
    data: [],
  };
  rewards.data.push(JSON.parse(data));
  rewards.totalCount += 1;

  getWorld().setState({
    current: {
      user: {
        referredByReferral: {
          referrerUser: {
            rewards,
          },
        },
      },
    },
  });
});

Given(
  /^the (?:referred )?user has a program goal "?([^"]+)"? with count "?([^"]+)"?$/,
  (goalId: string, count: string) => {
    getWorld().setState({
      current: {
        user: {
          programGoals: [
            ...(getWorld().state.current.user?.programGoals ?? []),
            {
              goalId,
              programId: "r1",
              count: inferType(count),
              firstDate: 1,
              lastDate: 1,
            },
          ],
        },
      },
    });
  },
);
