import { StepDefinitions } from "jest-cucumber";
import { inferType } from "@saasquatch/program-boilerplate";

import { getWorld } from "../world";

const userSteps: StepDefinitions = ({ given }) => {
  given(
    /^the (?:referred )?user has custom field "?([^"]+)"? equal to "?([^"]+)"?$/,
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
    }
  );

  given(
    /^the (?:referred )?user (is|is not|isn't) blocked$/,
    (blocked: string) => {
      getWorld().setState({
        current: {
          user: {
            dateBlocked: blocked === "is" ? 123 : undefined,
          },
        },
      });
    }
  );

  given(/^the segment rules include segment (S+)$/, (seg: string) => {
    const segments = getWorld().state.current.rules.userSegmentation || [];
    segments.push(seg);

    getWorld().setState({
      current: {
        rules: {
          userSegmentation: segments,
        },
      },
    });
  });

  given(
    /^the (?:referred )?user belongs to segment "?([^"]+)"?$/,
    (segment: string) => {
      const segments = getWorld().state.current.user.segments || [];
      segments.push(segment);

      getWorld().setState({
        current: {
          user: {
            segments,
          },
        },
      });
    }
  );

  given("the (?:referred )?user has the following reward:", (data: any) => {
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

  given("the referrer user has the following reward:", (data: any) => {
    const rewards = getWorld().state.current.user.referredByReferral
      .referrerUser.rewards || {
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

  given(
    /^the (?:referred )?user has a program goal "?([^"]+)"? with count "?([^"]+)"?$/,
    (goalId: string, count: string) => {
      getWorld().setState({
        current: {
          user: {
            programGoals: [
              ...(getWorld().state.current.user?.programGoals || []),
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
    }
  );
};

export default userSteps;
