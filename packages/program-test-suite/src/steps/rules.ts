import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

Given("there are no program rules", () => {
  getWorld().setState({
    current: {
      rules: undefined,
    },
  });
});

Given("the program rules are:", (rules: string) => {
  getWorld().setState({ current: { rules: JSON.parse(rules) } });
});

Given("there are no reward rules", () => {
  getWorld().setState({
    current: {
      rules: {
        rewardRules: undefined,
      },
    },
  });
});

Given(/^the current time is (\d+)$/, (time: string) => {
  getWorld().setState({
    current: {
      time: Number(time),
    },
  });
});
